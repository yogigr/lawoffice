<?php

namespace App\Http\Services;

use App\Models\User;
use App\Models\Caselaw;
use App\Models\Appointment;
use App\Classes\CodeGenerator;
use App\Http\Requests\AppointmentRequest;

class AppointmentService
{
    protected $codeGenerator;

    public function __construct()
    {
        $this->codeGenerator = new CodeGenerator();
    }

    public function getAppointments(User $user)
    {
        $appointments = Appointment::where(function($query) use ($user) {
            $query->whereHas('caselaw', function($caselawQuery) use ($user) {
                $caselawQuery->where('status_id', 2);
                if ($user->role_id == 2) {
                    $caselawQuery->whereHas('users', function($usersQuery) use ($user) {
                        $usersQuery->where('user_id', $user->id);
                    }); 
                } elseif ($user->role_id == 3) {
                    $caselawQuery->where('client_id', $user->id);
                }
            })->where('date', '>=', today())->where('time', '>=', now()->format('H:i:s'));
        });

        return $appointments;
    }

    public function getAppointmentsWithCaselaw(Caselaw $caselaw)
    {
        $appointments = Appointment::where('caselaw_id', $caselaw->id)
        ->orderBy('date', 'asc')->orderBy('time', 'asc')->paginate(10);

        return $appointments;
    }

    public function store(AppointmentRequest $request)
    {
        $appointment = Appointment::create([
            'code' => $this->codeGenerator->getCode('AP', 'appointments'), 
            'date' => $request->input('date'), 
            'time' => $request->input('time'), 
            'title' => $request->input('title'), 
            'desc' => $request->input('desc'), 
            'type' => $request->input('type'), 
            'location' => $request->input('location'), 
            'caselaw_id' => $request->input('caselaw_id')
        ]);

        return $appointment;
    }
    
    public function update(AppointmentRequest $request, Appointment $appointment)
    {
        $appointment->update([ 
            'date' => $request->input('date'), 
            'time' => $request->input('time'), 
            'title' => $request->input('title'), 
            'desc' => $request->input('desc'), 
            'type' => $request->input('type'), 
            'location' => $request->input('location')
        ]);

        return $appointment;
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
    }
}
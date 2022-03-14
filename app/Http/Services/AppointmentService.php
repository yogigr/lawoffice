<?php

namespace App\Http\Services;

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
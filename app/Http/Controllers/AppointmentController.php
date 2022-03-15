<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\AppointmentRequest;
use App\Http\Services\AppointmentService;
use App\Http\Resources\AppointmentResource;

class AppointmentController extends Controller
{
    public function index(AppointmentService $service)
    {
        if (!Gate::allows('view-appointment')) {
            abort(403);
        }

        return Inertia::render('Appointment/Index', [
            'appointments' => AppointmentResource::collection(
                $service->getAppointments(Auth::user())->paginate(10)
            )
        ]);
    }

    public function store(AppointmentRequest $request, AppointmentService $service)
    {
        $appointment = $service->store($request);
        return redirect($request->has('redirect') ? $request->input('redirect') : '/appointment/' . $appointment->id)
        ->with('status', 'Berhasil membuat appointment baru');
    }


    public function update(AppointmentRequest $request, AppointmentService $service, Appointment $appointment)
    {
        $appointment = $service->update($request, $appointment);
        return redirect($request->has('redirect') ? $request->input('redirect') : '/appointment/' . $appointment->id)
        ->with('status', 'Berhasil memperbaharui appointment');
    }

    public function destroy(AppointmentService $service, Appointment $appointment)
    {
        if (!Gate::allows('delete-appointment')) {
            abort(403);
        }

        $caselaw = $appointment->caselaw;
        $service->destroy($appointment);
        return redirect()->route('caselaw.appointment.index', $caselaw)
        ->with('status', 'Appointment berhasil dihapus');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use App\Http\Requests\AppointmentRequest;
use App\Http\Services\AppointmentService;

class AppointmentController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(AppointmentRequest $request, AppointmentService $service)
    {
        $appointment = $service->store($request);
        return redirect($request->has('redirect') ? $request->input('redirect') : '/appointment/' . $appointment->id)
        ->with('status', 'Berhasil membuat appointment baru');
    }

    public function show(Appointment $appointment)
    {
        //
    }

    public function edit(Appointment $appointment)
    {
        //
    }

    public function update(AppointmentRequest $request, AppointmentService $service, Appointment $appointment)
    {
        $appointment = $service->update($request, $appointment);
        return redirect($request->has('redirect') ? $request->input('redirect') : '/appointment/' . $appointment->id)
        ->with('status', 'Berhasil memperbaharui appointment');
    }

    public function destroy(AppointmentService $service, Appointment $appointment)
    {
        $caselaw = $appointment->caselaw;
        $service->destroy($appointment);
        return redirect()->route('caselaw.appointment.index', $caselaw)
        ->with('status', 'Appointment berhasil dihapus');
    }
}

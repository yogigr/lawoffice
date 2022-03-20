<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\ServiceRequest;
use App\Http\Services\ServiceService;

class ServiceController extends Controller
{
    public function index(ServiceService $serviceService)
    {
        if (!Gate::allows('view-service')) {
            abort(403);
        }
        return Inertia::render('Service/Index', [
            'services' => $serviceService->getServices()
        ]);
    }

    public function create()
    {
        if (!Gate::allows('create-service')) {
            abort(403);
        }
        return Inertia::render('Service/Create');
    }

    public function store(ServiceRequest $request, ServiceService $serviceService)
    {
        $service = $serviceService->store($request);
        return redirect()->route('service.index')
        ->with('status', 'Service baru berhasil ditambahkan');
    }

    public function edit(Service $service)
    {
        if (!Gate::allows('edit-service')) {
            abort(403);
        }
        return Inertia::render('Service/Edit', [
            'service' => $service
        ]);
    }

    public function update(ServiceRequest $request, ServiceService $serviceService, Service $service)
    {
        $service = $serviceService->update($request, $service);
        return redirect()->route('service.index')
        ->with('status', 'Service berhasil diupdate');
    }

    public function destroy(ServiceService $serviceService, Service $service)
    {
        if (!Gate::allows('delete-service')) {
            abort(403);
        }

        $serviceService->destroy($service);
        return redirect()->route('service.index')
        ->with('status', 'Service berhasil dihapus');
    }
}

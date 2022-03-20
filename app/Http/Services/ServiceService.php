<?php

namespace App\Http\Services;

use App\Models\Service;
use App\Http\Requests\ServiceRequest;

class ServiceService
{
    public function getServices()
    {
        return Service::where(function($query) {
            if (request('search')) {
                $query->where('name', 'like', '%' . request('search') . '%');
            }
        })->orderBy('id', 'desc')->paginate(10);
    }

    public function store(ServiceRequest $request)
    {
        return Service::create([
            'name' => $request->input('name'),
            'description' => $request->input('description')
        ]);
    }

    public function update(ServiceRequest $request, Service $service)
    {
        return $service->update([
            'name' => $request->input('name'),
            'description' => $request->input('description')
        ]);
    }

    public function destroy(Service $service)
    {
        $service->delete();
    }
}
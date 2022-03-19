<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\ConfigRequest;
use App\Http\Services\ConfigService;
use Illuminate\Support\Facades\Gate;

class ConfigController extends Controller
{
    public function index(ConfigService $service)
    {
        if (!Gate::allows('edit-setting')) {
            abort(403);
        }
        
        return Inertia::render('Setting/Config', [
            'config' => $service->getConfig()
        ]);
    }

    public function update(ConfigRequest $request, ConfigService $service)
    {
        $service->update($request);
        return redirect()->route('config.index')
        ->with('status', 'Berhasil update config');
    }
}

<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\CompanyRequest;
use App\Http\Services\CompanyService;

class CompanyController extends Controller
{
    public function index(CompanyService $service)
    {
        if (!Gate::allows('edit-setting')) {
            abort(403);
        }
        
        return Inertia::render('Setting/Company', [
            'company' => $service->getCompany()
        ]);
    }

    public function update(CompanyRequest $request, CompanyService $service)
    {
        $service->update($request);
        return redirect()->route('company.index')
        ->with('status', 'Berhasil update company');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Company;
use App\Models\Service;
use Illuminate\Http\Request;

class FrontController extends Controller
{
    public function welcome()
    {
        $navigations = [
            ['href' => '#about', 'name' => 'ABOUT'],
            ['href' => '#practices', 'name' => 'PRACTICES'],
            ['href' => '#peoples', 'name' => 'PEOPLE'],
            ['href' => '#contact', 'name' => 'CONTACT'],
        ];

        $services = Service::orderBy('name', 'asc')->get();
        $lawyers = User::where('role_id', 2)->orderBy('name', 'asc')->get();
        $company = Company::first();

        return view('welcome', [
            'navigations' => $navigations,
            'services' => $services,
            'lawyers' => $lawyers,
            'company' => $company,
        ]);
    }
}

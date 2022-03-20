<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Services\CompanyService;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        $companyService = new CompanyService();
        return array_merge(parent::share($request), [
            'appName' => config('app.name'),
            'company' => $companyService->getCompany(),
            'auth' => [
                'user' => $request->user(),
                'permissions' => $request->user() ? $request->user()->permissions : [],
                'unreadNotificationsCount' => $request->user() ? $request->user()->unreadNotifications->count() : 0, 
            ],
            'status' => session('status'),
            'inertia' => request()->inertia(),
            'csrf_token' => csrf_token()
        ]);
    }
}

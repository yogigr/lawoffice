<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Resources\InvoiceResource;
use App\Http\Services\DashboardService;
use App\Http\Resources\AppointmentResource;

class Dashboard extends Controller
{
    public function __invoke(DashboardService $service)
    {
        return Inertia::render('Dashboard/Index', [
            'activeCaselawCount' => $service->getActiveCaselawCount(),
            'nextAppointmentCount' => $service->getNextAppointmentCount(),
            'unpaidInvoiceCount' => $service->getUnpaidInvoiceCount(),
            'activeClientCount' => $service->getActiveClientCount(),
            'activeLawyerCount' => $service->getActiveLawyerCount(),
            'serviceCount' => $service->getServiceCount(),
            'todayAppointments' => AppointmentResource::collection($service->getTodayAppointments()),
            'todayInvoices' => InvoiceResource::collection($service->getTodayInvoices())
        ]);
    }
}

<?php

namespace App\Http\Services;

use App\Models\User;
use App\Models\Caselaw;
use App\Models\Invoice;
use App\Models\Service;
use App\Models\Appointment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Http\Services\AppointmentService;

class DashboardService
{
    protected $appointmentService;

    public function __construct()
    {
        $this->appointmentService = new AppointmentService();
    }

    public function getActiveCaselawCount()
    {
        $user = Auth::user();
        
        $activeCaselawCount = false;
        if (Gate::allows('view-caselaw')) {
            $activeCaselawCount = Caselaw::where(function($query) use ($user) {
                $query->where('status_id', 2);
                if ($user->role_id == 2) {
                   $query->whereHas('users', function($usersQuery) use ($user) {
                        $usersQuery->where('user_id', $user->id);
                   }); 
                } elseif ($user->role_id == 3) {
                    $query->where('client_id', $user->id);
                }
            })->count();
        }
        return $activeCaselawCount;
    }

    public function getNextAppointmentCount()
    {
        $user = Auth::user();

        $nextAppointmentCount = false;
        if (Gate::allows('view-appointment')) {
            $nextAppointmentCount = $this->appointmentService->getAppointments($user)->count();
        }
        return $nextAppointmentCount;
    }

    public function getUnpaidInvoiceCount()
    {
        $user = Auth::user();

        $unpaidInvoiceCount = false;
        if (Gate::allows('view-invoice')) {
            $unpaidInvoiceCount = Invoice::where(function($query) use ($user) {
                $query->where('is_paid', false)
                ->whereHas('caselaw', function($caselawQuery) use ($user) {
                    if ($user->role_id == 2) {
                        $caselawQuery->whereHas('users', function($usersQuery) use ($user) {
                            $usersQuery->where('user_id', $user->id);
                        }); 
                    } elseif ($user->role_id == 3) {
                        $caselawQuery->where('client_id', $user->id);
                    }
                });
            })->count();
        }
        return $unpaidInvoiceCount;
    }

    public function getActiveClientCount()
    {
        $activeClientCount = false;
        if (Gate::allows('view-user')) {
            $activeClientCount = User::where('role_id', 3)->whereNotNull('email_verified_at')->count();
        }
        return $activeClientCount;
    }

    public function getActiveLawyerCount()
    {
        $activeLawyerCount = false;
        if (Gate::allows('view-user')) {
            $activeLawyerCount = User::where('role_id', 2)->whereNotNull('email_verified_at')->count();
        }
        return $activeLawyerCount;
    }

    public function getServiceCount()
    {
        $serviceCount = false;
        if (Gate::allows('view-service')) {
            $serviceCount = Service::count();
        }
        return $serviceCount;
    }

    public function getTodayAppointments()
    {
        $user = Auth::user();

        $todayAppointments = false;
        if (Gate::allows('view-appointment')) {
            $todayAppointments = Appointment::where(function($query) use ($user) {
                $query->whereHas('caselaw', function($caselawQuery) use ($user) {
                    $caselawQuery->where('status_id', 2);
                    if ($user->role_id == 2) {
                        $caselawQuery->whereHas('users', function($usersQuery) use ($user) {
                            $usersQuery->where('user_id', $user->id);
                        }); 
                    } elseif ($user->role_id == 3) {
                        $caselawQuery->where('client_id', $user->id);
                    }
                })->where('date', today());
            })->orderBy('time', 'asc')->get();
        }
        return $todayAppointments;
    }

    public function getTodayInvoices()
    {
        $user = Auth::user();

        $todayInvoices = false;
        if (Gate::allows('view-invoice')) {
            $todayInvoices = Invoice::where(function($query) use ($user) {
                $query->whereHas('caselaw', function($caselawQuery) use ($user) {
                    $caselawQuery->where('status_id', 2);
                    if ($user->role_id == 2) {
                        $caselawQuery->whereHas('users', function($usersQuery) use ($user) {
                            $usersQuery->where('user_id', $user->id);
                        }); 
                    } elseif ($user->role_id == 3) {
                        $caselawQuery->where('client_id', $user->id);
                    }
                })->where('is_paid', false)->where('due_date', today());
            })->orderBy('id', 'asc')->get();
        }
        return $todayInvoices;
    }
}
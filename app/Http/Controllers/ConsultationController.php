<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Services\CaptchaService;
use App\Http\Requests\ConsultationRequest;
use App\Http\Services\ConsultationService;

class ConsultationController extends Controller
{
    public function create(Request $request, CaptchaService $service)
    {
        if (!Gate::allows('create-consultation')) {
            abort(403);
        }

        return Inertia::render('Consultation/Create', [
            'captcha_question' => $service->getCaptcha($request)
        ]);
    }

    public function store(ConsultationRequest $request, ConsultationService $service)
    {
        $caselaw = $service->store($request);
        return redirect()->route('consultation.create')
        ->with(
            'status', 
            'Konsultasi anda berhasil terkirim, pantau terus notifikasi untuk perkembangan konsultasi hukum anda'
        );
    }
}

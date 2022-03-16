<?php

namespace App\Http\Services;

use App\Models\Caselaw;
use App\Classes\CodeGenerator;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ConsultationRequest;

class ConsultationService
{
    protected $codeGenerator;

    public function __construct()
    {
        $this->codeGenerator = new CodeGenerator();
    }

    public function store(ConsultationRequest $request)
    {
        $code = $this->codeGenerator->getCode('CL', 'caselaws');

        $caselaw = Caselaw::create([
            'code' => $code, 
            'start_date' => today(), 
            'title' => 'Case ' . $code, 
            'client_id' => Auth::id()
        ]);

        $caselaw->messages()->create([
            'text' => $request->input('consultation_text'), 
            'user_id' => $caselaw->client_id
        ]);

        return $caselaw;
    }
}
<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Http\FormRequest;

class ConsultationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('create-consultation') && $this->user()->role_id == 3;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'captcha_answer' => [
                'required',
                function ($attribute, $value, $fail) {
                    if ($value != $this->session()->get('captcha_answer')) {
                        $fail('jawaban pertanyaan keamanan tidak tepat.');
                    }
                },
            ],
            'consultation_text' => 'required|string|min:25'  
        ];
    }

    public function messages()
    {
        return [
            'captcha_answer.required' => 'Pertanyaa keamanan belum diisi',
            'consultation_text.required' => 'Pesan konsultasi harus diisi',
            'consultation_text.min' => 'Pesan konsultasi minimal 25 karakter', 
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Http\FormRequest;

class AppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->input('_method') == 'PATCH' 
        ? Gate::allows('create-appointment') 
        : Gate::allows('edit-appointment');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $validations = [
            'date' => 'required|date', 
            'time' => 'required', 
            'title' => 'required', 
            'type' => 'required', 
            'location' => 'required', 
            'caselaw_id' => 'required'
        ];

        return $validations;
    }

    public function messages()
    {
        return [
            'date.required' => 'Appointment date harus diisi',
            'date.date' => 'Appointment date format salah',
            'time.required' => 'Appointment time harus diisi',
            'title.required' => 'Appointment title harus diisi',
            'type.required' => 'Appointment type harus diisi',
            'location.required' => 'Location harus diisi',
            'caselaw_id.required' => 'Caselaw belum dipilih'
        ];
    }
}

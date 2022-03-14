<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Http\FormRequest;

class CaselawRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->input('_method') == 'PATCH' 
        ? Gate::allows('edit-caselaw')
        : Gate::allows('create-caselaw');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $validations = [ 
            'start_date' => 'required|date', 
            'title' => 'required|unique:caselaws,title',  
            'service_id' => 'required', 
            'status_id' => 'required', 
            'client_id' => 'required',
        ];

        if ($this->method() == 'PATCH') {
            $validations['title'] = 'required|unique:caselaws,title,' . $this->input('caselaw_id');
        }

        return $validations;
    }

    public function messages()
    {
        return [
            'start_date.required' => 'Start date harus diisi',
            'title.required' => 'Case title harus diisi',
            'title.unique' => 'Case title telah terdaftar',
            'service_id.required' => 'Service / Layanan hukum belum dipilih',
            'status_id.required' => 'Status belum dipilih',
            'client_id.required' => 'Client belum dipilih',
        ];
    }
}

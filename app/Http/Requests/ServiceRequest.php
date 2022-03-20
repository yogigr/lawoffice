<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
{
    public function authorize()
    {
        return $this->isMethod('patch') 
        ? Gate::allows('edit-service') 
        : Gate::allows('create-service') ;
    }

    public function rules()
    {
        $rules = [
            'name' => 'required|string|unique:services,name',
            'description' => 'required|string'
        ];

        if ($this->isMethod('patch')) {
            $rules['name'] .= ',' . $this->input('service_id');
        }

        return $rules;
    }
}

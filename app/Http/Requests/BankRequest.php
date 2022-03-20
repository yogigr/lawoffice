<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Http\FormRequest;

class BankRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('edit-setting');
    }

    public function rules()
    {
        $rules = [  
            'name' => 'required|string|unique:banks,name',
            'number' => 'required|string',
            'owner' => 'required|string'
        ];

        if ($this->isMethod('patch')) {
            $rules['name'] .=  ',' . $this->input('bank_id');
        }

        return $rules;
    }
}

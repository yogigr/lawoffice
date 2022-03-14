<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'text' => 'required', 
            'user_id' => 'required', 
            'caselaw_id' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'text.required' => 'Text Message harus diisi',
            'user_id.required' => 'User belum login',
            'caselaw_id.required' => 'Case belum dipilih'
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function authorize()
    {
        return $this->isMethod('patch') 
        ? Gate::allows('edit-user') 
        : Gate::allows('create-user');
    }

    public function rules()
    {
        $rules = [
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'required',
        ];

        if ($this->isMethod('patch')) {
            $rules['email'] .= ',' . $this->input('user_id');
            $rules['password'] = 'nullable|string|min:8|confirmed';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'name.required' => 'Nama user harus diisi',
            'email.required' => 'Email user harus diisi',
            'email.unique' => 'Email telah terdaftar',
            'password.required' => 'Password harus diisi',
            'password.min' => 'Password minimal 8 karakter',
            'password.confirmed' => 'Konfirmasi password tidak cocok',
            'role_id.required' => 'Role harus dipilih',
        ];
    }
}

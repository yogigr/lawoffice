<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('edit-setting');
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:50',
            'about' => 'required|string|min:100',
            'facebook_link' => 'nullable|url',
            'instagram_link' => 'nullable|url',
            'twitter_link' => 'nullable|url',
            'email' => 'required|email',
            'phone' => 'required',
            'address' => 'required',
            'meta_keywords' => 'required',
            'meta_desc' => 'required',
            'imagefile' => 'nullable|image|mimes:jpeg,jpg,png|max:500'
        ];
    }
}

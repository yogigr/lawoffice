<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAddressRequest extends FormRequest
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
            'line1' => 'required',
            'city' => 'required', 
            'province' => 'required', 
            'postal_code' => 'required', 
            'country' => 'required', 
        ];
    }

    public function messages()
    {
        return [
            'line1.required' => 'Address 1 harus diisi',
            'city.required' => 'City harus diisi',
            'province.required' => 'Province harus diisi',
            'postal_code.required' => 'Zip code harus diisi',
            'country.required' => 'Country harus diisi' 
        ];
    }
}

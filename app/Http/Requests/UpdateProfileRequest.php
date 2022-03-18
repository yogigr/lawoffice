<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
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
            'name' => 'required',
            'date_of_birth' => 'nullable|date',
            'imagefile' => 'nullable|image|mimes:jpeg,jpg,png|max:1000'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Nama lengkap harus diisi',
            'date_of_birth.date' => 'Format tanggal lahir salah',
            'imagefile.image' => 'Photo harus berupa image',
            'imagefile.mimes' => 'Format photo hanya boleh jpg|png',
            'imagefile.max' => 'Ukuran photo maksimal 1MB',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Http\FormRequest;

class DocumentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->input('_method') == 'PATCH' 
        ? Gate::allows('create-document') 
        : Gate::allows('edit-document');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $validations = [ 
            'title' => [
                'required',
                Rule::unique('documents', 'title')->where('caselaw_id', $this->input('caselaw_id'))
            ], 
            'fileupload' => [
                Rule::requiredIf($this->input('_method') == 'POST'),
                'file',
                'max:1000'
            ], 
            'caselaw_id' => [
                Rule::requiredIf($this->input('_method') == 'POST')
            ], 
            'user_id' => [
                Rule::requiredIf($this->input('_method') == 'POST')
            ], 
        ];

        if ($this->input('_method') == 'PATCH') {
            $validations['title'] = [
                'required',
                Rule::unique('documents', 'title')->ignore($this->input('document_id'))
                ->where('caselaw_id', $this->input('caselaw_id'))
            ];
        }

        return $validations; 
    }

    public function messages()
    {
        return [
            'title.required' => 'Judul dokumen harus diisi',
            'title.unique' => 'Judul dokumen telah terdaftar',
            'fileupload.required' => 'File dokumen belum disisipkan',
            'fileupload.file' => 'File dokumen harus berupa file',
            'fileupload.max' => 'File dokumen maksimal 1MB',
            'caselaw_id.required' => 'Caselaw belum dipilih',
            'user_id.required' => 'Pengirim tidak dikenali'
        ];
    }
}

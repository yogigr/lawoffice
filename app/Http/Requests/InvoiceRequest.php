<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InvoiceRequest extends FormRequest
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
        $validations = [
            'details' => [
                'required',
                function($attribute, $value, $fail) {
                    if (count($value) < 1) {
                        return $fail('Invoice detail masih kosong');
                    }
                    foreach ($value as $d) {
                        if ($d['desc'] == "" || $d['amount'] == "") {
                            return $fail('Detail description atau detail amount harus diisi');
                        }
                        if ($d['amount'] < 1) {
                            return $fail('Detail amount tidak boleh kosong');
                        }
                    }
                }
            ],
            'date' => 'required|date', 
            'due_date' => 'required|date', 
            'caselaw_id' => 'required',
        ];

        if ($this->input('_method') == 'PATCH') {
            $validations['is_paid'] = 'required';
        }

        return $validations;
    }

    public function messages()
    {
        return [
            'details.required' => 'Invoice detail masih kosong',
            'date.required' => 'Invoice date harus diisi',
            'date.date' => 'Format invoice date salah',
            'due_date.required' => 'Invoice due date harus diisi',
            'due_date.date' => 'Format invoice due date salah',
            'caselaw_id.required' => 'Case belum dipilih',
            'is_paid.required' => 'Payment status belum dipilih' 
        ];
    }
}

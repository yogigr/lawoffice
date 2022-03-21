<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'code' => $this->code, 
            'date' => $this->date, 
            'due_date' => $this->due_date, 
            'caselaw_id' => $this->caselaw_id, 
            'tax' => $this->tax, 
            'discount' => $this->discount, 
            'note' => $this->note, 
            'is_paid' => $this->is_paid,
            'details' => $this->details,
            'caselaw' => $this->caselaw,
            'total' => $this->total,
            'date_formatted' => $this->date_formatted,
            'due_date_formatted' => $this->due_date_formatted
        ];
    }
}

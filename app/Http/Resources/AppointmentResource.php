<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
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
            'time' => $this->time, 
            'title' => $this->title, 
            'desc' => $this->desc, 
            'type' => $this->type, 
            'location' => $this->location, 
            'caselaw_id' => $this->caselaw_id,
            'caselaw' => $this->caselaw,
            'date_formatted' => $this->date_formatted
        ];
    }
}

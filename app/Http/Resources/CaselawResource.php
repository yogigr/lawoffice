<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CaselawResource extends JsonResource
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
            'start_date' => $this->start_date, 
            'end_date' => $this->end_date, 
            'title' => $this->title, 
            'desc' => $this->desc, 
            'service_id' => $this->service_id, 
            'status_id' => $this->status_id, 
            'client_id' => $this->client_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'client' => $this->client,
            'service' => $this->service,
            'status' => $this->status,
            'lawyers' => $this->users,
            'start_date_formatted' => $this->start_date_formatted,
            'end_date_formatted' => $this->end_date_formatted   
        ];
    }
}

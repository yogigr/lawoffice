<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
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
            'title' => $this->title, 
            'desc' => $this->desc, 
            'filename' => $this->filename, 
            'caselaw_id' => $this->caselaw_id, 
            'user_id' => $this->user_id,
            'created_at' => $this->created_at,
            'user' => $this->user,
            'role' => $this->user->role->name ?? '',
            'updated_at' => $this->updated_at
        ];
    }
}

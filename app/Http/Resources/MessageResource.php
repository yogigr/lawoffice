<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
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
            'text' => $this->text, 
            'user_id' => $this->user_id, 
            'caselaw_id' => $this->caselaw_id,
            'created_at' => $this->created_at,
            'user' => $this->user,
            'role' => $this->user->name ?? '',
        ];
    }
}

<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
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
            'type' => $this->type,
            'data' => $this->data,
            'read_at' => $this->read_at,
            'created_at_human_read' => Carbon::parse($this->created_at)->diffForHumans(),
            'created_at_formatted' => Carbon::parse($this->created_at)->format('d/m/Y H:i:s'),
            'is_unread' => $this->read_at == null
        ];
    }
}

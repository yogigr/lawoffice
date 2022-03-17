<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'role_id' => $this->role_id,
            'date_of_birth' => $this->date_of_birth,
            'gender' => $this->gender,
            'mobile' => $this->mobile,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'picture' => $this->picture,
            'role' => $this->role,
            'age' => $this->age,
            'verified' => $this->hasVerifiedEmail(),
        ];
    }
}

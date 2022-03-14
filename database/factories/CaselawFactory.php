<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

class CaselawFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'code' => $this->faker->unique()->numerify('CL#####'), 
            'start_date' => $this->faker->date($format = 'Y-m-d', $max = 'now'), 
            'title' => ucwords($this->faker->words($nb = 6, $asText = true)),
            'desc' => $this->faker->sentences($nb = 3, $asText = true), 
            'service_id' => Service::inRandomOrder()->first()->id, 
            'status_id' => 1, 
            'client_id' => User::where('role_id', 3)->inRandomOrder()->first()->id,
        ];
    }
}

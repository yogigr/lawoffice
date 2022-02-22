<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->company,
            'about' => $this->faker->text,
            'facebook_link' => $this->faker->url,
            'instagram_link' => $this->faker->url,
            'twitter_link' => $this->faker->url,
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
            'meta_title' => $this->faker->words($nb = 6, $asText = true),
            'meta_desc' => $this->faker->text,
        ];
    }
}

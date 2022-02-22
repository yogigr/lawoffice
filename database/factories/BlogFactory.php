<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title = ucwords($this->faker->words($nb = 6, $asText = true));
        return [
            'title' => $title,
            'content' => $this->faker->text,
            'user_id' => 1,
            'slug' => Str::slug($title),
            'meta_title' => $title,
            'meta_desc' => $this->faker->text,
            'published_at' => now()
        ];
    }
}

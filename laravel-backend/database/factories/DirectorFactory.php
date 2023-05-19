<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Director>
 */
class DirectorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'birthday' => fake()->date(),
            'image_url' => fake()->imageUrl(),
            'biography' => fake()->text(),
            'birthplace' => fake()->country(),
            'nationality' =>  fake()->country(),
            'gender' => fake()->randomElement(['male', 'female', 'other']),
            'image_url' => fake()->imageUrl(),
        ];
    }
}
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Movie>
 */
class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'release_year' => fake()->year(),
            'synopsis' => fake()->text(),
            'trailer_url' => fake()->url(),
            'duration' => fake()->numberBetween(60, 180),
            'country' => fake()->country(),
            'language' => fake()->languageCode(),
            'age_restriction' => fake()->randomElement(['G', 'PG', 'PG-13', 'R', 'NC-17']),
            'international_rating' => fake()->randomFloat(1, 0, 10),
        ];
    }
}
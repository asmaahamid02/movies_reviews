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
            'language' => fake()->randomElement(['English', 'French', 'Spanish', 'German', 'Italian', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Hindi', 'Arabic', 'Portuguese', 'Dutch', 'Turkish', 'Polish', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Hebrew', 'Greek', 'Hungarian', 'Czech', 'Thai', 'Vietnamese', 'Romanian', 'Indonesian', 'Malay', 'Bulgarian', 'Slovak', 'Ukrainian', 'Croatian', 'Lithuanian', 'Catalan', 'Filipino', 'Estonian', 'Slovenian', 'Icelandic', 'Latvian', 'Persian', 'Albanian', 'Macedonian', 'Urdu', 'Afrikaans', 'Bengali', 'Bosnian', 'Farsi', 'Irish Gaelic', 'Serbian', 'Armenian', 'Basque', 'Georgian', 'Gujarati', 'Haitian Creole', 'Kannada', 'Latin', 'Luxembourgish', 'Malayalam', 'Marathi', 'Mongolian', 'Nepali', 'Pashto', 'Punjabi', 'Sinhala', 'Somali', 'Swahili', 'Tamil', 'Telugu', 'Zulu', 'Uzbek', 'Azerbaijani', 'Kurdish', 'Corsican', 'Kazakh', 'Kyrgyz', 'Latin']),
            'age_restriction' => fake()->randomElement(['G', 'PG', 'PG-13', 'R', 'NC-17']),
            'international_rating' => fake()->randomFloat(1, 0, 10),
        ];
    }
}
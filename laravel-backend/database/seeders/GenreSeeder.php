<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genres = [
            [
                'name' => 'Action',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Adventure',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Animation',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Biography',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Comedy',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Crime',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Documentary',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Drama',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Family',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Fantasy',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Film Noir',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'History',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Horror',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Music',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Musical',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Mystery',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Romance',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Sci-Fi',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Short Film',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Sport',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Superhero',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Thriller',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'War',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Western',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        DB::table('genres')->insert($genres);
    }
}
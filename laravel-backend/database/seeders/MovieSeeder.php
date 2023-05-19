<?php

namespace Database\Seeders;

use App\Models\Movie;
use GuzzleHttp\Client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $paths = ['images/movies/16844887047901460.jpg', 'images/movies/16844887053931982.jpg', 'images/movies/16844887051288550.jpg', 'images/movies/16844887051782890.jpg'];
        Movie::factory(200)
            ->create()->each(function ($movie) use ($paths) {
                //create random number of actors, directors, genres and media for each movie
                foreach (range(1, rand(1, 5)) as $index) {
                    $movie->actors()->attach(rand(1, 100));
                }

                foreach (range(1, rand(1, 3)) as $index) {
                    $movie->directors()->attach(rand(1, 100));
                }

                foreach (range(1, rand(1, 6)) as $index) {
                    $movie->genres()->attach(rand(1, 24));
                }


                foreach (range(1, rand(1, 3)) as $index) {

                    $movie->media()->create([
                        'media_url' => $paths[rand(0, 3)],
                        'media_type' => 'image',
                    ]);
                }
            });

        //get first 10 movies
        $movies = Movie::all()->take(10);

        $client = new Client();
        foreach ($movies as $movie) {

            $response = $client->get('https://api.unsplash.com/photos/random', [
                'query' => [
                    'client_id' => env('UNSPLASH_ACCESS_KEY'),
                ],
            ]);

            $imageData = $response->getBody()->getContents();
            $imageData = json_decode($imageData, true);

            $imageData = file_get_contents($imageData['urls']['regular']);

            $imageName = time() . rand(1000000, 9999999) . '.jpg';
            $path = 'images/movies/' . $imageName;

            Storage::disk('public')->put($path, $imageData);

            $movie->media()->create([
                'media_url' => $path,
                'media_type' => 'image',
            ]);
        }
    }
}
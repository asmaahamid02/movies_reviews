<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieResource;
use App\Models\Actor;
use App\Models\Director;
use App\Models\Movie;
use App\Models\MovieMedia;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $per_page = (int) $request->per_page;
        $movies = Movie::orderBy('id', 'desc')->paginate($per_page);

        if ($movies->isEmpty()) {
            return response()->json(['message' => 'No movies found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'data' => [
                'movies' => MovieResource::collection($movies->items()),
                'total' => $movies->total(),
                'nextPage' => $movies->lastPage() > $movies->currentPage() ? $movies->currentPage() + 1 : null,
            ]
        ], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255|min:3',
            'release_year' => 'required|numeric|min:1800|max:' . date('Y'),
            'images' => 'required|array|min:1',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'synopsis' => 'required|string',
            'trailer_url' => 'required|string|max:255',
            'duration' => 'required|numeric',
            'country' => 'required|string',
            'language' => 'required|string',
            'age_restriction' => 'required|string',
            'international_rating' => 'required|numeric|min:0|max:10',
            'genres' => 'required|array|min:1',
            'genres.*' => 'required|integer|exists:genres,id',

            //actors
            'actors' => 'required|array|min:1',
            'actors.*' => 'required',
            'actors.*.name' => 'required|string|max:255|min:3',
            'actors.*.image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'actors.*.birthday' => 'required|date|before:today',
            'actors.*.biography' => 'required|string',
            'actors.*.birthplace' => 'required|string',
            'actors.*.nationality' => 'required|string',
            'actors.*.gender' => 'required|string|in:male,female,other',

            //directors
            'directors' => 'required|array|min:1',
            'directors.*' => 'required',
            'directors.*.name' => 'required|string|max:255|min:3',
            'directors.*.image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'directors.*.birthday' => 'required|date|before:today',
            'directors.*.biography' => 'required|string',
            'directors.*.birthplace' => 'required|string',
            'directors.*.nationality' => 'required|string',
            'directors.*.gender' => 'required|string|in:male,female,other',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], Response::HTTP_BAD_REQUEST);
        }

        try {
            DB::beginTransaction();
            $movie = Movie::create($request->only(['title', 'release_year', 'synopsis', 'trailer_url', 'duration', 'country', 'language', 'age_restriction', 'international_rating']));

            $movie->genres()->attach($request->genres);

            $media = [];
            foreach ($request->images as $image) {
                $imageName = time() . rand(1000000, 9999999) . '.' . $image->extension();
                $path = 'images/movies/' . $imageName;

                // Storage::disk('public')->put($path, file_get_contents($image));
                //add image to public folder
                $image->move(public_path('assets/images/movies'), $imageName);


                $media[] = [
                    'movie_id' => $movie->id,
                    'media_url' => $path,
                    'media_type' => 'image',
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            MovieMedia::insert($media);

            //add actors
            $actors = $request->actors;
            foreach ($actors as $actor) {
                $imageName = time() . '.' . $actor['image']->extension();
                $path = 'assets/images/actors/' . $imageName;
                $actor['image']->move(public_path('assets/images/actors'), $imageName);
                $saved = Actor::create([
                    'name' => $actor['name'],
                    'birthday' => $actor['birthday'],
                    'biography' => $actor['biography'],
                    'birthplace' => $actor['birthplace'],
                    'nationality' => $actor['nationality'],
                    'gender' => $actor['gender'],
                    'image_url' => URL('/') . '/' . $path,
                ]);


                $saved->movies()->attach($movie->id);
            }

            //add directors
            $directors = $request->directors;
            foreach ($directors as $director) {

                $imageName = time() . '.' . $director['image']->extension();
                $path = 'assets/images/directors/' . $imageName;
                $director['image']->move(public_path('assets/images/directors'), $imageName);
                $saved = Director::create([
                    'name' => $director['name'],
                    'birthday' => $director['birthday'],
                    'biography' => $director['biography'],
                    'birthplace' => $director['birthplace'],
                    'nationality' => $director['nationality'],
                    'gender' => $director['gender'],
                    'image_url' => URL('/') . '/' . $path,
                ]);

                $saved->movies()->attach($movie->id);
            }


            DB::commit();

            $movie->fresh();

            return response()->json([
                'message' => 'Movie created successfully',
                'data' => MovieResource::make($movie)
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'data' => MovieResource::make($movie),
        ], Response::HTTP_OK);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], Response::HTTP_NOT_FOUND);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255|min:3',
            'release_year' => 'numeric|min:1800|max:' . date('Y'),
            'image_url' => 'string|max:255',
            'synopsis' => 'string',
            'trailer_url' => 'string|max:255',
            'duration' => 'integer',
            'country' => 'string',
            'language' => 'string',
            'age_restriction' => 'string',
            'international_rating' => 'numeric',
            'genres' => 'array|min:1',
            'genres.*' => 'required|integer|exists:genres,id',

            'actors' => 'array|min:1',
            'actors.*' => 'required',
            'actors.*.name' => 'required|string',
            'actors.*.birthday' => 'required|date|before:today',
            'actors.*.biography' => 'required|string',
            'actors.*.birthplace' => 'required|string',
            'actors.*.nationality' => 'required|string',
            'actors.*.gender' => 'required|string|in:male,female,other',

            'directors' => 'array|min:1',
            'directors.*' => 'required',
            'directors.*.name' => 'required|string',
            'directors.*.birthday' => 'required|date|before:today',
            'directors.*.biography' => 'required|string',
            'directors.*.birthplace' => 'required|string',
            'directors.*.nationality' => 'required|string',
            'directors.*.gender' => 'required|string|in:male,female,other',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], Response::HTTP_BAD_REQUEST);
        }

        try {
            DB::beginTransaction();
            $movie->update($request->only(['title', 'release_year', 'image_url', 'synopsis', 'trailer_url', 'duration', 'country', 'language', 'age_restriction', 'international_rating']));

            $movie->genres()->sync($request->genres);

            //update actors
            $actors = $request->actors;

            foreach ($actors as $actor) {
                $imageName = time() . '.' . $actor['image']->extension();
                $path = 'assets/images/actors/' . $imageName;
                $actor['image']->move(public_path('assets/images/actors'), $imageName);

                if (array_key_exists('id', $actor)) {

                    $found = Actor::find($actor['id']);
                    if ($found) {
                        //update actor
                        $found->name = $actor['name'];
                        $found->birthday = $actor['birthday'];
                        $found->biography = $actor['biography'];
                        $found->birthplace = $actor['birthplace'];
                        $found->nationality = $actor['nationality'];
                        $found->gender = $actor['gender'];
                        $found->image_url = URL('/') . '/' . $path;
                        $found->save();
                    }
                } else {
                    Actor::create([
                        'name' => $actor['name'],
                        'birthday' => $actor['birthday'],
                        'biography' => $actor['biography'],
                        'birthplace' => $actor['birthplace'],
                        'nationality' => $actor['nationality'],
                        'gender' => $actor['gender'],
                        'image_url' => URL('/') . '/' . $path,

                    ])
                        ->movies()
                        ->attach($movie->id);
                }
            }

            //update directors
            $directors = $request->directors;
            foreach ($directors as $director) {
                $imageName = time() . '.' . $director['image']->extension();
                $path = 'assets/images/directors/' . $imageName;
                $director['image']->move(public_path('assets/images/directors'), $imageName);

                if (array_key_exists('id', $director)) {

                    $found = Director::find($director['id']);
                    if ($found) {
                        //update director
                        $found->name = $director['name'];
                        $found->birthday = $director['birthday'];
                        $found->biography = $director['biography'];
                        $found->birthplace = $director['birthplace'];
                        $found->nationality = $director['nationality'];
                        $found->gender = $director['gender'];
                        $found->image_url = URL('/') . '/' . $path;
                        $found->save();
                    }
                } else {
                    Director::create([
                        'name' => $director['name'],
                        'birthday' => $director['birthday'],
                        'biography' => $director['biography'],
                        'birthplace' => $director['birthplace'],
                        'nationality' => $director['nationality'],
                        'gender' => $director['gender'],
                        'image_url' => URL('/') . '/' . $path,

                    ])
                        ->movies()
                        ->attach($movie->id);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Movie updated successfully',
                'data' => $movie
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], Response::HTTP_NOT_FOUND);
        }

        try {
            $movie->delete();

            return response()->json(['message' => 'Movie deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
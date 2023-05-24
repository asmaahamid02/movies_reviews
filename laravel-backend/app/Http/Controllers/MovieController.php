<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieResource;
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
        $movies = Movie::paginate($per_page);

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
            'release_year' => 'required|numeric',
            'images' => 'required|array|min:1',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'synopsis' => 'required|string',
            'trailer_url' => 'required|string|max:255',
            'duration' => 'required|integer',
            'country' => 'required|string',
            'language' => 'required|string',
            'age_restriction' => 'required|string',
            'international_rating' => 'required|numeric',
            'actors' => 'required|array|min:1',
            'actors.*' => 'required|integer|exists:actors,id',
            'directors' => 'required|array|min:1',
            'directors.*' => 'required|integer|exists:directors,id',
            'genres' => 'required|array|min:1',
            'genres.*' => 'required|integer|exists:genres,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], Response::HTTP_BAD_REQUEST);
        }

        try {
            DB::beginTransaction();
            $movie = Movie::create($request->only(['title', 'release_year', 'synopsis', 'trailer_url', 'duration', 'country', 'language', 'age_restriction', 'international_rating']));

            $movie->actors()->attach($request->actors);
            $movie->directors()->attach($request->directors);

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

            DB::commit();

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
            'data' => $movie
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
            'release_year' => 'date',
            'image_url' => 'string|max:255',
            'synopsis' => 'string',
            'trailer_url' => 'string|max:255',
            'duration' => 'integer',
            'country' => 'string',
            'language' => 'string',
            'age_restriction' => 'string',
            'international_rating' => 'float',
            'actors' => 'array|min:1',
            'actors.*' => 'integer|exists:actors,id',
            'directors' => 'array|min:1',
            'directors.*' => 'integer|exists:directors,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], Response::HTTP_BAD_REQUEST);
        }

        try {
            DB::beginTransaction();
            $movie->update($request->only(['title', 'release_year', 'image_url', 'synopsis', 'trailer_url', 'duration', 'country', 'language', 'age_restriction', 'international_rating']));

            if ($request->actors) {
                $movie->actors()->sync($request->actors);
            }

            if ($request->directors) {
                $movie->directors()->sync($request->directors);
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
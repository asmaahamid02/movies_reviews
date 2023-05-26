<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ActorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            //actors is an array of objects
            'actors' => 'required|array|min:1',
            'actors.*' => 'required',
            'actors.*.name' => 'required|string|max:255|min:3',
            'actors.*.image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'actors.*.birthday' => 'required|date|before:today',
            'actors.*.biography' => 'required|string',
            'actors.*.birthplace' => 'required|string',
            'actors.*.nationality' => 'required|string',
            'actors.*.gender' => 'required|string|in:male,female,other',
            'movie_id' => 'nullable|integer|exists:movies,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], Response::HTTP_BAD_REQUEST);
        }

        $actors = $request->actors;

        try {
            DB::beginTransaction();
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

                if ($request->movie_id) {
                    $saved->movies()->attach($request->movie_id);
                }
            }

            DB::commit();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage() . ' at ' . $e->getLine()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }


        return response()->json(['message' => 'Actors saved successfully'], Response::HTTP_OK);
        // $validator = Validator::make($request->all(), [
        //     'name' => 'required|string|max:255|min:3',
        //     'image_url' => 'required|string|max:255',
        //     'birthday' => 'required|date',
        //     'biography' => 'required|string',
        //     'birthplace' => 'required|string',
        //     'nationality' => 'required|string',
        //     'gender' => 'required|string|in:male,female,other',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json(['message' => $validator->errors()->first()], Response::HTTP_BAD_REQUEST);
        // }

        // $actor = new Actor();
        // $actor->fill($request->only(['name', 'image_url', 'birthday', 'biography', 'birthplace', 'nationality', 'gender']));
        // $saved = $actor->save();

        // if (!$saved) {
        //     return response()->json(['message' => 'Cannot save actor'], Response::HTTP_INTERNAL_SERVER_ERROR);
        // }

        // return response()->json([
        //     'message' => 'Actor created successfully',
        //     'data' => $actor
        // ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
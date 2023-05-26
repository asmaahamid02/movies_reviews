<?php

namespace App\Http\Controllers;

use App\Models\Director;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class DirectorController extends Controller
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
            //directors is an array of objects
            'directors' => 'required|array|min:1',
            'directors.*' => 'required',
            'directors.*.name' => 'required|string|max:255|min:3',
            'directors.*.image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'directors.*.birthday' => 'required|date|before:today',
            'directors.*.biography' => 'required|string',
            'directors.*.birthplace' => 'required|string',
            'directors.*.nationality' => 'required|string',
            'directors.*.gender' => 'required|string|in:male,female,other',
            'movie_id' => 'nullable|integer|exists:movies,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], Response::HTTP_BAD_REQUEST);
        }

        $directors = $request->directors;

        try {
            DB::beginTransaction();
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

                if ($request->movie_id) {
                    $saved->movies()->attach($request->movie_id);
                }
            }

            DB::commit();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage() . ' at ' . $e->getLine()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }


        return response()->json(['message' => 'Directors saved successfully'], Response::HTTP_OK);
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
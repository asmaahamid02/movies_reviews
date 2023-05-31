<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class FormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $forms = Form::all();

        if ($forms->isNotEmpty()) {
            return response()->json(['data' => $forms], Response::HTTP_OK);
        }

        return response()->json(['message' => 'No Forms Found'], Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'fields' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], Response::HTTP_BAD_REQUEST);
        }

        $form = Form::create($request->only(['title', 'fields']));

        return response()->json([
            'message' => 'Form Created Successfully',
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $form = Form::find($id);

        if ($form) {
            return response()->json(['data' => $form], Response::HTTP_OK);
        }

        return response()->json(['message' => 'Form Not Found'], Response::HTTP_NOT_FOUND);
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
        $form = Form::find($id);

        if ($form) {
            $form->delete();
            return response()->json(['message' => 'Form Deleted Successfully'], Response::HTTP_OK);
        }

        return response()->json(['message' => 'Form Not Found'], Response::HTTP_NOT_FOUND);
    }
}
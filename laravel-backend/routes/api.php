<?php

use App\Http\Controllers\{
    UserController,
    MovieController,
    GenreController,
    ActorController,
    DirectorController,
};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [\App\Http\Controllers\UserController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    ## User ##
    Route::get('/user', [UserController::class, 'user']);
    Route::post('/logout', [UserController::class, 'logout']);

    ## Movies ##
    Route::get('/movies', [MovieController::class, 'index']);
    Route::get('/movies/{id}', [MovieController::class, 'show']);

    ## Genres ##
    Route::get('/genres', [GenreController::class, 'index']);

    Route::middleware('isAdmin')->group(function () {
        ## Movie ##
        Route::post('/movies', [MovieController::class, 'store']);
        Route::put('/movies/{id}', [MovieController::class, 'update']);
        Route::delete('/movies/{id}', [MovieController::class, 'destroy']);

        ## User ##
        Route::get('/users', [UserController::class, 'index']);

        ## Actors ##
        Route::post('/actors', [ActorController::class, 'store']);

        ## Directors ##
        Route::post('/directors', [DirectorController::class, 'store']);
    });
});
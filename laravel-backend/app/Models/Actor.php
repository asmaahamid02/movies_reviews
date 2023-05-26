<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'birthday',
        'image_url',
        'biography',
        'birthplace',
        'nationality',
        'gender',
        'image_url'
    ];

    public function movies()
    {
        return $this->belongsToMany(Movie::class, 'movie_actors');
    }
}
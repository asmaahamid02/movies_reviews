<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'release_year',
        'synopsis',
        'trailer_url',
        'duration',
        'country',
        'language',
        'age_restriction',
        'international_rating',
    ];

    protected $with = ['actors', 'directors', 'genres', 'media'];

    public function actors()
    {
        return $this->belongsToMany(Actor::class, 'movie_actors');
    }

    public function directors()
    {
        return $this->belongsToMany(Director::class, 'movie_directors');
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'movie_genres');
    }

    public function media()
    {
        return $this->hasMany(MovieMedia::class);
    }
}
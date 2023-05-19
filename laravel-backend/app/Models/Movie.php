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
        'image_url',
        'synopsis',
        'trailer_url',
        'duration',
        'country',
        'language',
        'age_restriction',
        'international_rating',
    ];
}
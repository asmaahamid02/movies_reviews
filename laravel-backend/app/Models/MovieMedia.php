<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovieMedia extends Model
{
    use HasFactory;

    protected $table = 'movie_media';
    protected $fillable = [
        'movie_id',
        'media_url',
        'media_type'
    ];
}
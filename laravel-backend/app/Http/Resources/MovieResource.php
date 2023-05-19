<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MovieResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'release_year' => $this->release_year,
            'synopsis' => $this->synopsis,
            'trailer_url' => $this->trailer_url,
            'duration' => $this->duration,
            'country' => $this->country,
            'language' => $this->language,
            'age_restriction' => $this->age_restriction,
            'international_rating' => $this->international_rating,
            'created_at' => $this->created_at,
            'actors' => $this->actors,
            'directors' => $this->directors,
            'genres' => $this->genres,
            'media' => MediaResource::collection($this->media),
        ];
    }
}
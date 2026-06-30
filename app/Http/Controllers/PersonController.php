<?php

namespace App\Http\Controllers;

use App\Services\TmdbService;
use Inertia\Inertia;

class PersonController extends Controller
{
    public function __construct(protected TmdbService $tmdb) {}

    public function show(int $id)
    {
        $person = $this->tmdb->person($id);

        $knownFor = collect($person['combined_credits']['cast'] ?? [])
            ->sortByDesc('popularity')
            ->take(12)
            ->map(fn ($credit) => [
                'id' => $credit['id'],
                'title' => $credit['title'] ?? $credit['name'] ?? null,
                'character' => $credit['character'] ?? null,
                'poster' => $this->tmdb->imageUrl($credit['poster_path'] ?? null),
                'media_type' => $credit['media_type'] ?? 'movie',
            ])
            ->values();

        return Inertia::render('People/Show', [
            'person' => [
                'id' => $person['id'],
                'name' => $person['name'],
                'biography' => $person['biography'],
                'birthday' => $person['birthday'] ?? null,
                'place_of_birth' => $person['place_of_birth'] ?? null,
                'profile' => $this->tmdb->imageUrl($person['profile_path'] ?? null, 'h632'),
                'known_for' => $knownFor,
            ],
        ]);
    }
}
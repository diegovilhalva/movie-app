<?php

namespace App\Http\Controllers;

use App\Services\TmdbService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieController extends Controller
{
    public function __construct(protected TmdbService $tmdb) {}

    public function index(Request $request)
    {
        $page = $request->integer('page', 1);
        $data = $this->tmdb->popular($page);

        $movies = collect($data['results'])->map(fn ($movie) => [
            'id' => $movie['id'],
            'title' => $movie['title'],
            'overview' => $movie['overview'],
            'poster' => $this->tmdb->imageUrl($movie['poster_path']),
            'release_date' => $movie['release_date'],
            'vote_average' => $movie['vote_average'],
        ]);

        return Inertia::render('Movies/Index', [
            'movies' => $movies,
            'currentPage' => $data['page'],
            'totalPages' => $data['total_pages'],
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->string('q')->toString();

        if (!$query) {
            return Inertia::render('Movies/Search', ['movies' => [], 'query' => '']);
        }

        $data = $this->tmdb->search($query);

        $movies = collect($data['results'])->map(fn ($movie) => [
            'id' => $movie['id'],
            'title' => $movie['title'],
            'poster' => $this->tmdb->imageUrl($movie['poster_path']),
            'release_date' => $movie['release_date'] ?? null,
        ]);

        return Inertia::render('Movies/Search', ['movies' => $movies, 'query' => $query]);
    }

    public function show(int $id)
    {
        $movie = $this->tmdb->details($id);

        return Inertia::render('Movies/Show', [
            'movie' => [
                'id' => $movie['id'],
                'title' => $movie['title'],
                'overview' => $movie['overview'],
                'poster' => $this->tmdb->imageUrl($movie['poster_path']),
                'backdrop' => $this->tmdb->imageUrl($movie['backdrop_path'] ?? null, 'original'),
                'release_date' => $movie['release_date'],
                'vote_average' => $movie['vote_average'],
                'runtime' => $movie['runtime'] ?? null,
                'genres' => $movie['genres'] ?? [],
                'cast' => collect($movie['credits']['cast'] ?? [])->take(10)->values(),
            ],
        ]);
    }
}
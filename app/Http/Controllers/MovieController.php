<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Rating;
use App\Models\Watchlist;
use App\Services\TmdbService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieController extends Controller
{
    public function __construct(protected TmdbService $tmdb)
    {
    }

    public function index(Request $request)
    {
        $page = $request->integer('page', 1);
        $data = $this->tmdb->popular($page);

        $movies = collect($data['results'])->map(fn($movie) => [
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

        $movies = collect($data['results'])->map(fn($movie) => [
            'id' => $movie['id'],
            'title' => $movie['title'],
            'poster' => $this->tmdb->imageUrl($movie['poster_path']),
            'release_date' => $movie['release_date'] ?? null,
        ]);

        return Inertia::render('Movies/Search', ['movies' => $movies, 'query' => $query]);
    }

    public function show(Request $request, int $id)
    {
        $movie = $this->tmdb->details($id);

        $userRating = $request->user()
            ? Rating::where('user_id', $request->user()->id)->where('movie_id', $id)->value('stars')
            : null;

        $averageRating = Rating::where('movie_id', $id)->avg('stars');
        $ratingsCount = Rating::where('movie_id', $id)->count();

        $comments = Comment::with('user:id,name')
            ->where('movie_id', $id)
            ->latest()
            ->get()
            ->map(fn($c) => [
                'id' => $c->id,
                'body' => $c->body,
                'user_name' => $c->user->name,
                'user_id' => $c->user_id,
                'created_at' => $c->created_at->diffForHumans(),
            ]);

        $watchlistStatus = $request->user()
            ? Watchlist::where('user_id', $request->user()->id)
                ->where('movie_id', $id)
                ->value('status')
            : null;

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
            'userRating' => $userRating,
            'averageRating' => $averageRating ? round($averageRating, 1) : null,
            'ratingsCount' => $ratingsCount,
            'comments' => $comments,
            'watchlistStatus' => $watchlistStatus,
        ]);
    }
}
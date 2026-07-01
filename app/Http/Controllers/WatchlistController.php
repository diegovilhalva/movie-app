<?php

namespace App\Http\Controllers;

use App\Models\Watchlist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WatchlistController extends Controller
{
    public function index(Request $request)
    {
        $items = Watchlist::where('user_id', $request->user()->id)
            ->latest()
            ->get()
            ->groupBy('status');

        return Inertia::render('Watchlist/Index', [
            'wantToWatch' => $items->get('want_to_watch', collect())->values(),
            'watched' => $items->get('watched', collect())->values(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'movie_id' => 'required|integer',
            'movie_title' => 'required|string|max:255',
            'movie_poster' => 'nullable|string',
            'status' => 'required|in:want_to_watch,watched',
        ]);

        Watchlist::updateOrCreate(
            ['user_id' => $request->user()->id, 'movie_id' => $validated['movie_id']],
            [
                'movie_title' => $validated['movie_title'],
                'movie_poster' => $validated['movie_poster'],
                'status' => $validated['status'],
            ]
        );

        return back();
    }

    public function update(Request $request, int $movieId)
    {
        $validated = $request->validate([
            'status' => 'required|in:want_to_watch,watched',
        ]);

        Watchlist::where('user_id', $request->user()->id)
            ->where('movie_id', $movieId)
            ->update(['status' => $validated['status']]);

        return back();
    }

    public function destroy(Request $request, int $movieId)
    {
        Watchlist::where('user_id', $request->user()->id)
            ->where('movie_id', $movieId)
            ->delete();

        return back();
    }
}
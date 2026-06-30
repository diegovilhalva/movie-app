<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function store(Request $request, int $movieId)
    {
        $validated = $request->validate([
            'stars' => 'required|integer|min:1|max:5',
        ]);

        Rating::updateOrCreate(
            ['user_id' => $request->user()->id, 'movie_id' => $movieId],
            ['stars' => $validated['stars']]
        );

        return back();
    }

    public function destroy(Request $request, int $movieId)
    {
        Rating::where('user_id', $request->user()->id)
            ->where('movie_id', $movieId)
            ->delete();

        return back();
    }
}
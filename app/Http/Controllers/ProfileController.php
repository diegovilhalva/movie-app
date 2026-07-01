<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Comment;
use App\Models\Rating;
use App\Models\Watchlist;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {

        $user = $request->user();

        $ratings = Rating::where('user_id', $user->id)
            ->latest()
            ->get()
            ->map(fn($r) => [
                'movie_id' => $r->movie_id,
                'stars' => $r->stars,
                'created_at' => $r->created_at->diffForHumans(),
            ]);

        $comments = Comment::where('user_id', $user->id)
            ->latest()
            ->take(10)
            ->get()
            ->map(fn($c) => [
                'movie_id' => $c->movie_id,
                'body' => $c->body,
                'created_at' => $c->created_at->diffForHumans(),
            ]);

        $watchlistCount = Watchlist::where('user_id', $user->id)->count();
        $watchedCount = Watchlist::where('user_id', $user->id)->where('status', 'watched')->count();


        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'stats' => [
                'ratings' => $ratings->count(),
                'comments' => $comments->count(),
                'watchlist' => $watchlistCount,
                'watched' => $watchedCount,
            ],
            'ratings' => $ratings,
            'comments' => $comments,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}

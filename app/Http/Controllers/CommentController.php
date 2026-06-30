<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, int $movieId)
    {
        $validated = $request->validate([
            'body' => 'required|string|max:2000',
        ]);

        Comment::create([
            'user_id' => $request->user()->id,
            'movie_id' => $movieId,
            'body' => $validated['body'],
        ]);

        return back();
    }

    public function destroy(Request $request, Comment $comment)
    {
        abort_unless($comment->user_id === $request->user()->id, 403);

        $comment->delete();

        return back();
    }
}
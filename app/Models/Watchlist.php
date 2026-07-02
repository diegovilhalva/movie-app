<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Watchlist extends Model
{
    protected $fillable = ['user_id', 'movie_id', 'movie_title', 'movie_poster', 'status'];

    const STATUSES = ['want_to_watch', 'watched'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
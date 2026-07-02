<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\WatchlistController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;
use Inertia\Inertia;

Route::redirect('/', '/movies');

Route::redirect('/dashboard', '/movies');



Route::get('/movies', [MovieController::class, 'index'])->name('movies.index');
Route::get('/movies/search', [MovieController::class, 'search'])->name('movies.search');
Route::get('/movies/{id}', [MovieController::class, 'show'])->name('movies.show');
Route::get('/people/{id}', [PersonController::class, 'show'])->name('people.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::middleware('auth')->group(function () {
    Route::post('/movies/{movieId}/rating', [RatingController::class, 'store'])->name('ratings.store');
    Route::delete('/movies/{movieId}/rating', [RatingController::class, 'destroy'])->name('ratings.destroy');

    Route::post('/movies/{movieId}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');

    Route::get('/watchlist', [WatchlistController::class, 'index'])->name('watchlist.index');
    Route::post('/watchlist', [WatchlistController::class, 'store'])->name('watchlist.store');
    Route::patch('/watchlist/{movieId}', [WatchlistController::class, 'update'])->name('watchlist.update');
    Route::delete('/watchlist/{movieId}', [WatchlistController::class, 'destroy'])->name('watchlist.destroy');
});



require __DIR__ . '/auth.php';

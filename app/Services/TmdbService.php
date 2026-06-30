<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class TmdbService
{
    protected string $baseUrl;
    protected string $token;

    public function __construct()
    {
        $this->baseUrl = config('services.tmdb.base_url');
        $this->token = config('services.tmdb.token');
    }

    protected function client()
    {
        return Http::withToken($this->token)
            ->baseUrl($this->baseUrl)
            ->acceptJson();
    }

    public function popular(int $page = 1): array
    {
        return Cache::remember("tmdb.popular.page.{$page}", now()->addHours(6), function () use ($page) {
            $response = $this->client()->get('/movie/popular', [
                'page' => $page,
                'language' => 'pt-BR',
            ]);

            $response->throw();

            return $response->json();
        });
    }

    public function search(string $query, int $page = 1): array
    {
        $cacheKey = 'tmdb.search.' . md5($query) . ".page.{$page}";

        return Cache::remember($cacheKey, now()->addHours(1), function () use ($query, $page) {
            $response = $this->client()->get('/search/movie', [
                'query' => $query,
                'page' => $page,
                'language' => 'pt-BR',
            ]);

            $response->throw();

            return $response->json();
        });
    }

    public function details(int $movieId): array
    {
        return Cache::remember("tmdb.movie.{$movieId}", now()->addHours(24), function () use ($movieId) {
            $response = $this->client()->get("/movie/{$movieId}", [
                'language' => 'pt-BR',
                'append_to_response' => 'credits,videos,similar',
            ]);

            $response->throw();

            return $response->json();
        });
    }

    public function imageUrl(?string $path, string $size = 'w500'): ?string
    {
        if (!$path) {
            return null;
        }

        return config('services.tmdb.image_base_url') . "/{$size}{$path}";
    }

    public function person(int $personId): array
    {
        return Cache::remember("tmdb.person.{$personId}", now()->addHours(24), function () use ($personId) {
            $response = $this->client()->get("/person/{$personId}", [
                'language' => 'pt-BR',
                'append_to_response' => 'combined_credits',
            ]);

            $response->throw();

            return $response->json();
        });
    }
}
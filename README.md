# 🎬 Movie App

Catálogo de filmes com dados em tempo real da [TMDB API](https://www.themoviedb.org/documentation/api), construído com Laravel + Inertia.js + React.

Reimaginação de um projeto antigo ([laravel-movies-example](https://github.com/drehimself/laravel-movies-example)), refeito do zero com stack moderna e novas features.

## Stack

- **Backend:** Laravel 13, PHP 8.5
- **Frontend:** React, Inertia.js, Tailwind CSS
- **Banco:** MySQL
- **Auth:** Laravel Breeze

## Features

- Catálogo de filmes populares com paginação
- Busca de filmes em tempo real
- Página de detalhes com elenco e informações completas
- Cache de requisições à TMDB API
- Autenticação de usuários (Breeze)
- *(em desenvolvimento)* Avaliações e comentários por usuário logado

## Setup local



```bash
git clone [https://github.com/diegovilhalva/movie-app.git](https://github.com/diegovilhalva/movie-app.git)
cd movie-app
composer install
npm install
cp .env.example .env
php artisan key:generate
```

Configure no `.env`:
```bash
DB_DATABASE=movie_app
DB_USERNAME=...
DB_PASSWORD=...
TMDB_TOKEN=seu_token_v4_aqui
```
```bash
php artisan migrate
composer run dev[
```

Acesse http://localhost:8000
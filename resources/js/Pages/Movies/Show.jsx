import { Link } from "@inertiajs/react";
import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';


export default function Show({ movie, userRating, averageRating, ratingsCount, comments }) {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {movie.backdrop && (
                <div
                    className="h-80 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${movie.backdrop})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
                </div>
            )}

            <div className="max-w-5xl mx-auto px-6 -mt-32 relative flex flex-col sm:flex-row gap-8">
                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-3/4 sm:w-48 h-full rounded-lg shadow-lg flex-shrink-0"
                />

                <div className="pt-32">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <div className="flex gap-3 text-sm text-gray-400 mt-2">
                        <span>{movie.release_date?.slice(0, 4)}</span>
                        {movie.runtime && <span>{movie.runtime} min</span>}
                        <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                    </div>

                    <div className="flex gap-2 mt-3">
                        {movie.genres.map((g) => (
                            <span key={g.id} className="text-xs bg-gray-800 px-2 py-1 rounded">
                                {g.name}
                            </span>
                        ))}
                    </div>
                    <StarRating
                        movieId={movie.id}
                        userRating={userRating}
                        averageRating={averageRating}
                        ratingsCount={ratingsCount}
                    />

                    <p className="mt-6 text-gray-300 max-w-2xl leading-relaxed">{movie.overview}</p>

                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 mt-10 pb-10">
                <h2 className="text-xl font-semibold mb-4">Elenco</h2>
                <div className="flex gap-4 overflow-x-auto">
                    {movie.cast.map((actor) => (
                        <Link href={`/people/${actor.id}`} key={actor.id} className="flex-shrink-0 w-24 text-center">
                            <div className="w-24 h-24 rounded-full bg-gray-800 overflow-hidden">
                                {actor.profile_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                        alt={actor.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <p className="text-xs mt-2">{actor.name}</p>
                        </Link>
                    ))}
                </div>
                <Comments movieId={movie.id} comments={comments} />
            </div>
        </div>
    );
}



function StarRating({ movieId, userRating, averageRating, ratingsCount }) {
    const { auth } = usePage().props;
    const [hover, setHover] = useState(0);

    if (!auth?.user) {
        return (
            <div className="text-sm text-gray-400 mt-4">
                {averageRating ? `⭐ ${averageRating} (${ratingsCount} avaliações)` : 'Sem avaliações ainda'}
                {' — '}
                <a href="/login" className="text-blue-400 hover:underline">Faça login para avaliar</a>
            </div>
        );
    }

    const handleClick = (stars) => {
        router.post(`/movies/${movieId}/rating`, { stars }, { preserveScroll: true });
    };

    return (
        <div className="mt-4">
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => handleClick(star)}
                        className="text-2xl"
                    >
                        {(hover || userRating) >= star ? '★' : '☆'}
                    </button>
                ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">
                {averageRating ? `Média: ${averageRating} (${ratingsCount} avaliações)` : 'Seja o primeiro a avaliar'}
            </p>
        </div>
    );
}

function Comments({ movieId, comments }) {
    const { auth } = usePage().props;
    const [body, setBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!body.trim()) return;
        router.post(`/movies/${movieId}/comments`, { body }, {
            preserveScroll: true,
            onSuccess: () => setBody(''),
        });
    };

    const handleDelete = (commentId) => {
        router.delete(`/comments/${commentId}`, { preserveScroll: true });
    };
    console.log(comments)
    return (
        <div className="max-w-5xl mx-auto px-6 mt-10 pb-10">
            <h2 className="text-xl font-semibold mb-4">Comentários</h2>

            {auth?.user ? (
                <form onSubmit={handleSubmit} className="mb-6">
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Deixe seu comentário..."
                        className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white text-sm"
                        rows={3}
                    />
                    <button type="submit" className="mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">
                        Comentar
                    </button>
                </form>
            ) : (
                <p className="text-sm text-gray-400 mb-6">
                    <a href="/login" className="text-blue-400 hover:underline">Faça login</a> para comentar
                </p>
            )}

            <div className="space-y-4">
                {comments.map((c) => (
                    <div key={c.id} className="bg-gray-900 rounded p-4">
                        <div className="flex justify-between items-start">
                            <p className="text-sm font-medium">{c.user_name}</p>
                            <span className="text-xs text-gray-500">{c.created_at}</span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">{c.body}</p>
                        {auth?.user?.id === c.user_id && (
                            <button
                                onClick={() => handleDelete(c.id)}
                                className="text-xs text-red-400 hover:underline mt-2"
                            >
                                Excluir
                            </button>
                        )}
                    </div>
                ))}
                {comments.length === 0 && (
                    <p className="text-sm text-gray-500">Nenhum comentário ainda.</p>
                )}
            </div>
        </div>
    );
}

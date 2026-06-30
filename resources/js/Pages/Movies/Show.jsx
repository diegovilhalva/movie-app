import { Link } from "@inertiajs/react";

export default function Show({ movie }) {
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

                    <p className="mt-6 text-gray-300 max-w-2xl leading-relaxed">{movie.overview}</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 mt-10 pb-10">
                <h2 className="text-xl font-semibold mb-4">Elenco</h2>
                <div className="flex gap-4 overflow-x-auto">
                    {movie.cast.map((actor) => (
                        <Link  href={`/people/${actor.id}`}  key={actor.id} className="flex-shrink-0 w-24 text-center">
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
            </div>
        </div>
    );
}
import Navbar from '@/Components/Navbar';
import { Link, router } from '@inertiajs/react';

function MovieCard({ item, onRemove, onToggle }) {
    return (
        <div className="flex gap-3 bg-gray-900 rounded-lg p-3">
            <Link href={`/movies/${item.movie_id}`}>
                {item.movie_poster ? (
                    <img
                        src={item.movie_poster}
                        alt={item.movie_title}
                        className="w-16 rounded flex-shrink-0"
                    />
                ) : (
                    <div className="w-16 h-24 bg-gray-800 rounded flex-shrink-0" />
                )}
            </Link>
            <div className="flex flex-col justify-between">
                <Link href={`/movies/${item.movie_id}`} className="text-sm font-medium hover:underline">
                    {item.movie_title}
                </Link>
                <div className="flex gap-3 text-xs mt-2">
                    <button
                        onClick={() => onToggle(item.movie_id, item.status)}
                        className="text-blue-400 hover:underline"
                    >
                        {item.status === 'want_to_watch' ? '✅ Marcar como assistido' : '🔖 Mover pra watchlist'}
                    </button>
                    <button
                        onClick={() => onRemove(item.movie_id)}
                        className="text-red-400 hover:underline"
                    >
                        Remover
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Index({ wantToWatch, watched }) {
    const handleRemove = (movieId) => {
        router.delete(`/watchlist/${movieId}`, { preserveScroll: true });
    };

    const handleToggle = (movieId, currentStatus) => {
        const newStatus = currentStatus === 'want_to_watch' ? 'watched' : 'want_to_watch';
        router.patch(`/watchlist/${movieId}`, { status: newStatus }, { preserveScroll: true });
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 py-10">
                <h1 className="text-2xl font-bold mb-8">Minha Watchlist</h1>

                <section className="mb-10">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        🔖 Quero assistir
                        <span className="text-sm text-gray-500 font-normal">({wantToWatch.length})</span>
                    </h2>
                    {wantToWatch.length === 0 ? (
                        <p className="text-sm text-gray-500">Nenhum filme aqui ainda.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {wantToWatch.map((item) => (
                                <MovieCard
                                    key={item.id}
                                    item={item}
                                    onRemove={handleRemove}
                                    onToggle={handleToggle}
                                />
                            ))}
                        </div>
                    )}
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        ✅ Já assisti
                        <span className="text-sm text-gray-500 font-normal">({watched.length})</span>
                    </h2>
                    {watched.length === 0 ? (
                        <p className="text-sm text-gray-500">Nenhum filme aqui ainda.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {watched.map((item) => (
                                <MovieCard
                                    key={item.id}
                                    item={item}
                                    onRemove={handleRemove}
                                    onToggle={handleToggle}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
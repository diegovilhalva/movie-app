import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

export default function WatchlistButton({ movie, watchlistStatus }) {
    const { auth } = usePage().props;
    const [status, setStatus] = useState(watchlistStatus);

    if (!auth?.user) {
        return (
            <a href="/login" className="text-sm text-blue-400 hover:underline mt-4 inline-block">
                Faça login para adicionar à watchlist
            </a>
        );
    }

    const handleAdd = (newStatus) => {
        router.post('/watchlist', {
            movie_id: movie.id,
            movie_title: movie.title,
            movie_poster: movie.poster,
            status: newStatus,
        }, {
            preserveScroll: true,
            onSuccess: () => setStatus(newStatus),
        });
    };

    const handleUpdate = (newStatus) => {
        router.patch(`/watchlist/${movie.id}`, { status: newStatus }, {
            preserveScroll: true,
            onSuccess: () => setStatus(newStatus),
        });
    };

    const handleRemove = () => {
        router.delete(`/watchlist/${movie.id}`, {
            preserveScroll: true,
            onSuccess: () => setStatus(null),
        });
    };

    if (!status) {
        return (
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => handleAdd('want_to_watch')}
                    className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-sm px-3 py-1.5 rounded"
                >
                    🔖 Quero assistir
                </button>
                <button
                    onClick={() => handleAdd('watched')}
                    className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-sm px-3 py-1.5 rounded"
                >
                    ✅ Já assisti
                </button>
            </div>
        );
    }

    return (
        <div className="flex gap-2 mt-4 items-center">
            <span className="text-sm text-gray-300">
                {status === 'want_to_watch' ? '🔖 Quero assistir' : '✅ Já assisti'}
            </span>
            {status === 'want_to_watch' ? (
                <button
                    onClick={() => handleUpdate('watched')}
                    className="text-xs text-blue-400 hover:underline"
                >
                    Marcar como assistido
                </button>
            ) : (
                <button
                    onClick={() => handleUpdate('want_to_watch')}
                    className="text-xs text-blue-400 hover:underline"
                >
                    Mover pra watchlist
                </button>
            )}
            <button
                onClick={handleRemove}
                className="text-xs text-red-400 hover:underline"
            >
                Remover
            </button>
        </div>
    );
}
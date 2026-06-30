import { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Search({ movies, query }) {
    const [term, setTerm] = useState(query);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.get('/movies/search', { q: term }, { preserveState: true });
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
                <div className="max-w-7xl mx-auto">
                    <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
                        <input
                            type="text"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            placeholder="Buscar filme..."
                            className="flex-1 bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-gray-500"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded">
                            Buscar
                        </button>
                    </form>

                    {query && (
                        <p className="text-gray-400 mb-4">
                            {movies.length} resultado(s) para "{query}"
                        </p>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {movies.map((movie) => (
                            <Link key={movie.id} href={`/movies/${movie.id}`} className="group block">
                                <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-800">
                                    {movie.poster ? (
                                        <img
                                            src={movie.poster}
                                            alt={movie.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                                            Sem imagem
                                        </div>
                                    )}
                                </div>
                                <h2 className="mt-2 text-sm font-medium line-clamp-2">{movie.title}</h2>
                                <p className="text-xs text-gray-400">{movie.release_date?.slice(0, 4)}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
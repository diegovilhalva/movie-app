import Navbar from '@/Components/Navbar';
import { Link, router } from '@inertiajs/react';

export default function Index({ movies, currentPage, totalPages }) {
    const goToPage = (page) => {
        router.get('/movies', { page }, { preserveScroll: true });
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />
            <div className="px-6 py-10">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Filmes Populares</h1>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {movies.map((movie) => (
                            <Link
                                key={movie.id}
                                href={`/movies/${movie.id}`}
                                className="group block"
                            >
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

                    <div className="flex justify-center gap-4 mt-10">
                        <button
                            disabled={currentPage <= 1}
                            onClick={() => goToPage(currentPage - 1)}
                            className="px-4 py-2 bg-gray-800 rounded disabled:opacity-40"
                        >
                            Anterior
                        </button>
                        <span className="px-4 py-2">{currentPage} / {totalPages}</span>
                        <button
                            disabled={currentPage >= totalPages}
                            onClick={() => goToPage(currentPage + 1)}
                            className="px-4 py-2 bg-gray-800 rounded disabled:opacity-40"
                        >
                            Próxima
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
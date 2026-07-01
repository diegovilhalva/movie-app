import Navbar from '@/Components/Navbar';
import { Link, router } from '@inertiajs/react';

export default function Index({ movies, currentPage, totalPages, genres, currentGenre, trending }) {
    const goToPage = (page) => {
        router.get('/movies', { page, genre: currentGenre || undefined }, { preserveScroll: true });
    };

    const handleGenre = (genreId) => {
        router.get('/movies', { genre: genreId || undefined, page: 1 });
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />
            <div className="px-6 py-10">
                <div className="max-w-7xl mx-auto">
                    {trending?.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                🔥 Em Alta essa Semana
                            </h2>

                            <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                {trending.map((movie) => (
                                    <Link
                                        key={movie.id}
                                        href={`/movies/${movie.id}`}
                                        className="group flex-shrink-0 w-36"
                                    >
                                        <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-800">
                                            {movie.poster ? (
                                                <img
                                                    src={movie.poster}
                                                    alt={movie.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                                                    Sem imagem
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-xs mt-2 line-clamp-2">{movie.title}</p>
                                        <p className="text-xs text-gray-500">⭐ {movie.vote_average?.toFixed(1)}</p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                    <h1 className="text-3xl font-bold mb-6">
                        {currentGenre
                            ? genres.find(g => g.id === currentGenre)?.name
                            : 'Filmes Populares'}
                    </h1>

                    {/* Filtros de gênero */}
                    <div className="flex gap-2 flex-wrap mb-8">
                        <button
                            onClick={() => handleGenre(null)}
                            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${!currentGenre
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                        >
                            Todos
                        </button>
                        {genres.map((genre) => (
                            <button
                                key={genre.id}
                                onClick={() => handleGenre(genre.id)}
                                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${currentGenre === genre.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    }`}
                            >
                                {genre.name}
                            </button>
                        ))}
                    </div>

                    {/* Grid de filmes */}
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

                    {/* Paginação */}
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
import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { auth } = usePage().props;
    const [term, setTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (!term.trim()) return;
        router.get('/movies/search', { q: term });
    };

    return (
        <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-6">
                <Link href="/movies" className="text-lg font-bold text-white flex-shrink-0">
                    🎬 MovieApp
                </Link>

                <form onSubmit={handleSearch} className="flex-1 max-w-md">
                    <input
                        type="text"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        placeholder="Buscar filme..."
                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gray-500"
                    />
                </form>

                <div className="ml-auto flex items-center gap-4 text-sm">
                    {auth?.user ? (
                        <>
                            <span className="text-gray-400 hidden sm:inline">
                                Olá, {auth.user.name}
                            </span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="text-gray-300 hover:text-white"
                            >
                                Sair
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-300 hover:text-white">
                                Entrar
                            </Link>
                            <Link
                                href="/register"
                                className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded"
                            >
                                Criar conta
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
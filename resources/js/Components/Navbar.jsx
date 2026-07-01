import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { auth } = usePage().props;
    const [term, setTerm] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!term.trim()) return;
        router.get('/movies/search', { q: term });
        setMenuOpen(false);
    };

    return (
        <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/movies" className="text-lg font-bold text-white flex-shrink-0">
                    🎬 MovieApp
                </Link>

                {/* Busca — visível só em sm+ */}
                <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md">
                    <input
                        type="text"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        placeholder="Buscar filme..."
                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gray-500"
                    />
                </form>

                {/* Auth links — visível só em sm+ */}
                <div className="hidden sm:flex items-center gap-4 text-sm">
                    {auth?.user ? (
                        <>
                            <span className="text-gray-400">{auth.user.name}</span>
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

                {/* Hambúrguer — visível só em mobile */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="sm:hidden text-gray-300 hover:text-white focus:outline-none"
                    aria-label="Menu"
                >
                    {menuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Menu mobile expandido */}
            {menuOpen && (
                <div className="sm:hidden border-t border-gray-800 px-6 py-4 flex flex-col gap-4">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            placeholder="Buscar filme..."
                            className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-gray-500"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm">
                            Buscar
                        </button>
                    </form>

                    <div className="flex flex-col gap-3 text-sm">
                        {auth?.user ? (
                            <>
                                <span className="text-gray-400">Olá, {auth.user.name}</span>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="text-left text-gray-300 hover:text-white"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Sair
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-300 hover:text-white"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Entrar
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-center"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Criar conta
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
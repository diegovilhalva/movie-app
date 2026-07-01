import Navbar from '@/Components/Navbar';
import { Head, Link } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

function StatCard({ label, value }) {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-gray-400 mt-1">{label}</p>
        </div>
    );
}

export default function Edit({ mustVerifyEmail, status, stats, ratings, comments }) {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />
            <Head title="Perfil" />

            <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
                <h1 className="text-2xl font-bold">Meu Perfil</h1>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <StatCard label="Avaliações" value={stats.ratings} />
                    <StatCard label="Comentários" value={stats.comments} />
                    <StatCard label="Na Watchlist" value={stats.watchlist} />
                    <StatCard label="Já assistidos" value={stats.watched} />
                </div>

                {/* Histórico de avaliações */}
                {ratings.length > 0 && (
                    <section>
                        <h2 className="text-lg font-semibold mb-3">Minhas Avaliações</h2>
                        <div className="space-y-2">
                            {ratings.map((r) => (
                                <div key={r.movie_id} className="flex items-center justify-between bg-gray-900 rounded px-4 py-2">
                                    <Link href={`/movies/${r.movie_id}`} className="text-sm hover:underline text-blue-400">
                                        Ver filme #{r.movie_id}
                                    </Link>
                                    <div className="flex items-center gap-3">
                                        <span className="text-yellow-400">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</span>
                                        <span className="text-xs text-gray-500">{r.created_at}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Histórico de comentários */}
                {comments.length > 0 && (
                    <section>
                        <h2 className="text-lg font-semibold mb-3">Meus Comentários</h2>
                        <div className="space-y-2">
                            {comments.map((c, i) => (
                                <div key={i} className="bg-gray-900 rounded px-4 py-3">
                                    <div className="flex justify-between items-start mb-1">
                                        <Link href={`/movies/${c.movie_id}`} className="text-xs text-blue-400 hover:underline">
                                            Ver filme #{c.movie_id}
                                        </Link>
                                        <span className="text-xs text-gray-500">{c.created_at}</span>
                                    </div>
                                    <p className="text-sm text-gray-300">{c.body}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Formulários do Breeze */}
                <section>
                    <h2 className="text-lg font-semibold mb-3">Informações da Conta</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
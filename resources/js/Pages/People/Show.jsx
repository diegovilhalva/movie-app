import { Link } from '@inertiajs/react';

export default function Show({ person }) {
    return (
        <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
            <div className="max-w-5xl mx-auto flex gap-8">
                <div className="w-48 flex-shrink-0">
                    <div className="aspect-[2/3] rounded-lg bg-gray-800 overflow-hidden">
                        {person.profile && (
                            <img src={person.profile} alt={person.name} className="w-full h-full object-cover" />
                        )}
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold">{person.name}</h1>
                    <div className="text-sm text-gray-400 mt-2 space-y-1">
                        {person.birthday && <p>Nascimento: {person.birthday}</p>}
                        {person.place_of_birth && <p>Local: {person.place_of_birth}</p>}
                    </div>
                    <p className="mt-6 text-gray-300 leading-relaxed max-w-2xl">
                        {person.biography || 'Sem biografia disponível.'}
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto mt-10">
                <h2 className="text-xl font-semibold mb-4">Conhecido por</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {person.known_for.map((credit, i) => (
                        <Link
                            key={`${credit.id}-${i}`}
                            href={credit.media_type === 'movie' ? `/movies/${credit.id}` : '#'}
                            className="block"
                        >
                            <div className="aspect-[2/3] rounded-lg bg-gray-800 overflow-hidden">
                                {credit.poster && (
                                    <img src={credit.poster} alt={credit.title} className="w-full h-full object-cover" />
                                )}
                            </div>
                            <p className="text-xs mt-1 line-clamp-1">{credit.title}</p>
                            {credit.character && (
                                <p className="text-xs text-gray-500 line-clamp-1">{credit.character}</p>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { useSettings } from '@/context/SettingsContext';
import {
    Search as SearchIcon,
    ChevronLeft,
    Loader2,
    ArrowRight,
} from 'lucide-react';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { settings } = useSettings();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim()) {
                performSearch();
            } else {
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    async function performSearch() {
        setLoading(true);

        try {
            const res = await fetch(
                `http://localhost:3001/search?q=${encodeURIComponent(query)}`
            );

            if (res.ok) {
                const data = await res.json();
                setResults(data);
            }
        } catch (err) {
            console.error('Search error', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <main className="flex-1 lg:pr-80">
                <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                    <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
                        <Link
                            href="/"
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Link>

                        <div className="relative flex-1">
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />

                            <input
                                type="text"
                                autoFocus
                                placeholder="Search ayahs by translation..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-emerald-500 rounded-2xl outline-none border-2 transition-all font-medium"
                            />

                            {loading && (
                                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-emerald-600 w-5 h-5" />
                            )}
                        </div>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto px-6 py-12">
                    {results.length > 0 ? (
                        <div className="space-y-8">
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest px-4">
                                Found {results.length} results
                            </p>

                            {results.map((result) => (
                                <div
                                    key={`${result.surah_id}-${result.verse_id}`}
                                    className="group relative p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <Link
                                            href={`/surah/${result.surah_id}#v${result.verse_id}`}
                                            className="flex items-center gap-2 text-emerald-600 font-bold hover:underline"
                                        >
                                            Surah {result.surah_name} · Ayat {result.verse_id}
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>

                                    <div className="space-y-6">
                                        <p
                                            className="text-right leading-[1.8] dark:text-white"
                                            style={{
                                                fontFamily: settings.arabicFont,
                                                fontSize: '28px',
                                                direction: 'rtl',
                                            }}
                                        >
                                            {result.text}
                                        </p>

                                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                                {result.translation}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : query && !loading ? (
                        <div className="text-center py-20 space-y-4">
                            <div className="inline-block p-6 bg-slate-100 dark:bg-slate-800 rounded-3xl">
                                <SearchIcon className="w-12 h-12 text-slate-300" />
                            </div>
                            <p className="text-slate-500 font-medium">
                                No results found for "{query}"
                            </p>
                        </div>
                    ) : (
                        !query && (
                            <div className="text-center py-20 space-y-4">
                                <p className="text-slate-400 font-medium italic">
                                    Try searching for words like "patience", "mercy", or "peace".
                                </p>
                            </div>
                        )
                    )}
                </div>
            </main>

            <Sidebar />
        </div>
    );
}
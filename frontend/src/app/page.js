import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { Book, Search as SearchIcon } from 'lucide-react';

async function getSurahs() {
  const res = await fetch('http://localhost:3001/surahs', {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error('Failed to fetch surahs');

  return res.json();
}

export default async function HomePage() {
  const surahs = await getSurahs();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="flex-1 lg:pr-80">
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-500/20">
                <Book className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                Al-Quran
              </h1>
            </div>

            <Link
              href="/search"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all font-medium text-sm group"
            >
              <SearchIcon className="w-4 h-4 text-slate-500 group-hover:scale-110 transition-transform" />
              <span>Search Ayahs</span>
            </Link>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-12 text-center space-y-4">
            <h2 className="text-4xl font-black tracking-tight dark:text-white">
              The Noble Quran
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Read and explore all 114 Surahs with beautiful typography and translations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surahs.map((surah) => (
              <Link
                key={surah.id}
                href={`/surah/${surah.id}`}
                className="group relative p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    {surah.id}
                  </div>

                  <div className="text-right">
                    <p
                      className="text-2xl"
                      style={{ fontFamily: 'var(--font-amiri)' }}
                    >
                      {surah.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      {surah.type}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {surah.transliteration}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {surah.translation} · {surah.total_verses} Verses
                  </p>
                </div>

                <div className="absolute inset-x-6 bottom-4 h-1 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Sidebar />
    </div>
  );
}
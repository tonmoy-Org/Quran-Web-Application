import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import VerseList from '@/components/VerseList';
import { ChevronLeft, Share2 } from 'lucide-react';

async function getSurah(id) {
  const res = await fetch(`http://localhost:3001/surahs/${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch surah');
  return res.json();
}

export default async function SurahPage({ params }) {
  const { id } = await params;
  const surah = await getSurah(id);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="flex-1 lg:pr-80">
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link 
              href="/"
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500"
            >
              <ChevronLeft className="w-6 h-6" />
            </Link>
            
            <div className="text-center">
              <h1 className="text-lg font-bold tracking-tight">{surah.transliteration}</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{surah.translation}</p>
            </div>

            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="relative p-12 bg-emerald-600 rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-600/20 text-white mb-16">
            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              <div className="px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-tighter">
                Surah {surah.id} · {surah.type}
              </div>
              <p className="text-6xl font-arabic" style={{ fontFamily: 'var(--font-amiri)' }}>
                {surah.name}
              </p>
              <div className="space-y-1">
                <h2 className="text-3xl font-black">{surah.transliteration}</h2>
                <p className="text-emerald-100 font-medium">({surah.translation})</p>
              </div>
              
              <div className="flex gap-4 pt-4">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold">{surah.total_verses}</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-200">Ayahs</span>
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl -ml-16 -mb-16" />
          </div>

          {surah.id !== 9 && (
            <div className="text-center mb-16 py-8 border-y border-slate-200 dark:border-slate-800">
              <p className="text-4xl font-arabic dark:text-white" style={{ fontFamily: 'var(--font-amiri)' }}>
                بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
              </p>
              <p className="text-xs text-slate-400 mt-4 font-bold tracking-widest uppercase">
                In the name of Allah, the Entirely Merciful, the Especially Merciful
              </p>
            </div>
          )}

          <VerseList verses={surah.verses} />
        </div>
      </main>

      <Sidebar />
    </div>
  );
}
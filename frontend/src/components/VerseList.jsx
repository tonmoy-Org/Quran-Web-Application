'use client';

import React from 'react';
import { useSettings } from '@/context/SettingsContext';

export default function VerseList({ verses }) {
  const { settings } = useSettings();

  return (
    <div className="space-y-12">
      {verses.map((verse) => (
        <div 
          key={verse.id} 
          id={`v${verse.id}`}
          className="group relative p-8 bg-white dark:bg-slate-900 rounded-4xl border border-slate-200 dark:border-slate-800 transition-all hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-500/30"
        >
          <div className="absolute -top-4 left-8 px-4 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-500 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            Verse {verse.id}
          </div>

          <div className="space-y-8">
            <p 
              className="text-right leading-[1.8] dark:text-white"
              style={{ 
                fontFamily: settings.arabicFont, 
                fontSize: `${settings.arabicFontSize}px`,
                direction: 'rtl'
              }}
            >
              {verse.text}
            </p>

            <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
              <p 
                className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium"
                style={{ fontSize: `${settings.translationFontSize}px` }}
              >
                {verse.translation}
              </p>
            </div>
          </div>
          
          <div className="absolute bottom-6 right-8 text-[80px] font-black text-slate-50/50 dark:text-slate-800/20 select-none pointer-events-none group-hover:text-emerald-500/5 transition-colors">
            {verse.id}
          </div>
        </div>
      ))}
    </div>
  );
}
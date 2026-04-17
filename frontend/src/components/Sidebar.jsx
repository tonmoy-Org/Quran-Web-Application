'use client';

import React, { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { Settings, Type, Menu, X } from 'lucide-react';

export default function Sidebar() {
    const { settings, updateSettings } = useSettings();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-600 text-white rounded-full shadow-lg lg:hidden transition-transform active:scale-90"
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            <aside
                className={`fixed top-0 right-0 h-full bg-white dark:bg-slate-900 shadow-2xl transition-all duration-300 z-40 ${isOpen
                        ? 'w-full sm:w-80'
                        : 'w-0 lg:w-80 overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800'
                    }`}
            >
                <div className="p-8 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-10">
                        <Settings className="text-emerald-600 w-6 h-6" />
                        <h2 className="text-xl font-bold tracking-tight">
                            Display Settings
                        </h2>
                    </div>

                    <div className="space-y-8 flex-1">
                        <div className="space-y-4">
                            <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <Type className="w-4 h-4" /> Arabic Font
                            </label>

                            <div className="grid grid-cols-1 gap-2">
                                {[
                                    { name: 'Amiri', value: 'var(--font-amiri)' },
                                    { name: 'Scheherazade', value: 'var(--font-scheherazade)' },
                                ].map((font) => (
                                    <button
                                        key={font.value}
                                        onClick={() =>
                                            updateSettings({ arabicFont: font.value })
                                        }
                                        className={`text-left p-3 rounded-xl border-2 transition-all ${settings.arabicFont === font.value
                                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                                                : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                                            }`}
                                    >
                                        <span
                                            style={{ fontFamily: font.value }}
                                            className="text-xl"
                                        >
                                            بسم الله
                                        </span>
                                        <p className="text-xs mt-1 font-medium">{font.name}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider block">
                                Arabic Font Size ({settings.arabicFontSize}px)
                            </label>

                            <input
                                type="range"
                                min="20"
                                max="64"
                                step="2"
                                value={settings.arabicFontSize}
                                onChange={(e) =>
                                    updateSettings({
                                        arabicFontSize: parseInt(e.target.value),
                                    })
                                }
                                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider block">
                                Translation Font Size ({settings.translationFontSize}px)
                            </label>

                            <input
                                type="range"
                                min="12"
                                max="32"
                                step="1"
                                value={settings.translationFontSize}
                                onChange={(e) =>
                                    updateSettings({
                                        translationFontSize: parseInt(e.target.value),
                                    })
                                }
                                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                            />
                        </div>
                    </div>

                    <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800 text-slate-400 text-xs text-center">
                        Settings are saved to your browser.
                    </div>
                </div>
            </aside>

            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
                />
            )}
        </>
    );
}
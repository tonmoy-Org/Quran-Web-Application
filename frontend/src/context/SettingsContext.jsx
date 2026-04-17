/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const SettingsContext = createContext(undefined);

const DEFAULT_SETTINGS = {
    arabicFont: 'var(--font-amiri)',
    arabicFontSize: 32,
    translationFontSize: 16,
};

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('quran-settings');

        if (saved) {
            try {
                setSettings(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse settings', e);
            }
        }

        setIsLoaded(true);
    }, []);

    const updateSettings = (newSettings) => {
        setSettings((prev) => {
            const updated = { ...prev, ...newSettings };
            localStorage.setItem('quran-settings', JSON.stringify(updated));
            return updated;
        });
    };

    if (!isLoaded) return null;

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }

    return context;
}
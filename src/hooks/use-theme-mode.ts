'use client';

import { useSyncExternalStore } from 'react';

export type ThemeMode = 'system' | 'light' | 'dark';
const storageKey = 'theme-mode';
const changeEvent = 'theme-mode-change';

function parseMode(value: unknown): ThemeMode {
    return value === 'light' || value === 'dark' ? value : 'system';
}

function readMode(): ThemeMode {
    try {
        return parseMode(localStorage.getItem(storageKey));
    } catch {
        return parseMode(document.documentElement.dataset.theme);
    }
}

function applyMode(mode: ThemeMode) {
    if (mode === 'system') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = mode;
}

function subscribe(onChange: () => void) {
    const onStorage = (event: StorageEvent) => {
        if (event.key !== storageKey && event.key !== null) return;
        applyMode(readMode());
        onChange();
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener(changeEvent, onChange);
    return () => {
        window.removeEventListener('storage', onStorage);
        window.removeEventListener(changeEvent, onChange);
    };
}

const serverMode = (): ThemeMode => 'system';

export function useThemeMode() {
    const mode = useSyncExternalStore(subscribe, readMode, serverMode);

    function setMode(nextMode: ThemeMode) {
        applyMode(nextMode);
        try {
            localStorage.setItem(storageKey, nextMode);
        } catch {
            // The selected mode still works when browser storage is unavailable.
        }
        window.dispatchEvent(new Event(changeEvent));
    }

    return { mode, setMode };
}

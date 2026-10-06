'use client';

import { useThemeMode } from '@app/hooks/use-theme-mode';
import { useId } from 'react';
import './theme-mode-select.scss';

const modes = [
    { value: 'system', label: 'System' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' }
] as const;

export function ThemeModeSelect() {
    const { mode, setMode } = useThemeMode();
    const id = useId();

    return (
        <div className="theme-mode-select">
            <span className="theme-mode-select__label" id={id}>
                Appearance
            </span>
            <div className="theme-mode-select__options" role="group" aria-labelledby={id}>
                {modes.map(({ value, label }) => (
                    <button
                        className="theme-mode-select__option"
                        key={value}
                        type="button"
                        aria-pressed={mode === value}
                        onClick={() => setMode(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}

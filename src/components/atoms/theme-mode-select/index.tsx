'use client';

import { useThemeMode, type ThemeMode } from '@app/hooks/use-theme-mode';
import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
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
            <ToggleGroup
                className="theme-mode-select__options"
                aria-labelledby={id}
                value={[mode]}
                // One mode is always active, so ignore attempts to unpress the current one.
                onValueChange={([next]) => next && setMode(next as ThemeMode)}
            >
                {modes.map(({ value, label }) => (
                    <Toggle className="theme-mode-select__option" key={value} value={value}>
                        {label}
                    </Toggle>
                ))}
            </ToggleGroup>
        </div>
    );
}

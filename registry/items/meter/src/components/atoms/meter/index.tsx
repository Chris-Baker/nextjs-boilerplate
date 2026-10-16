import { Meter as BaseMeter } from '@base-ui/react/meter';
import type { ReactNode } from 'react';
import './meter.scss';

export type MeterProps = {
    label: ReactNode;
    value: number;
    min?: number;
    max?: number;
    /** Formats the visible and announced value, e.g. `{ style: 'unit', unit: 'gigabyte' }`. */
    format?: Intl.NumberFormatOptions;
    /**
     * Whether the value is good or bad depends on what's measured: high storage use is a warning, a high
     * password strength is a success. Pick the tone in the caller, where that's known.
     */
    tone?: 'accent' | 'success' | 'warning' | 'danger';
    className?: string;
};

/** A measurement within a known range, like storage used or password strength. For tasks, use Progress. */
export function Meter({ label, value, min, max, format, tone = 'accent', className }: MeterProps) {
    return (
        <BaseMeter.Root
            className={['meter', `meter--${tone}`, className].filter(Boolean).join(' ')}
            value={value}
            min={min}
            max={max}
            format={format}
        >
            <BaseMeter.Label className="meter__label">{label}</BaseMeter.Label>
            <BaseMeter.Value className="meter__value" />
            <BaseMeter.Track className="meter__track">
                <BaseMeter.Indicator className="meter__indicator" />
            </BaseMeter.Track>
        </BaseMeter.Root>
    );
}

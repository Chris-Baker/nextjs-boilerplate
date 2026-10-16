import { Progress as BaseProgress } from '@base-ui/react/progress';
import type { ReactNode } from 'react';
import './progress.scss';

export type ProgressProps = {
    /** Name the task, not the widget: "Uploading invoices", not "Progress". */
    label: ReactNode;
    /** `null` when you can't measure progress yet. Switch to a number as soon as you can. */
    value: number | null;
    min?: number;
    max?: number;
    /** Formats the visible and announced value, e.g. `{ style: 'unit', unit: 'megabyte' }`. */
    format?: Intl.NumberFormatOptions;
    /** Hide the number when it isn't meaningful to the user, such as a short indeterminate wait. */
    showValue?: boolean;
    className?: string;
};

/** Progress of a task that's under way. For a static measurement like storage used, use Meter. */
export function Progress({ label, value, min, max, format, showValue = true, className }: ProgressProps) {
    return (
        <BaseProgress.Root
            className={['progress', className].filter(Boolean).join(' ')}
            value={value}
            min={min}
            max={max}
            format={format}
        >
            <BaseProgress.Label className="progress__label">{label}</BaseProgress.Label>
            {showValue && <BaseProgress.Value className="progress__value" />}
            <BaseProgress.Track className="progress__track">
                <BaseProgress.Indicator className="progress__indicator" />
            </BaseProgress.Track>
        </BaseProgress.Root>
    );
}

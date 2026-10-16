import type { ComponentPropsWithoutRef } from 'react';
import './visually-hidden.scss';

/** Text for assistive technology only, such as an icon button's name or extra context for a repeated link. */
export function VisuallyHidden({ className, ...props }: ComponentPropsWithoutRef<'span'>) {
    return <span className={['visually-hidden', className].filter(Boolean).join(' ')} {...props} />;
}

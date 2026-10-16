import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import './callout.scss';

export type CalloutProps = Omit<ComponentPropsWithoutRef<'div'>, 'title'> & {
    tone?: 'info' | 'success' | 'warning' | 'danger';
    title?: ReactNode;
    /**
     * Announce changes to screen readers. Use for messages that appear after an action; leave off for
     * content that is present on page load. Danger uses an assertive alert, other tones a polite status.
     */
    live?: boolean;
};

/** A message in context. Say what happened, why it matters and what to do next. */
export function Callout({ tone = 'info', title, live = false, className, children, ...props }: CalloutProps) {
    const role = live ? (tone === 'danger' ? 'alert' : 'status') : undefined;

    return (
        <div className={['callout', `callout--${tone}`, className].filter(Boolean).join(' ')} role={role} {...props}>
            {title && <p className="callout__title">{title}</p>}
            {children && <div className="callout__body">{children}</div>}
        </div>
    );
}

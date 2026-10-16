import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import './empty-state.scss';

export type EmptyStateProps = Omit<ComponentPropsWithoutRef<'section'>, 'title'> & {
    title: ReactNode;
    /** Why it's empty. A first visit, a filter with no matches and a failed load need different words. */
    children?: ReactNode;
    /** The next useful step, usually a single button or link. */
    action?: ReactNode;
    /** Optional illustration or icon. Decorative unless you give it its own accessible name. */
    visual?: ReactNode;
};

/** Often a new user's first impression of a screen, so make it specific to where they are. */
export function EmptyState({ title, children, action, visual, className, ...props }: EmptyStateProps) {
    return (
        <section className={['empty-state', className].filter(Boolean).join(' ')} {...props}>
            {visual && (
                <div className="empty-state__visual" aria-hidden="true">
                    {visual}
                </div>
            )}
            <h2 className="empty-state__title">{title}</h2>
            {children && <div className="empty-state__description">{children}</div>}
            {action && <div className="empty-state__action">{action}</div>}
        </section>
    );
}

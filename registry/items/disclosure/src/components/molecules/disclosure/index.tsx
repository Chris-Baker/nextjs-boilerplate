'use client';

import { Collapsible } from '@base-ui/react/collapsible';
import type { ReactNode } from 'react';
import './disclosure.scss';

export type DisclosureProps = Omit<Collapsible.Root.Props, 'className' | 'children'> & {
    summary: ReactNode;
    children: ReactNode;
    className?: string;
};

/**
 * One section that shows and hides, with an animated height. Closed content stays findable with the
 * browser's find-in-page. For several related sections, use the accordion item.
 */
export function Disclosure({ summary, children, className, ...props }: DisclosureProps) {
    return (
        <Collapsible.Root {...props} className={['disclosure', className].filter(Boolean).join(' ')}>
            <Collapsible.Trigger className="disclosure__summary">{summary}</Collapsible.Trigger>
            <Collapsible.Panel className="disclosure__panel" hiddenUntilFound>
                <div className="disclosure__content">{children}</div>
            </Collapsible.Panel>
        </Collapsible.Root>
    );
}

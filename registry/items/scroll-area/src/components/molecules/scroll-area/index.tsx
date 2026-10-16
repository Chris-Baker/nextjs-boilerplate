import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import type { CSSProperties, ReactNode } from 'react';
import './scroll-area.scss';

export type ScrollAreaProps = {
    children: ReactNode;
    /** Names the scrollable region. Keyboard users can focus it to scroll, so it needs a name. */
    label: string;
    /** Any CSS length, e.g. `20rem` or `50dvh`. Without it, size the root with your own class. */
    maxHeight?: string;
    orientation?: 'vertical' | 'horizontal' | 'both';
    className?: string;
};

/**
 * A scroll container with a slim, themed scrollbar. Edges fade where more content is hidden, so people can
 * tell there's more without hunting for the scrollbar. Prefer page scroll; nest scrolling only when needed.
 */
export function ScrollArea({ children, label, maxHeight, orientation = 'vertical', className }: ScrollAreaProps) {
    const style = maxHeight ? ({ '--scroll-area-max-height': maxHeight } as CSSProperties) : undefined;
    const vertical = orientation !== 'horizontal';
    const horizontal = orientation !== 'vertical';

    return (
        <BaseScrollArea.Root className={['scroll-area', className].filter(Boolean).join(' ')} style={style}>
            <BaseScrollArea.Viewport className="scroll-area__viewport" role="region" aria-label={label}>
                <BaseScrollArea.Content className="scroll-area__content">{children}</BaseScrollArea.Content>
            </BaseScrollArea.Viewport>
            {vertical && (
                <BaseScrollArea.Scrollbar className="scroll-area__scrollbar" orientation="vertical">
                    <BaseScrollArea.Thumb className="scroll-area__thumb" />
                </BaseScrollArea.Scrollbar>
            )}
            {horizontal && (
                <BaseScrollArea.Scrollbar className="scroll-area__scrollbar" orientation="horizontal">
                    <BaseScrollArea.Thumb className="scroll-area__thumb" />
                </BaseScrollArea.Scrollbar>
            )}
            {vertical && horizontal && <BaseScrollArea.Corner className="scroll-area__corner" />}
        </BaseScrollArea.Root>
    );
}

'use client';

import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import type { ReactElement, ReactNode } from 'react';
import './tooltip.scss';

export type TooltipProps = Pick<BaseTooltip.Root.Props, 'open' | 'defaultOpen' | 'onOpenChange' | 'disabled'> & {
    /** Short visual label. Keep it to a few words that match the trigger's `aria-label`. */
    content: ReactNode;
    /** A single element that accepts a ref and props, such as <Button aria-label="Copy link">. */
    children: ReactElement;
    side?: BaseTooltip.Positioner.Props['side'];
    align?: BaseTooltip.Positioner.Props['align'];
    /** Hover delay in milliseconds. Leave unset to use the TooltipProvider's. */
    delay?: number;
    /** Applied to the popup. */
    className?: string;
};

/**
 * A visual label for sighted mouse and keyboard users, mostly for icon-only buttons. It never shows on touch
 * and isn't announced on its own, so the trigger still needs an `aria-label`. For content people need to
 * read, use a popover with `openOnHover` instead.
 */
export function Tooltip({
    content,
    children,
    side = 'top',
    align = 'center',
    delay,
    className,
    ...rootProps
}: TooltipProps) {
    return (
        <BaseTooltip.Root {...rootProps}>
            <BaseTooltip.Trigger render={children} delay={delay} />
            <BaseTooltip.Portal>
                <BaseTooltip.Positioner className="tooltip__positioner" side={side} align={align} sideOffset={6}>
                    <BaseTooltip.Popup className={['tooltip', className].filter(Boolean).join(' ')}>
                        {content}
                    </BaseTooltip.Popup>
                </BaseTooltip.Positioner>
            </BaseTooltip.Portal>
        </BaseTooltip.Root>
    );
}

export type TooltipProviderProps = BaseTooltip.Provider.Props;

/**
 * Wrap a toolbar, or the whole app in the root layout, so that once one tooltip is showing its neighbours
 * open instantly as the pointer moves along.
 */
export function TooltipProvider({ delay = 500, ...props }: TooltipProviderProps) {
    return <BaseTooltip.Provider delay={delay} {...props} />;
}

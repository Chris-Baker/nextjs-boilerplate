'use client';

import { Button, type ButtonProps } from '@app/components/atoms/button';
import { Popover as BasePopover } from '@base-ui/react/popover';
import type { ReactNode } from 'react';
import './popover.scss';

export type PopoverProps = Pick<BasePopover.Root.Props, 'open' | 'defaultOpen' | 'onOpenChange' | 'modal'> & {
    trigger: ReactNode;
    triggerVariant?: ButtonProps['variant'];
    /** Required when the trigger is icon-only, such as an info icon. */
    triggerLabel?: string;
    /** Also open on hover. Use for infotips; unlike a tooltip it still works with touch and screen readers. */
    openOnHover?: boolean;
    title?: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
    side?: BasePopover.Positioner.Props['side'];
    align?: BasePopover.Positioner.Props['align'];
    /** Show a close button. Escape and clicking outside always close it. */
    closeLabel?: string;
    /** Applied to the popup. */
    className?: string;
};

/**
 * Non-modal content anchored to a trigger: details, small forms, infotips. If the user must decide before
 * continuing, use a dialog instead.
 */
export function Popover({
    trigger,
    triggerVariant,
    triggerLabel,
    openOnHover = false,
    title,
    description,
    children,
    side = 'bottom',
    align = 'center',
    closeLabel,
    className,
    ...rootProps
}: PopoverProps) {
    return (
        <BasePopover.Root {...rootProps}>
            <BasePopover.Trigger
                render={<Button variant={triggerVariant} />}
                aria-label={triggerLabel}
                openOnHover={openOnHover}
            >
                {trigger}
            </BasePopover.Trigger>
            <BasePopover.Portal>
                <BasePopover.Positioner className="popover__positioner" side={side} align={align} sideOffset={8}>
                    <BasePopover.Popup className={['popover', className].filter(Boolean).join(' ')}>
                        {(title || closeLabel) && (
                            <div className="popover__header">
                                {title && <BasePopover.Title className="popover__title">{title}</BasePopover.Title>}
                                {closeLabel && (
                                    <BasePopover.Close render={<Button variant="ghost" size="small" />}>
                                        {closeLabel}
                                    </BasePopover.Close>
                                )}
                            </div>
                        )}
                        {description && (
                            <BasePopover.Description className="popover__description">
                                {description}
                            </BasePopover.Description>
                        )}
                        {children && <div className="popover__body">{children}</div>}
                    </BasePopover.Popup>
                </BasePopover.Positioner>
            </BasePopover.Portal>
        </BasePopover.Root>
    );
}

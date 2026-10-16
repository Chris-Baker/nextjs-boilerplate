'use client';

import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import type { ReactNode } from 'react';
import '@app/components/molecules/menu/menu.scss';
import './context-menu.scss';

export type ContextMenuProps = Pick<
    BaseContextMenu.Root.Props,
    'open' | 'defaultOpen' | 'onOpenChange' | 'disabled'
> & {
    /** The area that opens the menu on right-click or long press. */
    area: ReactNode;
    /** Menu content. Use the parts from the menu item: MenuItem, MenuSeparator, MenuGroup and so on. */
    children: ReactNode;
    /** Applied to the trigger area. */
    className?: string;
};

/**
 * Right-click and long-press actions for an area. Treat it as a shortcut: every action here must also be
 * reachable from visible controls, because touch, keyboard and screen reader users may never open it.
 */
export function ContextMenu({ area, children, className, ...rootProps }: ContextMenuProps) {
    return (
        <BaseContextMenu.Root {...rootProps}>
            <BaseContextMenu.Trigger className={['context-menu', className].filter(Boolean).join(' ')}>
                {area}
            </BaseContextMenu.Trigger>
            <BaseContextMenu.Portal>
                <BaseContextMenu.Positioner className="menu__positioner">
                    <BaseContextMenu.Popup className="menu">{children}</BaseContextMenu.Popup>
                </BaseContextMenu.Positioner>
            </BaseContextMenu.Portal>
        </BaseContextMenu.Root>
    );
}

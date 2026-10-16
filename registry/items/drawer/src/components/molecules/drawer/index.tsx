'use client';

import { Button, type ButtonProps } from '@app/components/atoms/button';
import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import type { ReactNode } from 'react';
import './drawer.scss';

const swipeDirection = { right: 'right', left: 'left', bottom: 'down' } as const;

export type DrawerProps = {
    /** Label for the button that opens the drawer. */
    trigger: ReactNode;
    triggerVariant?: ButtonProps['variant'];
    /** Edge it slides from. Bottom suits short, thumb-reachable choices on phones; sides suit longer tasks. */
    side?: keyof typeof swipeDirection;
    title: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
    /** Footer actions. Wrap a button in `<DrawerClose>` to close the drawer when it's pressed. */
    actions?: ReactNode;
    closeLabel?: string;
    /** Control the open state, for example to close after a form inside it saves. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
};

/**
 * A panel from the edge of the screen that keeps the page's context, dismissed by swiping, Escape or the
 * backdrop. If you don't need swipe gestures, a dialog is simpler.
 */
export function Drawer({
    trigger,
    triggerVariant,
    side = 'right',
    title,
    description,
    children,
    actions,
    closeLabel = 'Close',
    open,
    onOpenChange,
    className
}: DrawerProps) {
    return (
        <BaseDrawer.Root swipeDirection={swipeDirection[side]} open={open} onOpenChange={onOpenChange}>
            <BaseDrawer.Trigger render={<Button variant={triggerVariant} />}>{trigger}</BaseDrawer.Trigger>
            <BaseDrawer.Portal>
                <BaseDrawer.Backdrop className="drawer__backdrop" />
                <BaseDrawer.Viewport className={`drawer__viewport drawer__viewport--${side}`}>
                    <BaseDrawer.Popup className={['drawer', `drawer--${side}`, className].filter(Boolean).join(' ')}>
                        {side === 'bottom' && <div className="drawer__handle" aria-hidden="true" />}
                        <BaseDrawer.Content className="drawer__content">
                            <header className="drawer__header">
                                <BaseDrawer.Title className="drawer__title">{title}</BaseDrawer.Title>
                                <BaseDrawer.Close render={<Button variant="ghost" size="small" />}>
                                    {closeLabel}
                                </BaseDrawer.Close>
                            </header>
                            {description && (
                                <BaseDrawer.Description className="drawer__description">
                                    {description}
                                </BaseDrawer.Description>
                            )}
                            {children && <div className="drawer__body">{children}</div>}
                            {actions && <div className="drawer__actions">{actions}</div>}
                        </BaseDrawer.Content>
                    </BaseDrawer.Popup>
                </BaseDrawer.Viewport>
            </BaseDrawer.Portal>
        </BaseDrawer.Root>
    );
}

/** Closes the surrounding drawer. Pass the button to render: `<DrawerClose render={<Button />}>Done</DrawerClose>`. */
export const DrawerClose = BaseDrawer.Close;

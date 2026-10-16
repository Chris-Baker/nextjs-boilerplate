'use client';

import { Button, type ButtonProps } from '@app/components/atoms/button';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { ReactNode } from 'react';
import './dialog.scss';

/** Closes the dialog. Render it as a button: <DialogClose render={<Button />}>Cancel</DialogClose> */
export const DialogClose = BaseDialog.Close;

export type DialogProps = {
    /** Label for the button that opens the dialog. */
    trigger: ReactNode;
    triggerVariant?: ButtonProps['variant'];
    title: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
    /** Footer actions. Use `DialogClose` for buttons that should close it. */
    actions?: ReactNode;
    closeLabel?: string;
    /** Control it yourself, for example to close after a save succeeds. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
};

/**
 * Modal on Base UI: focus trap, Escape, outside click, scroll lock, focus return and enter and exit
 * transitions behave the same in every browser.
 */
export function Dialog({
    trigger,
    triggerVariant,
    title,
    description,
    children,
    actions,
    closeLabel = 'Close',
    open,
    onOpenChange,
    className
}: DialogProps) {
    return (
        <BaseDialog.Root open={open} onOpenChange={onOpenChange ? (nextOpen) => onOpenChange(nextOpen) : undefined}>
            <BaseDialog.Trigger render={<Button variant={triggerVariant} />}>{trigger}</BaseDialog.Trigger>
            <BaseDialog.Portal>
                <BaseDialog.Backdrop className="dialog__backdrop" />
                <BaseDialog.Popup className={['dialog', className].filter(Boolean).join(' ')}>
                    <header className="dialog__header">
                        <BaseDialog.Title className="dialog__title">{title}</BaseDialog.Title>
                        <BaseDialog.Close render={<Button variant="ghost" size="small" />}>
                            {closeLabel}
                        </BaseDialog.Close>
                    </header>
                    {description && (
                        <BaseDialog.Description className="dialog__description">{description}</BaseDialog.Description>
                    )}
                    {children && <div className="dialog__body">{children}</div>}
                    {actions && <div className="dialog__actions">{actions}</div>}
                </BaseDialog.Popup>
            </BaseDialog.Portal>
        </BaseDialog.Root>
    );
}

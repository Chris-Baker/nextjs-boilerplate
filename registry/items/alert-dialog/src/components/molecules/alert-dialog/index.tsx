'use client';

import { Button, type ButtonProps } from '@app/components/atoms/button';
import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import { useRef, useState, type ReactNode } from 'react';
import './alert-dialog.scss';

export type AlertDialogProps = {
    /** Label for the button that opens the dialog. */
    trigger: ReactNode;
    triggerVariant?: ButtonProps['variant'];
    /** Ask the question the user is answering: "Delete 'Q3 report'?", not "Are you sure?". */
    title: ReactNode;
    /** Say what happens and whether it can be undone. */
    description: ReactNode;
    /** Name the action, such as "Delete report". Avoid "OK" and "Yes". */
    confirmLabel: ReactNode;
    cancelLabel?: ReactNode;
    tone?: 'danger' | 'primary';
    /**
     * Runs on confirm. Return a promise to keep the dialog open with a pending state; if it rejects, the
     * error message is shown in the dialog so the user can retry or cancel.
     */
    onConfirm: () => void | Promise<void>;
    className?: string;
};

/**
 * Confirmation for consequential actions. It can't be dismissed by clicking outside, and focus starts on
 * Cancel so a stray Enter doesn't destroy anything. For reversible actions, prefer acting immediately
 * with an undo toast.
 */
export function AlertDialog({
    trigger,
    triggerVariant = 'danger',
    title,
    description,
    confirmLabel,
    cancelLabel = 'Cancel',
    tone = 'danger',
    onConfirm,
    className
}: AlertDialogProps) {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string>();
    const cancel = useRef<HTMLButtonElement>(null);

    function onOpenChange(nextOpen: boolean) {
        if (pending) return;
        setOpen(nextOpen);
        if (nextOpen) setError(undefined);
    }

    async function confirm() {
        if (pending) return;
        setPending(true);
        setError(undefined);
        try {
            await onConfirm();
            setOpen(false);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : 'Something went wrong. Try again.');
        } finally {
            setPending(false);
        }
    }

    return (
        <BaseAlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <BaseAlertDialog.Trigger render={<Button variant={triggerVariant} />}>{trigger}</BaseAlertDialog.Trigger>
            <BaseAlertDialog.Portal>
                <BaseAlertDialog.Backdrop className="alert-dialog__backdrop" />
                <BaseAlertDialog.Popup
                    className={['alert-dialog', className].filter(Boolean).join(' ')}
                    initialFocus={cancel}
                >
                    <BaseAlertDialog.Title className="alert-dialog__title">{title}</BaseAlertDialog.Title>
                    <BaseAlertDialog.Description className="alert-dialog__description">
                        {description}
                    </BaseAlertDialog.Description>
                    {error && (
                        <p className="alert-dialog__error" role="alert">
                            {error}
                        </p>
                    )}
                    <div className="alert-dialog__actions">
                        <BaseAlertDialog.Close ref={cancel} render={<Button />} aria-disabled={pending || undefined}>
                            {cancelLabel}
                        </BaseAlertDialog.Close>
                        <Button variant={tone} pending={pending} onClick={confirm}>
                            {confirmLabel}
                        </Button>
                    </div>
                </BaseAlertDialog.Popup>
            </BaseAlertDialog.Portal>
        </BaseAlertDialog.Root>
    );
}

'use client';

import { Toast } from '@base-ui/react/toast';
import type { ReactNode } from 'react';
import './toast.scss';

/**
 * Pass as `type` when adding a toast to pick its tone. `toast.promise()` sets `loading`, `success` and
 * `error` itself.
 */
export type ToastTone = 'info' | 'success' | 'warning' | 'danger' | 'error' | 'loading';

export type ToastProviderProps = {
    children: ReactNode;
    /** Toasts visible at once; older ones stay mounted but hidden. */
    limit?: number;
    /** Default auto-dismiss in ms. Use 0 on individual toasts the user must act on. */
    timeout?: number;
    className?: string;
};

/**
 * Mount once, around the children of `.app-root` in src/app/layout.tsx, so any client component can call
 * `useToast()`. Toasts render in a landmark region users can reach with F6.
 */
export function ToastProvider({ children, limit, timeout, className }: ToastProviderProps) {
    return (
        <Toast.Provider limit={limit} timeout={timeout}>
            {children}
            <Toast.Portal>
                <Toast.Viewport className={['toast', className].filter(Boolean).join(' ')}>
                    <ToastList />
                </Toast.Viewport>
            </Toast.Portal>
        </Toast.Provider>
    );
}

/**
 * Returns `add`, `update`, `close` and `promise`. Say what happened in the title and what it means in the
 * description. Add `actionProps: { children: 'Undo', onClick }` instead of asking for confirmation up front.
 */
export function useToast() {
    return Toast.useToastManager();
}

function ToastList() {
    const { toasts } = Toast.useToastManager();

    return toasts.map((toast) => (
        <Toast.Root key={toast.id} toast={toast} className="toast__item">
            <Toast.Content className="toast__content">
                {toast.type === 'loading' && <span className="toast__spinner" aria-hidden="true" />}
                <div className="toast__text">
                    <Toast.Title className="toast__title" />
                    <Toast.Description className="toast__description" />
                </div>
                <Toast.Action className="toast__action" />
                <Toast.Close className="toast__close" aria-label="Dismiss notification">
                    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </Toast.Close>
            </Toast.Content>
        </Toast.Root>
    ));
}

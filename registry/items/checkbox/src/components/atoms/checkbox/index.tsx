'use client';

import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { Field } from '@base-ui/react/field';
import type { ReactNode } from 'react';
import './checkbox.scss';

export type CheckboxControlProps = Omit<BaseCheckbox.Root.Props, 'className' | 'children'>;

/**
 * The box alone, without a label. Use it inside your own label or Field.Item, as checkbox-group does.
 * Shows a dash when `indeterminate`, for "some of these are selected".
 */
export function CheckboxControl(props: CheckboxControlProps) {
    return (
        <BaseCheckbox.Root className="checkbox__box" {...props}>
            <BaseCheckbox.Indicator className="checkbox__indicator">
                <svg className="checkbox__check" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3.5 8.5l3 3 6-7" />
                </svg>
                <svg className="checkbox__dash" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M4 8h8" />
                </svg>
            </BaseCheckbox.Indicator>
        </BaseCheckbox.Root>
    );
}

export type CheckboxProps = CheckboxControlProps & {
    /** The label. Say what ticking it does: "Email me when someone replies", not "Notifications". */
    children: ReactNode;
    hint?: ReactNode;
    /** Say what's wrong and how to fix it. Marks the checkbox invalid. */
    error?: ReactNode;
    className?: string;
};

/**
 * A labelled checkbox that submits with native forms: a ticked box sends `value` (or "on") under `name`.
 * Use for consent and independent yes/no choices; use the switch atom for settings that apply instantly.
 */
export function Checkbox({ children, hint, error, name, disabled, className, ...props }: CheckboxProps) {
    return (
        <Field.Root
            className={['checkbox', className].filter(Boolean).join(' ')}
            name={name}
            disabled={disabled}
            invalid={error ? true : undefined}
        >
            <Field.Label className="checkbox__label">
                <CheckboxControl {...props} />
                <span className="checkbox__text">{children}</span>
            </Field.Label>
            {hint && <Field.Description className="checkbox__hint">{hint}</Field.Description>}
            {error && (
                <Field.Error className="checkbox__error" match>
                    {error}
                </Field.Error>
            )}
        </Field.Root>
    );
}

'use client';

import { Field } from '@base-ui/react/field';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import type { ReactNode } from 'react';
import './number-field.scss';

export type NumberFieldProps = Omit<BaseNumberField.Root.Props, 'className' | 'children' | 'render'> & {
    label: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    className?: string;
};

/**
 * An exact number with steppers, arrow keys (Shift for `largeStep`, Alt for `smallStep`) and dragging the
 * label to scrub. Pass `format` for currency, percent or units so the value reads the way people say it.
 * Not for numbers that aren't quantities, such as phone or card numbers: use a text input for those.
 */
export function NumberField({ label, hint, error, name, disabled, className, ...props }: NumberFieldProps) {
    return (
        <Field.Root
            className={['number-field', className].filter(Boolean).join(' ')}
            name={name}
            disabled={disabled}
            invalid={error ? true : undefined}
        >
            <BaseNumberField.Root className="number-field__root" {...props}>
                <BaseNumberField.ScrubArea className="number-field__scrub-area">
                    <Field.Label className="number-field__label">{label}</Field.Label>
                </BaseNumberField.ScrubArea>
                {hint && <Field.Description className="number-field__hint">{hint}</Field.Description>}
                <BaseNumberField.Group className="number-field__group">
                    <BaseNumberField.Decrement className="number-field__step">
                        <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M3 8h10" />
                        </svg>
                    </BaseNumberField.Decrement>
                    <BaseNumberField.Input className="number-field__input" />
                    <BaseNumberField.Increment className="number-field__step">
                        <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M3 8h10M8 3v10" />
                        </svg>
                    </BaseNumberField.Increment>
                </BaseNumberField.Group>
                {error && (
                    <Field.Error className="number-field__error" match>
                        {error}
                    </Field.Error>
                )}
            </BaseNumberField.Root>
        </Field.Root>
    );
}

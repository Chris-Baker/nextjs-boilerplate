import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import { Fragment, useId, type ReactNode } from 'react';
import './otp-field.scss';

export type OtpFieldProps = {
    label: ReactNode;
    /** Submitted with the form as one value. */
    name: string;
    length?: number;
    /** Say where the code was sent, so the user knows where to look. */
    hint?: ReactNode;
    /** Say what went wrong and what to do: "That code has expired. We've sent a new one." */
    error?: ReactNode;
    /** Show a separator every N slots, matching how the code is printed in the message (e.g. 3 for 123 456). */
    groupSize?: number;
    validationType?: BaseOTPField.Root.ValidationType;
    /** Submit the form as soon as the last character is entered. */
    autoSubmit?: boolean;
    onValueComplete?: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    className?: string;
};

/**
 * One-time code entry. Paste fills every slot, and `autocomplete="one-time-code"` lets phones offer the code
 * from the message.
 */
export function OtpField({
    label,
    name,
    length = 6,
    hint,
    error,
    groupSize,
    validationType,
    autoSubmit,
    onValueComplete,
    required,
    disabled,
    id: idProp,
    className
}: OtpFieldProps) {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

    return (
        <div className={['otp-field', error && 'otp-field--invalid', className].filter(Boolean).join(' ')}>
            <label className="otp-field__label" htmlFor={id}>
                {label}
            </label>
            {hint && (
                <p className="otp-field__hint" id={hintId}>
                    {hint}
                </p>
            )}
            <BaseOTPField.Root
                className="otp-field__slots"
                id={id}
                name={name}
                length={length}
                validationType={validationType}
                autoSubmit={autoSubmit}
                onValueComplete={onValueComplete ? (value) => onValueComplete(value) : undefined}
                required={required}
                disabled={disabled}
                aria-describedby={describedBy}
            >
                {Array.from({ length }, (_, index) => (
                    <Fragment key={index}>
                        {groupSize && index > 0 && index % groupSize === 0 && (
                            <BaseOTPField.Separator className="otp-field__separator" />
                        )}
                        <BaseOTPField.Input
                            className="otp-field__input"
                            aria-invalid={error ? true : undefined}
                            aria-label={index === 0 ? undefined : `Character ${index + 1} of ${length}`}
                        />
                    </Fragment>
                ))}
            </BaseOTPField.Root>
            {error && (
                <p className="otp-field__error" id={errorId}>
                    {error}
                </p>
            )}
        </div>
    );
}

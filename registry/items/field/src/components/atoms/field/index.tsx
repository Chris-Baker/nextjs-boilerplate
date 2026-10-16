'use client';

import { Field as BaseField } from '@base-ui/react/field';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import './field.scss';

type ValidityKey = Exclude<keyof ValidityState, 'valid' | 'customError'>;

/** The custom message for the first failed constraint, if any. */
function customMessage(state: BaseField.Validity.State, messages: FieldProps['messages']) {
    const failed = (Object.keys(messages ?? {}) as ValidityKey[]).find((key) => state.validity[key]);
    return failed ? messages?.[failed] : undefined;
}

export type FieldProps = Omit<BaseField.Root.Props, 'className' | 'children'> & {
    label: ReactNode;
    /** Guidance shown before the user makes a mistake. Prefer this to an error they have to discover. */
    hint?: ReactNode;
    /**
     * Your words for native validation failures, replacing the browser's generic text. Keys are
     * ValidityState flags: { valueMissing: 'Enter your email', typeMismatch: 'Use an address like name@example.com' }.
     */
    messages?: Partial<Record<ValidityKey, ReactNode>>;
    /**
     * An error you manage yourself. While it's set the field is invalid and a Base UI Form won't submit,
     * so clear it when the value changes. For server errors, pass `errors` to the Form instead: the field
     * shows its error by `name` and clears it as soon as the user edits.
     */
    error?: ReactNode;
    optional?: boolean;
    className?: string;
    /** The control, usually `<Input />` or `<Textarea />`. Defaults to `<Input />`. */
    children?: ReactNode;
};

/**
 * Label, hint, control and error wired together by Base UI, so they're announced together and the
 * field reflects validity as `data-invalid`, `data-touched` and `data-dirty`. Put `name` here:
 * <Field label="Email" name="email"><Input type="email" autoComplete="email" /></Field>
 *
 * Controls with their own label prop (select, combobox, checkbox, slider and so on) wrap a Field
 * themselves, so don't nest them in this one.
 */
export function Field({
    label,
    hint,
    messages,
    error,
    optional = false,
    className,
    children,
    invalid,
    ...props
}: FieldProps) {
    return (
        <BaseField.Root
            {...props}
            className={['field', className].filter(Boolean).join(' ')}
            invalid={error ? true : invalid}
        >
            <BaseField.Label className="field__label">
                {label}
                {optional && <span className="field__optional"> (optional)</span>}
            </BaseField.Label>
            {hint && <BaseField.Description className="field__hint">{hint}</BaseField.Description>}
            {children ?? <Input />}
            {error ? (
                <BaseField.Error className="field__error" match>
                    {error}
                </BaseField.Error>
            ) : (
                // Base UI supplies the native or Form server message; swap in ours when a constraint matches.
                <BaseField.Validity>
                    {(state) => {
                        const custom = customMessage(state, messages);
                        // Omit children entirely when there's no match: even `undefined` would hide Base UI's message.
                        return custom === undefined ? (
                            <BaseField.Error className="field__error" />
                        ) : (
                            <BaseField.Error className="field__error">{custom}</BaseField.Error>
                        );
                    }}
                </BaseField.Validity>
            )}
        </BaseField.Root>
    );
}

export type InputProps = Omit<BaseField.Control.Props, 'className'> & { className?: string };

/** A text input registered with the surrounding Field. Use the native `type` and `autoComplete`. */
export function Input({ className, ...props }: InputProps) {
    return <BaseField.Control {...props} className={['field__control', className].filter(Boolean).join(' ')} />;
}

export type TextareaProps = Omit<BaseField.Control.Props, 'className' | 'render'> &
    Pick<ComponentPropsWithRef<'textarea'>, 'rows'> & { className?: string };

/** A multi-line control registered with the surrounding Field. */
export function Textarea({ className, rows = 4, ...props }: TextareaProps) {
    return (
        <BaseField.Control
            {...props}
            render={<textarea rows={rows} />}
            className={['field__control', 'field__control--multiline', className].filter(Boolean).join(' ')}
        />
    );
}

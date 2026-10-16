'use client';

import { Field } from '@base-ui/react/field';
import { Select as BaseSelect } from '@base-ui/react/select';
import type { ReactNode } from 'react';
import './select.scss';

export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

export type SelectProps = {
    options: SelectOption[];
    label: ReactNode;
    /** Guidance shown before the user chooses. */
    hint?: ReactNode;
    /** Say what's wrong and how to fix it. Inside a Base UI `Form` with `errors`, leave it out. */
    error?: ReactNode;
    /** Shown until a value is chosen. Say what to choose, not "Select…". */
    placeholder?: string;
    name?: string;
    defaultValue?: string;
    value?: string | null;
    onValueChange?: (value: string | null) => void;
    required?: boolean;
    disabled?: boolean;
    className?: string;
};

/**
 * A short list of fixed choices. The popup lines the selected option up with the trigger, as native
 * selects do. Prefer `combobox` once people would rather type than scroll (roughly 10+ options).
 * Wraps its own Base UI Field, so `name`, `hint`, `error` and Form `errors` work like the field atom.
 */
export function Select({
    options,
    label,
    hint,
    error,
    placeholder,
    name,
    defaultValue,
    value,
    onValueChange,
    required,
    disabled,
    className
}: SelectProps) {
    return (
        <Field.Root
            className={['select', className].filter(Boolean).join(' ')}
            name={name}
            disabled={disabled}
            invalid={error ? true : undefined}
        >
            <BaseSelect.Root<string>
                items={options}
                defaultValue={defaultValue}
                value={value}
                onValueChange={onValueChange}
                required={required}
            >
                <BaseSelect.Label className="select__label">{label}</BaseSelect.Label>
                {hint && <Field.Description className="select__hint">{hint}</Field.Description>}
                <div className="select__control">
                    <BaseSelect.Trigger className="select__trigger">
                        <BaseSelect.Value className="select__value" placeholder={placeholder} />
                        <BaseSelect.Icon className="select__icon">
                            <span className="select__chevron" />
                        </BaseSelect.Icon>
                    </BaseSelect.Trigger>
                </div>
                <BaseSelect.Portal>
                    <BaseSelect.Positioner className="select__positioner" sideOffset={4}>
                        <BaseSelect.Popup className="select__popup">
                            <BaseSelect.ScrollUpArrow className="select__scroll select__scroll--up" />
                            <BaseSelect.List className="select__list">
                                {options.map((option) => (
                                    <BaseSelect.Item
                                        className="select__item"
                                        key={option.value}
                                        value={option.value}
                                        disabled={option.disabled}
                                    >
                                        <BaseSelect.ItemIndicator className="select__indicator">
                                            {/* Empty children replace Base UI's default emoji tick; the SCSS draws the mark. */}
                                            {''}
                                        </BaseSelect.ItemIndicator>
                                        <BaseSelect.ItemText className="select__item-text">
                                            {option.label}
                                        </BaseSelect.ItemText>
                                    </BaseSelect.Item>
                                ))}
                            </BaseSelect.List>
                            <BaseSelect.ScrollDownArrow className="select__scroll select__scroll--down" />
                        </BaseSelect.Popup>
                    </BaseSelect.Positioner>
                </BaseSelect.Portal>
            </BaseSelect.Root>
            {error ? (
                <Field.Error className="select__error" match>
                    {error}
                </Field.Error>
            ) : (
                <Field.Error className="select__error" />
            )}
        </Field.Root>
    );
}

'use client';

import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { Field } from '@base-ui/react/field';
import type { ReactNode } from 'react';
import './combobox.scss';

export type ComboboxOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

export type ComboboxProps = {
    options: ComboboxOption[];
    label: ReactNode;
    /** Guidance shown before the user types. */
    hint?: ReactNode;
    /** Say what's wrong and how to fix it. Inside a Base UI `Form` with `errors`, leave it out. */
    error?: ReactNode;
    placeholder?: string;
    /** Submitted with the form as the chosen option's `value`. */
    name?: string;
    defaultValue?: string;
    value?: string | null;
    onValueChange?: (value: string | null) => void;
    /** Shown when nothing matches. Suggest what to try, or offer a way to add the missing thing. */
    emptyMessage?: ReactNode;
    required?: boolean;
    disabled?: boolean;
    className?: string;
};

/**
 * Type to filter a long list of fixed choices. Free text isn't accepted; for search suggestions use
 * Base UI's Autocomplete instead.
 *
 * Wraps its own Base UI Field, so `name`, `hint`, `error` and Form `errors` work like the field atom.
 */
export function Combobox({
    options,
    label,
    hint,
    error,
    placeholder,
    name,
    defaultValue,
    value,
    onValueChange,
    emptyMessage = 'No matches. Check the spelling or try a shorter search.',
    required,
    disabled,
    className
}: ComboboxProps) {
    const find = (key: string | null | undefined) => options.find((option) => option.value === key) ?? null;

    return (
        <Field.Root
            className={['combobox', className].filter(Boolean).join(' ')}
            name={name}
            disabled={disabled}
            invalid={error ? true : undefined}
        >
            <BaseCombobox.Root
                items={options}
                defaultValue={defaultValue === undefined ? undefined : find(defaultValue)}
                value={value === undefined ? undefined : find(value)}
                onValueChange={(option) => onValueChange?.(option?.value ?? null)}
                isItemEqualToValue={(item, selected) => item.value === selected.value}
                required={required}
            >
                <Field.Label className="combobox__label">{label}</Field.Label>
                {hint && <Field.Description className="combobox__hint">{hint}</Field.Description>}
                <BaseCombobox.InputGroup className="combobox__group">
                    <BaseCombobox.Input className="combobox__input" placeholder={placeholder} />
                    <div className="combobox__actions">
                        <BaseCombobox.Clear className="combobox__clear" aria-label="Clear selection">
                            <span className="combobox__clear-icon" aria-hidden="true" />
                        </BaseCombobox.Clear>
                        <BaseCombobox.Trigger className="combobox__trigger" aria-label="Show options" />
                    </div>
                </BaseCombobox.InputGroup>
                <BaseCombobox.Portal>
                    <BaseCombobox.Positioner className="combobox__positioner" sideOffset={4}>
                        <BaseCombobox.Popup className="combobox__popup">
                            <BaseCombobox.Empty className="combobox__empty">{emptyMessage}</BaseCombobox.Empty>
                            <BaseCombobox.List className="combobox__list">
                                {(option: ComboboxOption) => (
                                    <BaseCombobox.Item
                                        className="combobox__item"
                                        key={option.value}
                                        value={option}
                                        disabled={option.disabled}
                                    >
                                        <BaseCombobox.ItemIndicator className="combobox__indicator">
                                            {/* Empty children replace Base UI's default emoji tick; the SCSS draws the mark. */}
                                            {''}
                                        </BaseCombobox.ItemIndicator>
                                        <span className="combobox__item-text">{option.label}</span>
                                    </BaseCombobox.Item>
                                )}
                            </BaseCombobox.List>
                        </BaseCombobox.Popup>
                    </BaseCombobox.Positioner>
                </BaseCombobox.Portal>
            </BaseCombobox.Root>
            {error ? (
                <Field.Error className="combobox__error" match>
                    {error}
                </Field.Error>
            ) : (
                <Field.Error className="combobox__error" />
            )}
        </Field.Root>
    );
}

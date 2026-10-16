'use client';

import { CheckboxControl } from '@app/components/atoms/checkbox';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import { Field } from '@base-ui/react/field';
import { Fieldset } from '@base-ui/react/fieldset';
import { useState, type ReactNode } from 'react';
import './checkbox-group.scss';

export type CheckboxGroupOption = {
    value: string;
    label: ReactNode;
    /** Extra context for this option, announced with it. */
    hint?: ReactNode;
    disabled?: boolean;
};

export type CheckboxGroupProps = {
    /** The question the options answer, rendered as the fieldset legend. */
    legend: ReactNode;
    options: CheckboxGroupOption[];
    /** Submitted once per ticked option, so read it with `formData.getAll(name)`. */
    name?: string;
    defaultValue?: string[];
    value?: string[];
    onValueChange?: (value: string[]) => void;
    /** Adds a parent checkbox that ticks every option and shows a dash when only some are ticked. */
    selectAllLabel?: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    disabled?: boolean;
    className?: string;
};

/** Several independent choices that answer one question. Use a radio group when only one can apply. */
export function CheckboxGroup({
    legend,
    options,
    name,
    defaultValue = [],
    value: valueProp,
    onValueChange,
    selectAllLabel,
    hint,
    error,
    disabled,
    className
}: CheckboxGroupProps) {
    // The parent checkbox needs a controlled group, so state lives here unless the caller controls it.
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const value = valueProp ?? uncontrolled;

    function change(next: string[]) {
        setUncontrolled(next);
        onValueChange?.(next);
    }

    return (
        <Field.Root
            className={['checkbox-group', className].filter(Boolean).join(' ')}
            name={name}
            disabled={disabled}
            invalid={error ? true : undefined}
        >
            <Fieldset.Root
                className="checkbox-group__fieldset"
                render={
                    <BaseCheckboxGroup
                        value={value}
                        onValueChange={change}
                        allValues={selectAllLabel ? options.map((option) => option.value) : undefined}
                    />
                }
            >
                <Fieldset.Legend className="checkbox-group__legend">{legend}</Fieldset.Legend>
                {hint && <Field.Description className="checkbox-group__hint">{hint}</Field.Description>}
                {selectAllLabel && (
                    <Field.Item className="checkbox-group__item checkbox-group__item--parent">
                        <Field.Label className="checkbox-group__label">
                            <CheckboxControl parent />
                            {selectAllLabel}
                        </Field.Label>
                    </Field.Item>
                )}
                {options.map((option) => (
                    <Field.Item className="checkbox-group__item" key={option.value} disabled={option.disabled}>
                        <Field.Label className="checkbox-group__label">
                            <CheckboxControl value={option.value} />
                            {option.label}
                        </Field.Label>
                        {option.hint && (
                            <Field.Description className="checkbox-group__option-hint">{option.hint}</Field.Description>
                        )}
                    </Field.Item>
                ))}
                {error && (
                    <Field.Error className="checkbox-group__error" match>
                        {error}
                    </Field.Error>
                )}
            </Fieldset.Root>
        </Field.Root>
    );
}

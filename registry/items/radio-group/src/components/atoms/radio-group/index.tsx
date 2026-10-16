'use client';

import { Field } from '@base-ui/react/field';
import { Fieldset } from '@base-ui/react/fieldset';
import { Radio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import type { ReactNode } from 'react';
import './radio-group.scss';

export type RadioGroupOption = {
    value: string;
    label: ReactNode;
    /** Extra context for this option, announced with it. Use it to explain trade-offs between options. */
    hint?: ReactNode;
    disabled?: boolean;
};

export type RadioGroupProps = Omit<BaseRadioGroup.Props<string>, 'className' | 'children' | 'render'> & {
    /** The question the options answer, rendered as the fieldset legend. */
    legend: ReactNode;
    options: RadioGroupOption[];
    hint?: ReactNode;
    error?: ReactNode;
    className?: string;
};

/**
 * One choice from a short, visible list. Arrow keys move between options. Prefer it to a select for five
 * or fewer options, so people can compare them without opening anything. Pick a sensible `defaultValue`.
 */
export function RadioGroup({ legend, options, hint, error, name, disabled, className, ...props }: RadioGroupProps) {
    return (
        <Field.Root
            className={['radio-group', className].filter(Boolean).join(' ')}
            name={name}
            disabled={disabled}
            invalid={error ? true : undefined}
        >
            <Fieldset.Root className="radio-group__fieldset" render={<BaseRadioGroup {...props} />}>
                <Fieldset.Legend className="radio-group__legend">{legend}</Fieldset.Legend>
                {hint && <Field.Description className="radio-group__hint">{hint}</Field.Description>}
                {options.map((option) => (
                    <Field.Item className="radio-group__item" key={option.value} disabled={option.disabled}>
                        <Field.Label className="radio-group__label">
                            <Radio.Root className="radio-group__radio" value={option.value}>
                                <Radio.Indicator className="radio-group__indicator" />
                            </Radio.Root>
                            {option.label}
                        </Field.Label>
                        {option.hint && (
                            <Field.Description className="radio-group__option-hint">{option.hint}</Field.Description>
                        )}
                    </Field.Item>
                ))}
                {error && (
                    <Field.Error className="radio-group__error" match>
                        {error}
                    </Field.Error>
                )}
            </Fieldset.Root>
        </Field.Root>
    );
}

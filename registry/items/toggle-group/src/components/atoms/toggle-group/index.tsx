'use client';

import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { useId, useState, type ReactNode } from 'react';
import './toggle-group.scss';

export type ToggleGroupOption = {
    value: string;
    /** Visible content: text, or an icon with `ariaLabel`. */
    label: ReactNode;
    /** Required when `label` is only an icon. */
    ariaLabel?: string;
    disabled?: boolean;
};

export type ToggleGroupProps = {
    /** Names the group. Shown as a caption unless `hideLabel` is set, in which case it's announced only. */
    label: string;
    hideLabel?: boolean;
    options: ToggleGroupOption[];
    /** Allow more than one option to be pressed, like bold and italic. */
    multiple?: boolean;
    /** Base UI's toggle group has no form input, so hidden inputs submit each pressed value under this name. */
    name?: string;
    defaultValue?: string[];
    value?: string[];
    onValueChange?: (value: string[]) => void;
    disabled?: boolean;
    className?: string;
};

/**
 * Buttons that switch a mode or format in place, like text alignment or a list/grid view. Arrow keys move
 * between them. For a choice inside a form that people submit, a radio group or checkboxes are clearer.
 */
export function ToggleGroup({
    label,
    hideLabel = false,
    options,
    multiple = false,
    name,
    defaultValue = [],
    value: valueProp,
    onValueChange,
    disabled,
    className
}: ToggleGroupProps) {
    const id = useId();
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const value = valueProp ?? uncontrolled;

    function change(next: string[]) {
        setUncontrolled(next);
        onValueChange?.(next);
    }

    return (
        <div className={['toggle-group', className].filter(Boolean).join(' ')}>
            {!hideLabel && (
                <span className="toggle-group__label" id={`${id}-label`}>
                    {label}
                </span>
            )}
            <BaseToggleGroup
                className="toggle-group__group"
                aria-label={hideLabel ? label : undefined}
                aria-labelledby={hideLabel ? undefined : `${id}-label`}
                multiple={multiple}
                value={value}
                onValueChange={change}
                disabled={disabled}
            >
                {options.map((option) => (
                    <Toggle
                        className="toggle-group__toggle"
                        key={option.value}
                        value={option.value}
                        aria-label={option.ariaLabel}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </Toggle>
                ))}
            </BaseToggleGroup>
            {name && value.map((pressed) => <input key={pressed} type="hidden" name={name} value={pressed} />)}
        </div>
    );
}

'use client';

import { Field } from '@base-ui/react/field';
import { Switch as BaseSwitch } from '@base-ui/react/switch';
import type { ReactNode } from 'react';
import './switch.scss';

export type SwitchProps = Omit<BaseSwitch.Root.Props, 'className' | 'children'> & {
    children: ReactNode;
    /** Describe the effect of turning it on, not just the setting name. */
    description?: ReactNode;
    className?: string;
};

/**
 * An on/off setting. It submits with native forms through a hidden input: "on" under `name` when on,
 * or `uncheckedValue` when off if you set one.
 */
export function Switch({ children, description, name, disabled, className, ...props }: SwitchProps) {
    return (
        <Field.Root className={['switch', className].filter(Boolean).join(' ')} name={name} disabled={disabled}>
            <Field.Label className="switch__label">
                <BaseSwitch.Root {...props} className="switch__track">
                    <BaseSwitch.Thumb className="switch__thumb" />
                </BaseSwitch.Root>
                <span className="switch__text">{children}</span>
            </Field.Label>
            {description && <Field.Description className="switch__description">{description}</Field.Description>}
        </Field.Root>
    );
}

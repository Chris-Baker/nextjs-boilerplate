import { Button as BaseButton } from '@base-ui/react/button';
import './button.scss';

export type ButtonProps = Omit<BaseButton.Props, 'className'> & {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'small' | 'medium';
    /**
     * Marks the button busy and blocks repeat clicks and submits. It stays focusable, unlike plain
     * `disabled`, so keyboard and screen reader users don't lose their place.
     */
    pending?: boolean;
    className?: string;
};

/** Base UI's button: consistent disabled semantics, and it can render as another element via `render`. */
export function Button({
    variant = 'secondary',
    size = 'medium',
    pending = false,
    disabled,
    focusableWhenDisabled,
    type = 'button',
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <BaseButton
            {...props}
            className={['button', `button--${variant}`, `button--${size}`, className].filter(Boolean).join(' ')}
            type={type}
            disabled={pending || disabled}
            focusableWhenDisabled={pending || focusableWhenDisabled}
            aria-busy={pending || undefined}
        >
            {pending && <span className="button__spinner" aria-hidden="true" />}
            {children}
        </BaseButton>
    );
}

'use client';

import { Field } from '@base-ui/react/field';
import { Slider as BaseSlider } from '@base-ui/react/slider';
import type { ReactNode } from 'react';
import './slider.scss';

export type SliderProps = Omit<BaseSlider.Root.Props, 'className' | 'children' | 'render'> & {
    label: ReactNode;
    /**
     * Names for each thumb of a range slider, such as ["Minimum price", "Maximum price"]. Required when
     * `defaultValue` or `value` is an array, so each thumb is announced distinctly.
     */
    thumbLabels?: string[];
    hint?: ReactNode;
    error?: ReactNode;
    /** Show the formatted value beside the label. Turn off only when the value is shown elsewhere. */
    showValue?: boolean;
    className?: string;
};

/**
 * Pick a value or range where the approximate position matters more than the exact number, such as volume
 * or a price range. Use a number field when people know the exact value they want. Pass `format` to show
 * units (currency, percent) in the visible and announced value.
 */
export function Slider({
    label,
    thumbLabels,
    hint,
    error,
    showValue = true,
    name,
    disabled,
    className,
    ...props
}: SliderProps) {
    const initial = props.value ?? props.defaultValue;
    const thumbs = Array.isArray(initial) ? initial.length : 1;

    return (
        <Field.Root
            className={['slider', className].filter(Boolean).join(' ')}
            name={name}
            disabled={disabled}
            invalid={error ? true : undefined}
        >
            <BaseSlider.Root className="slider__root" {...props}>
                <div className="slider__header">
                    <BaseSlider.Label className="slider__label">{label}</BaseSlider.Label>
                    {showValue && <BaseSlider.Value className="slider__value" />}
                </div>
                {hint && <Field.Description className="slider__hint">{hint}</Field.Description>}
                <BaseSlider.Control className="slider__control">
                    <BaseSlider.Track className="slider__track">
                        <BaseSlider.Indicator className="slider__indicator" />
                        {Array.from({ length: thumbs }, (_, index) => (
                            <BaseSlider.Thumb
                                className="slider__thumb"
                                key={index}
                                index={index}
                                aria-label={thumbLabels?.[index]}
                            />
                        ))}
                    </BaseSlider.Track>
                </BaseSlider.Control>
                {error && (
                    <Field.Error className="slider__error" match>
                        {error}
                    </Field.Error>
                )}
            </BaseSlider.Root>
        </Field.Root>
    );
}

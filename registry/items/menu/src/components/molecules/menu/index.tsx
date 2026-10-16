'use client';

import { Button, type ButtonProps } from '@app/components/atoms/button';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { ReactNode } from 'react';
import './menu.scss';

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(' ');

type WithClassName<Props> = Omit<Props, 'className'> & { className?: string };

export type MenuProps = Pick<BaseMenu.Root.Props, 'open' | 'defaultOpen' | 'onOpenChange' | 'modal' | 'disabled'> & {
    trigger: ReactNode;
    triggerVariant?: ButtonProps['variant'];
    /** Required when the trigger is icon-only; screen readers announce this instead. */
    triggerLabel?: string;
    side?: BaseMenu.Positioner.Props['side'];
    align?: BaseMenu.Positioner.Props['align'];
    /** Applied to the popup. */
    className?: string;
    children: ReactNode;
};

/**
 * A list of actions behind a button. Use for secondary actions on an object; keep the primary action
 * visible. Arrow keys, typeahead, Escape and focus return are handled by Base UI.
 */
export function Menu({
    trigger,
    triggerVariant,
    triggerLabel,
    side = 'bottom',
    align = 'start',
    className,
    children,
    ...rootProps
}: MenuProps) {
    return (
        <BaseMenu.Root {...rootProps}>
            <BaseMenu.Trigger render={<Button variant={triggerVariant} />} aria-label={triggerLabel}>
                {trigger}
                <span className="menu__caret" aria-hidden="true" />
            </BaseMenu.Trigger>
            <BaseMenu.Portal>
                <BaseMenu.Positioner className="menu__positioner" side={side} align={align} sideOffset={6}>
                    <BaseMenu.Popup className={cx('menu', className)}>{children}</BaseMenu.Popup>
                </BaseMenu.Positioner>
            </BaseMenu.Portal>
        </BaseMenu.Root>
    );
}

export type MenuItemProps = WithClassName<BaseMenu.Item.Props> & {
    /** Destructive actions. Pair with a confirmation or an undo, not just the colour. */
    danger?: boolean;
    /** Keyboard shortcut hint. Display only; wire the shortcut up separately. */
    shortcut?: ReactNode;
};

export function MenuItem({ danger = false, shortcut, className, children, ...props }: MenuItemProps) {
    return (
        <BaseMenu.Item className={cx('menu__item', danger && 'menu__item--danger', className)} {...props}>
            <span className="menu__label">{children}</span>
            {shortcut && <kbd className="menu__shortcut">{shortcut}</kbd>}
        </BaseMenu.Item>
    );
}

/** Navigates instead of acting. For client-side routing pass `render={<Link href="…" />}` from next/link. */
export function MenuLinkItem({ className, children, ...props }: WithClassName<BaseMenu.LinkItem.Props>) {
    return (
        <BaseMenu.LinkItem className={cx('menu__item', className)} {...props}>
            <span className="menu__label">{children}</span>
        </BaseMenu.LinkItem>
    );
}

export function MenuSeparator({ className, ...props }: WithClassName<BaseMenu.Separator.Props>) {
    return <BaseMenu.Separator className={cx('menu__separator', className)} {...props} />;
}

export type MenuGroupProps = WithClassName<BaseMenu.Group.Props> & {
    /** Visible heading that also names the group for screen readers. */
    label: ReactNode;
};

export function MenuGroup({ label, className, children, ...props }: MenuGroupProps) {
    return (
        <BaseMenu.Group className={cx('menu__group', className)} {...props}>
            <BaseMenu.GroupLabel className="menu__group-label">{label}</BaseMenu.GroupLabel>
            {children}
        </BaseMenu.Group>
    );
}

/** A setting that toggles without closing the menu, so several can be changed in one visit. */
export function MenuCheckboxItem({ className, children, ...props }: WithClassName<BaseMenu.CheckboxItem.Props>) {
    return (
        <BaseMenu.CheckboxItem className={cx('menu__item', className)} {...props}>
            <BaseMenu.CheckboxItemIndicator className="menu__indicator menu__indicator--check">
                {/* Empty children replace Base UI's default emoji tick; the SCSS draws the mark. */}
                {''}
            </BaseMenu.CheckboxItemIndicator>
            <span className="menu__label">{children}</span>
        </BaseMenu.CheckboxItem>
    );
}

export type MenuRadioGroupProps = WithClassName<BaseMenu.RadioGroup.Props> & {
    label?: ReactNode;
};

/** One choice from a short set, such as sort order. */
export function MenuRadioGroup({ label, className, children, ...props }: MenuRadioGroupProps) {
    return (
        <BaseMenu.RadioGroup className={cx('menu__group', className)} {...props}>
            {label && <BaseMenu.GroupLabel className="menu__group-label">{label}</BaseMenu.GroupLabel>}
            {children}
        </BaseMenu.RadioGroup>
    );
}

export function MenuRadioItem({ className, children, ...props }: WithClassName<BaseMenu.RadioItem.Props>) {
    return (
        <BaseMenu.RadioItem className={cx('menu__item', className)} {...props}>
            <BaseMenu.RadioItemIndicator className="menu__indicator menu__indicator--radio">
                {/* Empty children replace Base UI's default emoji tick; the SCSS draws the mark. */}
                {''}
            </BaseMenu.RadioItemIndicator>
            <span className="menu__label">{children}</span>
        </BaseMenu.RadioItem>
    );
}

export type MenuSubmenuProps = {
    label: ReactNode;
    disabled?: boolean;
    children: ReactNode;
};

/** Nested actions. Use sparingly: more than one level deep is hard to use with a pointer or by touch. */
export function MenuSubmenu({ label, disabled, children }: MenuSubmenuProps) {
    return (
        <BaseMenu.SubmenuRoot disabled={disabled}>
            <BaseMenu.SubmenuTrigger className="menu__item menu__item--submenu">
                <span className="menu__label">{label}</span>
                <span className="menu__chevron" aria-hidden="true" />
            </BaseMenu.SubmenuTrigger>
            <BaseMenu.Portal>
                <BaseMenu.Positioner className="menu__positioner" alignOffset={-4} sideOffset={-4}>
                    <BaseMenu.Popup className="menu">{children}</BaseMenu.Popup>
                </BaseMenu.Positioner>
            </BaseMenu.Portal>
        </BaseMenu.SubmenuRoot>
    );
}

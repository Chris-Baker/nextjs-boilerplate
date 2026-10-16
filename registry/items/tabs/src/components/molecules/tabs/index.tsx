'use client';

import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import type { ReactNode } from 'react';
import './tabs.scss';

export type TabItem = {
    /** Stable key, also used for `defaultValue`. */
    value: string;
    label: ReactNode;
    content: ReactNode;
    disabled?: boolean;
};

export type TabsProps = {
    /** Names the tab list for assistive technology. */
    label: string;
    items: TabItem[];
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
};

/**
 * Peer views of the same thing. Arrow keys move between tabs, Enter or Space selects, and the indicator
 * slides to the active tab.
 */
export function Tabs({ label, items, defaultValue, value, onValueChange, className }: TabsProps) {
    return (
        <BaseTabs.Root
            className={['tabs', className].filter(Boolean).join(' ')}
            defaultValue={defaultValue ?? items[0]?.value}
            value={value}
            onValueChange={onValueChange ? (next) => onValueChange(String(next)) : undefined}
        >
            <BaseTabs.List className="tabs__list" aria-label={label}>
                {items.map((item) => (
                    <BaseTabs.Tab className="tabs__tab" key={item.value} value={item.value} disabled={item.disabled}>
                        {item.label}
                    </BaseTabs.Tab>
                ))}
                <BaseTabs.Indicator className="tabs__indicator" />
            </BaseTabs.List>
            {items.map((item) => (
                <BaseTabs.Panel className="tabs__panel" key={item.value} value={item.value}>
                    {item.content}
                </BaseTabs.Panel>
            ))}
        </BaseTabs.Root>
    );
}

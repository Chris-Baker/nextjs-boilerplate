import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import type { ReactNode } from 'react';
import './accordion.scss';

export type AccordionItem = {
    /** Stable key, also used in `defaultValue`. */
    value: string;
    title: ReactNode;
    content: ReactNode;
    disabled?: boolean;
};

export type AccordionProps = {
    items: AccordionItem[];
    /** Allow several panels open at once. Off by default, so opening one closes the others. */
    multiple?: boolean;
    defaultValue?: string[];
    /** Match the page outline: one level below the heading that introduces the accordion. */
    headingLevel?: 2 | 3 | 4 | 5 | 6;
    className?: string;
};

/**
 * Collapsible sections with animated height. Closed panels stay searchable with find-in-page, which opens
 * the panel containing the match. For a single section without JavaScript, use Disclosure.
 */
export function Accordion({ items, multiple = false, defaultValue, headingLevel = 3, className }: AccordionProps) {
    const Heading = `h${headingLevel}` as const;

    return (
        <BaseAccordion.Root
            className={['accordion', className].filter(Boolean).join(' ')}
            multiple={multiple}
            defaultValue={defaultValue}
            hiddenUntilFound
        >
            {items.map((item) => (
                <BaseAccordion.Item
                    className="accordion__item"
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                >
                    <BaseAccordion.Header className="accordion__header" render={<Heading />}>
                        <BaseAccordion.Trigger className="accordion__trigger">
                            {item.title}
                            <span className="accordion__icon" aria-hidden="true" />
                        </BaseAccordion.Trigger>
                    </BaseAccordion.Header>
                    <BaseAccordion.Panel className="accordion__panel">
                        <div className="accordion__content">{item.content}</div>
                    </BaseAccordion.Panel>
                </BaseAccordion.Item>
            ))}
        </BaseAccordion.Root>
    );
}

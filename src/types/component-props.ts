import type { ComponentPropsWithoutRef } from 'react';

/** Native div attributes shared by generated components. */
export type ComponentProps = ComponentPropsWithoutRef<'div'> & {
    'data-testid'?: string;
};

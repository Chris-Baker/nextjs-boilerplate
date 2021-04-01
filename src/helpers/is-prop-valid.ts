/** @format */

import isBasePropValid from '@emotion/is-prop-valid';

/**
 * Returns true if the prop is a valid DOM property and not in the list of disallowed props.
 */
export function isPropValid(prop: PropertyKey, disallowedProps: string[] = []): boolean {
    return isBasePropValid(prop) && !disallowedProps.includes(prop.toString());
}

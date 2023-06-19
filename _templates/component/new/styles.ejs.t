---
to: src/components/<%= h.getComponentDirectory(type) %>/<%= h.changeCase.param(name) %>/<%= h.changeCase.param(name) %>.styles.ts
---
/** @format */

import { css } from 'styled-components';
import { <%= h.changeCase.pascal(name) %>Props } from './index';

export type <%= h.changeCase.pascal(name) %>StyleProps = Partial<<%= h.changeCase.pascal(name) %>Props>;

/**
 * Base styles for the <%= h.changeCase.noCase(name) %> component
 *
 * @param _ The <%= h.changeCase.noCase(name) %> properties object
 * @return Base styles for the <%= h.changeCase.noCase(name) %> component
 */
const baseStyles = (_: <%= h.changeCase.pascal(name) %>StyleProps) => css``;

/**
 * The <%= h.changeCase.noCase(name) %> component styles
 *
 * @param props The <%= h.changeCase.noCase(name) %> properties object
 * @return Styles for the <%= h.changeCase.noCase(name) %> component
 */
export const styles = (props: <%= h.changeCase.pascal(name) %>StyleProps) => css`
    ${baseStyles(props)}
`;

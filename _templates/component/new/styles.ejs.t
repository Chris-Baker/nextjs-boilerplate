---
to: src/components/<%= h.getComponentDirectory(type) %>/<%= h.changeCase.param(name) %>/<%= h.changeCase.param(name) %>.styles.ts
---
/** @format */

import { css, SerializedStyles } from '@emotion/react';
import { <%= h.changeCase.pascal(name) %>Props } from './index';

/**
 * Base styles for the <%= h.changeCase.noCase(name) %> component
 *
 * @param {<%= h.changeCase.pascal(name) %>Props} props The <%= h.changeCase.noCase(name) %> properties object
 * @return {SerializedStyles} Base styles for the <%= h.changeCase.pascal(name) %> component
 */
const baseStyles = (props: <%= h.changeCase.pascal(name) %>Props): SerializedStyles => css``;

/**
 * The <%= h.changeCase.noCase(name) %> component styles
 *
 * @param {<%= h.changeCase.pascal(name) %>Props} props The <%= h.changeCase.noCase(name) %> properties object
 * @return {SerializedStyles} Styles for the <%= h.changeCase.pascal(name) %> component
 */
export const styles = (props: <%= h.changeCase.pascal(name) %>Props) => css`
    ${baseStyles(props)}
`;
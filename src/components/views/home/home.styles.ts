import { css } from '@emotion/react';
import { HomeProps } from './index';

/**
 * Base styles for the home component
 *
 * @param _ The home properties object
 * @return Base styles for the home component
 */
const baseStyles = (_: Partial<HomeProps>) => css``;

/**
 * The home component styles
 *
 * @param props The home properties object
 * @return Styles for the home component
 */
export const styles = (props: Partial<HomeProps>) => css`
    ${baseStyles(props)}
`;

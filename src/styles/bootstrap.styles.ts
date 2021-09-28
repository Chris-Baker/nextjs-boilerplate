/** @format */

// @ts-ignore
import bootstrapTheme from '!!raw-loader!@app/styles/bootstrap-theme.css';
import { createGlobalStyle } from 'styled-components';

export const BootstrapStyles = createGlobalStyle`
    ${bootstrapTheme}
`;

import { Global, css } from '@emotion/react';
import { resetStyles } from './reset.styles';

const globalStyles = css`
    ${resetStyles}
`;

export const GlobalStyles = () => <Global styles={globalStyles} />;

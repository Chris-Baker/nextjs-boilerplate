import { createGlobalStyle } from 'styled-components';
import { resetStyles } from './reset.styles';

export const GlobalStyles = createGlobalStyle`
    ${resetStyles}
`;

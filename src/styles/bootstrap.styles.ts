/** @format */

// @ts-ignore
import bootstrapTheme from '!!raw-loader!@app/styles/bootstrap-theme.css';
import { css, SerializedStyles } from '@emotion/react';

export const bootstrapStyles: SerializedStyles = css`
    ${bootstrapTheme}
`;

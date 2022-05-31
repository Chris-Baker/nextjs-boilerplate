/** @format */

import { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { ComponentProps } from '@app/types/component-props';
import { styles } from './home.styles';

export interface HomeProps extends ComponentProps {
    children?: ReactNode;
}

const StyledHome = styled('div')`
    ${styles}
`;

export const Home: FunctionComponent<HomeProps> = (props: HomeProps) => {
    const { children, ...otherProps } = props;

    return (
        <StyledHome {...otherProps}>
            <h1>NextJS Boilerplate</h1>
        </StyledHome>
    );
};

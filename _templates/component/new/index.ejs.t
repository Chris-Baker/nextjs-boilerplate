---
to: src/components/<%= h.getComponentDirectory(type) %>/<%= h.changeCase.param(name) %>/index.tsx
---
/** @format */

import { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { isPropValid } from '@app/helpers/is-prop-valid';
import { ComponentProps } from '@app/types/component-props';
import { styles } from './<%= h.changeCase.param(name) %>.styles';

export interface <%= h.changeCase.pascal(name) %>Props extends ComponentProps {
    /**
     * Child elements
     */
    children?: ReactNode;
}

const Styled<%= h.changeCase.pascal(name) %> = styled('div', {
    shouldForwardProp: (prop) => isPropValid(prop)
})`
    ${styles}
`;

export const <%= h.changeCase.pascal(name) %>: FunctionComponent<<%= h.changeCase.pascal(name) %>Props> = (props: <%= h.changeCase.pascal(name) %>Props) => {
    const {
        children,
        ...otherProps
    } = props;

    return <Styled<%= h.changeCase.pascal(name) %> {...otherProps}>{children}</Styled<%= h.changeCase.pascal(name) %>>;
};

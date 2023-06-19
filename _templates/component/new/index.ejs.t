---
to: src/components/<%= h.getComponentDirectory(type) %>/<%= h.changeCase.param(name) %>/index.tsx
---
/** @format */

import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ComponentProps } from '@app/types/component-props';
import { styles } from './<%= h.changeCase.param(name) %>.styles';

export type <%= h.changeCase.pascal(name) %>Props = ComponentProps;

const Styled<%= h.changeCase.pascal(name) %> = styled('div')`
    ${styles}
`;

export const <%= h.changeCase.pascal(name) %>: FunctionComponent<<%= h.changeCase.pascal(name) %>Props> = (props: <%= h.changeCase.pascal(name) %>Props) => {
    const { ...otherProps } = props;
    return <Styled<%= h.changeCase.pascal(name) %> {...otherProps}></Styled<%= h.changeCase.pascal(name) %>>;
};

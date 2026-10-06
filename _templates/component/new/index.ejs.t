---
to: "src/components/<%= h.getComponentDirectory(typeof type === 'undefined' ? 'atom' : type) %>/<%= h.changeCase.param(name) %>/index.tsx"
---
<% if (typeof client !== 'undefined' && client) { %>'use client';

<% } %>import type { ComponentProps } from '@app/types/component-props';
import './<%= h.changeCase.param(name) %>.scss';

export type <%= h.changeCase.pascal(name) %>Props = ComponentProps;

export function <%= h.changeCase.pascal(name) %>({ className, children, ...props }: <%= h.changeCase.pascal(name) %>Props) {
    return (
        <div className={['<%= h.changeCase.param(name) %>', className].filter(Boolean).join(' ')} {...props}>
            {children}
        </div>
    );
}

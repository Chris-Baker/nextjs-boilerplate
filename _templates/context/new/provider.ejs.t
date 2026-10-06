---
to: "src/contexts/<%= h.changeCase.param(name) %>-provider.tsx"
---
'use client';

import { createContext, useContext, type ReactNode } from 'react';

// Replace with your context's data and actions.
export type <%= h.changeCase.pascal(name) %>ContextStore = Record<string, unknown>;

const <%= h.changeCase.pascal(name) %>Context = createContext<<%= h.changeCase.pascal(name) %>ContextStore | undefined>(undefined);

export function use<%= h.changeCase.pascal(name) %>Context() {
    const context = useContext(<%= h.changeCase.pascal(name) %>Context);
    if (context === undefined) throw new Error('use<%= h.changeCase.pascal(name) %>Context must be used within <%= h.changeCase.pascal(name) %>Provider');
    return context;
}

export function <%= h.changeCase.pascal(name) %>Provider({ children, value }: { children: ReactNode; value: <%= h.changeCase.pascal(name) %>ContextStore }) {
    return <<%= h.changeCase.pascal(name) %>Context.Provider value={value}>{children}</<%= h.changeCase.pascal(name) %>Context.Provider>;
}

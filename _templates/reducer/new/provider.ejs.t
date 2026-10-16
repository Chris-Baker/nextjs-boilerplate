---
to: "src/contexts/<%= h.changeCase.param(name) %>-provider.tsx"
---
<%
const Name = h.changeCase.pascal(name);
const actions = h.getActionNames(locals.actions).map((action) => h.changeCase.camel(action));
-%>
'use client';

import { createContext, useContext, useReducer, type ReactNode } from 'react';

// Replace with your context's state.
export type <%= Name %>State = Record<string, unknown>;

const defaultState: <%= Name %>State = {};

// Every action is an updater that receives the latest state, so a change made while async work is in flight
// is never applied to a stale copy.
type <%= Name %>Update = (state: <%= Name %>State) => <%= Name %>State;

function reducer(state: <%= Name %>State, update: <%= Name %>Update) {
    return update(state);
}

export interface <%= Name %>ContextStore {
    state: <%= Name %>State;
<% actions.forEach((action) => { -%>
    <%= action %>: () => void;
<% }) -%>
}

const <%= Name %>Context = createContext<<%= Name %>ContextStore | undefined>(undefined);

export function use<%= Name %>Context() {
    const context = useContext(<%= Name %>Context);
    if (context === undefined) throw new Error('use<%= Name %>Context must be used within <%= Name %>Provider');
    return context;
}

export function <%= Name %>Provider({
    children,
    initialState = defaultState
}: {
    children: ReactNode;
    initialState?: <%= Name %>State;
}) {
    const [state, update] = useReducer(reducer, initialState);
<% actions.forEach((action) => { %>
    function <%= action %>() {
        update((current) => ({ ...current }));
    }
<% }) %>
    const store: <%= Name %>ContextStore = { state, <%= actions.join(', ') %> };

    return <<%= Name %>Context.Provider value={store}>{children}</<%= Name %>Context.Provider>;
}

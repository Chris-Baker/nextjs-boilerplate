---
to: "src/app/<%= h.changeCase.param(name) %>/page.tsx"
---
export default function <%= h.changeCase.pascal(name) %>Page() {
    return <main><h1><%= h.changeCase.title(name) %></h1></main>;
}

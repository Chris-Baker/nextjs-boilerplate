---
description: 'Turn the point of view and brand assets into design tokens in src/styles/_tokens.scss'
---

# Brand tokens

Tokens are where the point of view becomes values every component inherits. The defaults in
`src/styles/_tokens.scss` are neutral placeholders; shipping them unchanged is how projects end up looking
like everything else.

## User input

```text
$ARGUMENTS
```

## Steps

1. Read `docs/point-of-view.md`. If it still says "not yet written", recommend `/speckit-craft-point-of-view`
   first; continue only if the owner wants to.
2. Read `src/styles/_tokens.scss`, `.specify/extensions/craft/interviewing.md`, and the Next.js font guide in
   `node_modules/next/dist/docs/` if typefaces will change.
3. Ask for existing assets first: logo, brand colours, typefaces and licences, guidelines, photography,
   references they love. Read anything shared.
4. If there's a brand, map it onto the tokens and ask about gaps (dark theme, status colours, motion).
   If there isn't, propose two or three distinct directions derived from the point of view's traits, each
   with palette, type pairing, radius, density and motion character, and say how each trait shows up.
   Ask the owner to choose, combine or reject them.
5. Write the chosen values into both themes. Keep every existing token name (components depend on them);
   add new tokens where the direction needs them. Load fonts with `next/font`, not a stylesheet link.
6. Run `npm run check:contrast` and `npm run check:tokens`. Fix failures by adjusting values, not by
   lowering the bar, and tell the owner which colours changed and why.
7. Replace the placeholder comment at the top of `_tokens.scss` with one line saying where the values came
   from. Show the result in the running app (`npm run dev`) in light and dark before calling it done.

---
name: build-ui
description: Make a small UI change in this project without a full Spec Kit feature, following the same point of view, system and quality bar. Use for tweaks, fixes and single components; use /speckit-specify for new features or flows.
---

# Build UI (short path)

For anything bigger than a tweak or a single component, use Spec Kit instead: `/speckit-specify`, which brings
in the experience interview, exploration and critique automatically. This short path keeps the same
principles (`docs/principles.md`, `.specify/memory/constitution.md`) for small changes.

## 1. Know who it's for

Read `docs/point-of-view.md` and `docs/voice.md`. If either still says "not yet written", or doesn't answer what
this change depends on, ask the user before designing. Ask specific questions, and offer
`/speckit-craft-point-of-view` or `/speckit-craft-voice` to write the answers down for next time.

State the job in a sentence or two: who, in what situation, trying to do what.

## 2. Start from the system

- `npm run ui list`. Prefer existing registry items; `npm run ui add <name>` copies one in with its
  dependencies. Interactive parts are built on Base UI; read `node_modules/@base-ui/react/docs/` before
  changing one.
- New components: `npx hygen component new --name <name> --type <atom|molecule|organism|view>`.
- Use tokens from `src/styles/_tokens.scss`. If the point of view calls for a value that isn't there, add a
  token, then run `npm run check:contrast`.
- Read the relevant guide in `node_modules/next/dist/docs/` before using any Next.js API.

## 3. Build it whole

Handle every state the change touches (empty, loading, error, success, too much content), with real copy in
the project's voice. Add the detail that shows you anticipated the user's situation.

## 4. Experience it, then edit

Use it in the running app (`npm run dev`) as the user would: keyboard only, narrow and wide, both themes.
Then ask the `design-editor` subagent for an adversarial review, fix what it finds, and re-check. Finish with
`npm run check`. Report what you verified in the running app and what you couldn't.

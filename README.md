# Next.js boilerplate

A reusable Next.js App Router starter maintained by [Chris Baker](https://github.com/Chris-Baker).

## Stack

- Next.js 16 and React 19, with Turbopack for development and production builds and SWC for compilation.
- TypeScript, checked separately from transpilation.
- Plain SCSS with BEM naming, compiled to CSS by embedded Dart Sass. No runtime styling library.
- A cross-browser baseline in `src/styles/global.scss` that evens out Chromium, Firefox and Safari defaults.
- CSS custom properties for light, dark and system themes.
- ESLint with Next.js, React and TypeScript rules.
- Prettier for code, SCSS and documentation.
- Hygen generators for components, App Router pages, React contexts and reducer contexts.
- A copy-in registry of accessible components and flows built on Base UI, styled with theme tokens.
- Agent setup: project rules in `AGENTS.md`, a point-of-view and quality-bar document, a design-editor subagent,
  Claude Code skills and the Next.js MCP server.

## Getting started

Use Node.js 24 LTS (`nvm use`), then:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production build, run `npm run build`, then `npm start`.

## Checks

```sh
npm run lint             # ESLint
npm run format           # Format source, styles and documentation
npm run format:check     # Check formatting
npm run typecheck        # Generate route types and check TypeScript
npm run check:tokens     # Reject raw colours outside the theme tokens; check BEM block names
npm run check:contrast   # Check token colour pairs against WCAG 2.2 AA in both themes
npm run status           # Show which parts of the project's intent are still unwritten
npm run test:generators  # Generate fixtures in a temporary directory; compile TS and SCSS
npm run test:registry    # Install every registry item in a temporary directory; compile TS and SCSS
npm run check            # All checks and production build
```

GitHub Actions runs `npm ci` and `npm run check` on pull requests and pushes to master.

## Structure

```text
.claude/                 Claude Code skills, subagents and shared settings
.specify/                Spec Kit: constitution, templates, installed craft extension and preset
_templates/              Hygen templates
docs/                    Principles, point of view, voice and quality bar
speckit/                 Source of the craft Spec Kit extension and preset
registry/                Copy-in components and flows (registry.json lists them)
scripts/                 Checks and the `ui` registry CLI
specs/                   Feature specs, plans and tasks (created by Spec Kit)
src/
  app/                   App Router layouts and pages (lab/ is development-only)
  components/
    atoms/               Small components
    molecules/           Component combinations
    organisms/           Larger sections
    views/               Page layouts
    icons/               Icon components
  contexts/              React context providers
  hooks/                 React hooks
  fixtures/              Static fixture data
  helpers/               Pure functions
  services/              API clients
  styles/                Global SCSS and theme tokens
  types/                 Shared TypeScript types
```

The `@app/*` alias points to `src/*`.

## Components and SCSS

```sh
npx hygen component new --name feature-card --type molecule
npx hygen component new --name interactive-card --type molecule --client
```

Generates `index.tsx` and `feature-card.scss` together. Components are server-compatible by default; add `--client` for hooks, browser APIs or event handlers. Types are `atom`, `molecule`, `organism` and `view`, with aliases `a`, `m`, `o` and `v`. Omitting `--type` creates an atom.

Use BEM blocks, elements and modifiers:

```scss
.feature-card {
    padding: 1rem;
    background: var(--color-surface);

    &__title {
        color: var(--color-text);
    }

    &--featured {
        border: 1px solid var(--color-accent);
    }
}
```

Styles are global CSS, so keep block names unique across the project. Generated components forward native div attributes and merge an additional `className`; change the native element and prop type when a different semantic element is appropriate. The old styled `as` prop is no longer part of the component contract.

## Component registry

```sh
npm run ui list                        # What's available, and when to use it
npm run ui add dialog tabs             # Copy into src/, with dependencies
npm run ui add settings-flow           # A whole flow: route, Server Action and view
npm run ui add button -- --dry-run     # Show what would be written
```

Like shadcn/ui, items are source, not a dependency: once added, the code is yours to change. Unlike shadcn,
there's no Tailwind or other styling library, only plain SCSS, BEM and the theme tokens, so restyling means
editing tokens or SCSS. Existing files are skipped unless you pass `--force`, so local changes are never overwritten.

- **Form controls:** `field`, `switch`, `checkbox`, `checkbox-group`, `radio-group`, `slider`, `number-field`, `toggle-group`, `otp-field`, `select`, `combobox`.
- **Actions and overlays:** `button`, `dialog`, `menu`, `context-menu`, `popover`, `tooltip`, `alert-dialog`, `drawer`, `toast`.
- **Content and feedback:** `visually-hidden`, `progress`, `meter`, `avatar`, `tabs`, `disclosure`, `callout`, `empty-state`, `accordion`, `scroll-area`.
- **Flows:** `settings-flow`.

Interactive items are built on [Base UI](https://base-ui.com) (MIT, unstyled, from the Radix, Floating UI
and MUI teams) for consistent behaviour and accessibility across browsers. Their parts are styled here with
BEM classes and Base UI's `data-*` state attributes. Only `callout`, `empty-state` and `visually-hidden` are
plain elements, because Base UI has nothing to add there. Base UI bundles version-matched docs at
`node_modules/@base-ui/react/docs/`. Run `npm run ui list` for descriptions and when to use each item; `add`
tells you if an item needs a package you haven't installed.

Form controls share one model: `label`, `hint` and `error` props on a Base UI Field. Inside a Base UI
`Form`, pass the Server Action's errors as `errors` and each field shows its own by `name`, clearing when the
user edits; Form moves focus to the first invalid field. `Field` takes `messages` to put native validation
in your words, such as `{ typeMismatch: 'Enter an email address like name@example.com.' }`. The
`settings-flow` item shows the whole pattern.

Flows matter more than parts: they show how the pieces behave together, including the error, empty and
pending states that are easy to skip. To add an item, put files under `registry/items/<name>/` at their
destination paths, add an entry to `registry/registry.json`, and run `npm run test:registry`.

## Working with AI agents

AI makes it cheap to build and easy to build something generic. This base is set up so agents work from the
project's intent, not just its conventions. `docs/principles.md` explains the thinking; in short: have a point
of view, encode it into the system, don't confuse done with good, and use the time AI saves to explore.

| Piece                                    | What it does                                                                                                                                                                        |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AGENTS.md`                              | Rules every agent reads (Claude Code through `CLAUDE.md`): principles, workflow, where to look, no AI attribution in git history. `next dev` maintains the Next.js block at the top |
| `docs/principles.md`                     | The reasoning: zombie UI, the temptation of done, and four practices against them                                                                                                   |
| `docs/point-of-view.md`, `docs/voice.md` | Who the product is for, who it wants to be to them, and how it sounds. Written by interviewing the owner                                                                            |
| `docs/quality-bar.md`                    | The editor's checklist, the same however something was made                                                                                                                         |
| `.specify/memory/constitution.md`        | Makes the principles binding in Spec Kit's plan gates                                                                                                                               |
| `npm run status`                         | Lists what's still unwritten. Runs at the start of every Claude Code session                                                                                                        |
| `design-editor` subagent                 | Adversarial review of the running app                                                                                                                                               |
| `.mcp.json`                              | Next.js MCP server: runtime errors, routes and compilation issues                                                                                                                   |

### Spec Kit

Features are built with [Spec Kit](https://github.com/github/spec-kit) (MIT) v1.2.0, initialised for Claude
Code. Install the CLI with [uv](https://docs.astral.sh/uv/) if you need to run `specify` yourself:

```sh
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v1.2.0
```

The project's own **craft** extension and preset, in `speckit/`, add what a spec can't capture on its own.
They hook into the core commands, so the normal Spec Kit flow picks them up:

| Command                        | When                                         | What it does                                                                              |
| ------------------------------ | -------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `/speckit-craft-point-of-view` | Once; offered before `/speckit-constitution` | Interviews the owner and writes `docs/point-of-view.md`                                   |
| `/speckit-craft-voice`         | Once                                         | Interviews for voice and writes `docs/voice.md`                                           |
| `/speckit-craft-tokens`        | Once                                         | Turns the point of view and brand assets into tokens, checked for contrast                |
| `/speckit-craft-experience`    | Automatically after `/speckit-specify`       | Interviews for the moment, states, words and the detail that shows care                   |
| `/speckit-craft-explore`       | Offered before `/speckit-plan`               | Builds divergent sketches in the dev-only `/lab` route, then converges with the owner     |
| `/speckit-craft-critique`      | Automatically after `/speckit-implement`     | Reviews the running feature against the spec and quality bar, then fixes what falls short |

The preset adds an **Experience** section to specs, an Experience Plan and Craft Gate to plans, and an
Experience Verification phase to tasks. The interview commands share `speckit/craft-extension/interviewing.md`:
small batches, concrete options to react to, no generic words accepted, and gaps recorded as open questions
rather than guessed.

Edit craft in `speckit/`, then run `npm run speckit:sync` to update the copies in `.specify/` and
`.claude/skills/`. Files Spec Kit generates are excluded from Prettier.

### Starting a new project from this base

1. Run `/speckit-craft-point-of-view`, then `/speckit-craft-voice` and `/speckit-craft-tokens`.
2. Run `/speckit-constitution` to add product-specific rules to the constitution.
3. Build features with `/speckit-specify` onwards. Use the `build-ui` skill for small changes.

## Pages and contexts

```sh
npx hygen page new --name about
npx hygen context new --name account
npx hygen reducer new --name pending-transactions --actions add-pending,fail-transaction
```

Pages are generated at `src/app/about/page.tsx`. Contexts are client components, accept a typed `value`, and throw a clear error if their hook is used outside the provider. Replace the generated context store type with your own data and actions.

Reducer contexts own their state with `useReducer`. Each name in `--actions` becomes a stub function on the store that dispatches an updater, `update((current) => next)`, so changes made while async work is in flight always apply to the latest state. Fill in the state type, each action's arguments and next state, and add queries alongside the actions as plain functions that read `state`.

## Themes

Edit `src/styles/_tokens.scss` for the light/dark palette. `prefers-color-scheme` handles system mode without JavaScript, including live OS preference changes. The appearance buttons store `light`, `dark` or `system` in local storage and synchronise changes across tabs. Each option works with a click, Enter or Space, and exposes its selected state to assistive technology.

A small, static script in the root layout applies a saved override before paint. It only sets a data attribute; there is no runtime CSS generation or theme provider. If your deployment uses a strict Content Security Policy, allow this exact inline script using a hash or integrate your nonce policy. With JavaScript disabled, the system theme still works.

## Upgrading an existing project

This update changes the styling approach and developer tooling. Existing Emotion/MUI components need conversion to JSX with BEM classes and SCSS. Move old generated `src/pages` routes to the App Router as appropriate. Replace `next lint` with the new scripts and configure your editor to use ESLint and Prettier.

The portfolio that prompted this update is a separate consumer; this repository remains a general-purpose starter.

# Next.js boilerplate

A reusable Next.js App Router starter maintained by [Chris Baker](https://github.com/Chris-Baker).

## Stack

- Next.js 16 and React 19, with Turbopack for development and production builds and SWC for compilation.
- TypeScript, checked separately from transpilation.
- Plain SCSS with BEM naming, compiled to CSS by embedded Dart Sass. No runtime styling library.
- CSS custom properties for light, dark and system themes.
- ESLint with Next.js, React and TypeScript rules.
- Prettier for code, SCSS and documentation.
- Hygen generators for components, App Router pages and React contexts.

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
npm run test:generators  # Generate fixtures in a temporary directory; compile TS and SCSS
npm run check            # All checks and production build
```

GitHub Actions runs `npm ci` and `npm run check` on pull requests and pushes to master.

## Structure

```text
_templates/              Hygen templates
src/
  app/                   App Router layouts and pages
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

## Pages and contexts

```sh
npx hygen page new --name about
npx hygen context new --name account
```

Pages are generated at `src/app/about/page.tsx`. Contexts are client components, accept a typed `value`, and throw a clear error if their hook is used outside the provider. Replace the generated context store type with your own data and actions.

## Themes

Edit `src/styles/_tokens.scss` for the light/dark palette. `prefers-color-scheme` handles system mode without JavaScript, including live OS preference changes. The appearance buttons store `light`, `dark` or `system` in local storage and synchronise changes across tabs. Each option works with a click, Enter or Space, and exposes its selected state to assistive technology.

A small, static script in the root layout applies a saved override before paint. It only sets a data attribute; there is no runtime CSS generation or theme provider. If your deployment uses a strict Content Security Policy, allow this exact inline script using a hash or integrate your nonce policy. With JavaScript disabled, the system theme still works.

## Upgrading an existing project

This update changes the styling approach and developer tooling. Existing Emotion/MUI components need conversion to JSX with BEM classes and SCSS. Move old generated `src/pages` routes to the App Router as appropriate. Replace `next lint` with the new scripts and configure your editor to use ESLint and Prettier.

The portfolio that prompted this update is a separate consumer; this repository remains a general-purpose starter.

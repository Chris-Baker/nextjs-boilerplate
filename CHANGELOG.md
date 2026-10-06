# Changelog

## 16.4.0 — 2026-10-06

- Upgrade to Next.js 16.4, React 19.3 and Node.js 24 LTS.
- Use the default Turbopack/SWC build pipeline.
- Replace Emotion and MUI with colocated SCSS and BEM classes, compiled with embedded Sass.
- Add CSS-variable light, dark and system themes with persisted preference and cross-tab updates.
- Keep pages and presentational components server-rendered; isolate the appearance buttons as a client component.
- Modernise ESLint flat configuration and retain Prettier for all supported files.
- Update Hygen component, App Router page and context templates; verify generated TypeScript and SCSS in isolated fixtures.
- Add CI checks and migration documentation.

### Compatibility notes

This is a breaking change for projects consuming the old styling/provider APIs. See the README migration section.

TypeScript is pinned to 6.0.3 for compatibility with typescript-eslint. Next.js supports ESLint 10, but several bundled plugins still declare peer ranges ending at ESLint 9; npm emits peer warnings. Clean installation and all project checks pass with the pinned versions.

On 6 October 2026, npm audit reports no production vulnerabilities. Development dependencies have two underlying advisory chains: `braces` through Next's ESLint plugin (high) and `sprintf-js` through Hygen (moderate). npm counts the affected parent packages too, reporting ten findings. No safe compatible fix was available; the suggested forced Next lint-config downgrade was not applied. These tools process local lint patterns and generator templates, not website requests.

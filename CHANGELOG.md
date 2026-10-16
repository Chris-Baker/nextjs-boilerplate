# Changelog

## Unreleased

- Add Spec Kit v1.2.0 for spec-driven development, initialised for Claude Code, with a project constitution
  built from `docs/principles.md`.
- Add the craft Spec Kit extension: interview commands for point of view, voice and tokens; an experience
  interview after `/speckit-specify`; divergent exploration before `/speckit-plan`; and an editor critique
  after `/speckit-implement`. The craft preset adds Experience sections to spec, plan and tasks templates.
- Add `docs/principles.md` (the reasoning behind the setup) and `docs/voice.md`.
- Add `npm run status`, run at the start of every Claude Code session, and `npm run speckit:sync`.
- Add `npm run check:contrast` and a `--color-control-border` token so form control boundaries meet WCAG 2.2
  AA 3:1.
- Add a development-only `/lab` route for exploration sketches.
- Replace the `critique` skill with `/speckit-craft-critique`; `build-ui` becomes the short path for small
  changes.

- Add a copy-in component registry (`npm run ui`) with button, visually hidden, field, switch, dialog,
  tabs, disclosure, callout and empty state components, plus a complete settings flow with a Server Action.
- Add 21 Base UI registry items: checkbox, checkbox group, radio group, slider, number field, toggle group,
  OTP field, progress, meter, avatar, select, combobox, menu, context menu, popover, tooltip, alert dialog,
  drawer, toast, accordion and scroll area. `@base-ui/react` 1.9.0 (MIT) is the only new runtime dependency.
- Build button, field, switch, dialog, tabs and disclosure on Base UI too. Field gains `Input`, `Textarea`
  and `messages` for native validation copy. Select and combobox take the same `label`, `hint` and `error`
  props, and all form controls show Base UI `Form` server errors by `name`. The settings flow uses `Form`.
- Add a cross-browser baseline to `global.scss`: text-size adjust, form control inheritance and quirks,
  typographic defaults, media, tables, `:target` scroll margin and a `hidden` rule that respects
  `until-found`.
- Wrap the app in an `.app-root` stacking context and make `body` relative, as Base UI portals require.
- Add `docs/point-of-view.md` and `docs/quality-bar.md` so people and agents build from stated intent and
  review against one standard.
- Extend `AGENTS.md` with project rules, including no AI attribution in commits, PRs or branch names; add
  `CLAUDE.md`, Claude Code `build-ui` and `critique` skills, a `design-editor` subagent and shared settings.
- Configure the Next.js MCP server in `.mcp.json`.
- Add danger, success, warning, on-accent, backdrop, shadow, spacing, type and motion tokens.
- Add `check:tokens` and `test:registry` to `npm run check`.

## 16.4.0 — 2026-10-06

- Upgrade to Next.js 16.4, React 19.3 and Node.js 24 LTS.
- Use the default Turbopack/SWC build pipeline.
- Replace Emotion and MUI with colocated SCSS and BEM classes, compiled with embedded Sass.
- Add CSS-variable light, dark and system themes with persisted preference and cross-tab updates.
- Keep pages and presentational components server-rendered; isolate the appearance buttons as a client component.
- Modernise ESLint flat configuration and retain Prettier for all supported files.
- Update Hygen component, App Router page and context templates, and add a reducer context template; verify generated TypeScript and SCSS in isolated fixtures.
- Add CI checks and migration documentation.

### Compatibility notes

This is a breaking change for projects consuming the old styling/provider APIs. See the README migration section.

TypeScript is pinned to 6.0.3 for compatibility with typescript-eslint. Next.js supports ESLint 10, but several bundled plugins still declare peer ranges ending at ESLint 9; npm emits peer warnings. Clean installation and all project checks pass with the pinned versions.

On 6 October 2026, npm audit reports no production vulnerabilities. Development dependencies have two underlying advisory chains: `braces` through Next's ESLint plugin (high) and `sprintf-js` through Hygen (moderate). npm counts the affected parent packages too, reporting ten findings. No safe compatible fix was available; the suggested forced Next lint-config downgrade was not applied. These tools process local lint patterns and generator templates, not website requests.

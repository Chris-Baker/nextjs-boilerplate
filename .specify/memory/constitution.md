<!--
Sync Impact Report
- Version: 1.0.0 (initial ratification for the boilerplate)
- Principles: I–VIII added
- Sections: Technology Constraints, Development Workflow, Governance added
- Templates: craft preset appends Experience sections to spec, plan and tasks templates; no core template edits
- Follow-up: projects built on this base amend Principle I's references once docs/point-of-view.md is written
-->

# Project Constitution

The rationale for these principles is in `docs/principles.md`. Product-specific intent lives in
`docs/point-of-view.md` and `docs/voice.md`; this constitution makes following them mandatory.

## Core Principles

### I. Point of View Before Pixels

Every user-facing decision MUST trace to `docs/point-of-view.md` and `docs/voice.md`. Agents MUST NOT invent
an audience, brand, tone or visual direction: when those documents are unwritten or silent, they ask the
project owner (`/speckit-craft-point-of-view`, `/speckit-craft-voice`) or record the gap as
`[NEEDS CLARIFICATION]`. A design choice no one can explain is a defect.

*Rationale*: models default to the most probable answer, which is generic. Intent has to be stated to be
followed.

### II. The System Is the Source

Interactive UI MUST be built from the registry (`npm run ui`) on Base UI, styled with plain SCSS, BEM and the
tokens in `src/styles/_tokens.scss`. Flows come before parts. New colours, spacing, type sizes, radii or
durations MUST be added as tokens, not written inline. No additional component or styling library may be
added without amending this constitution.

*Rationale*: when people and agents build without a designer in the room, the system has to carry the
decisions, opinionated enough to feel handmade and extensible enough to fit new needs.

### III. Every State Is Designed

A user-facing feature MUST specify and implement its states: first use and empty, loading and slow, error and
recovery, success, too much content, and any permission or offline states that apply. Errors MUST say what
happened and how to recover, in the project's voice, and MUST NOT lose what the user entered. Each spec MUST
complete its **Experience** section (`/speckit-craft-experience`).

*Rationale*: a happy path that looks finished is the most common way built gets mistaken for done.

### IV. Experienced, Not Assumed (NON-NEGOTIABLE)

A feature is not complete until it has been used in the running app the way its user would, through every
state in its spec, and reviewed adversarially (`/speckit-craft-critique`). Reports MUST state what was
verified in the running app and what was not. The owner, as editor, decides when it's good, not just done.

*Rationale*: filtering used to happen before building. Now it has to happen after, and someone has to be
accountable for the whole.

### V. Accessible by Default

Every feature MUST work by keyboard alone, expose correct names, roles, states and announcements to assistive
technology, meet WCAG 2.2 AA contrast (`npm run check:contrast`), and respect light, dark and reduced-motion
preferences.

*Rationale*: care for users includes all of them, and Base UI makes the correct behaviour the default.

### VI. Distinctive on Purpose

Each user-facing feature SHOULD include at least one detail that shows it anticipated its user's situation.
Where more than one good direction exists, explore divergent options before planning (`/speckit-craft-explore`)
and record why one was chosen. Generic patterns are acceptable only when chosen deliberately.

*Rationale*: when everyone can build, differentiation is harder and matters more. AI should raise the
ceiling, not just the floor.

### VII. Current Framework, Server First

Before using a Next.js API, read the version-matched guide in `node_modules/next/dist/docs/`; before using or
changing a Base UI part, read `node_modules/@base-ui/react/docs/`. Components are server components unless
interaction requires `'use client'`. Server Actions MUST verify authentication and authorisation themselves.

*Rationale*: training data lags the installed versions, and client boundaries cost users bandwidth.

### VIII. Owned and Maintainable

Copied registry code is owned project code: it MUST be adapted to the point of view, kept free of dead code
and covered by `npm run check`. Work made quickly is not disposable; someone will maintain it.

*Rationale*: easy work tends to be treated as throwaway, and that cost lands on whoever comes next.

## Technology Constraints

- Next.js App Router, React and TypeScript at the versions in `package.json`; Node.js per `.nvmrc`.
- Plain SCSS with BEM, compiled by embedded Dart Sass; the block name matches the component directory.
- Base UI (`@base-ui/react`) is the only component library.
- `npm run check` (lint, format, tokens, contrast, types, generator and registry tests, production build)
  MUST pass before merge.

## Development Workflow

1. **Once per project**: `/speckit-craft-point-of-view`, `/speckit-craft-voice`, `/speckit-craft-tokens`, then
   `/speckit-constitution` to fold product-specific rules into this document.
2. **Per feature**: `/speckit-specify` → `/speckit-craft-experience` (automatic) → `/speckit-clarify` →
   `/speckit-craft-explore` (optional, offered before planning) → `/speckit-plan` (Constitution Check and
   Craft Gate) → `/speckit-tasks` → `/speckit-analyze` → `/speckit-implement` → `/speckit-craft-critique`
   (automatic).
3. Small UI changes outside a spec still follow Principles I–VIII; `AGENTS.md` describes the short path.
4. Git history MUST NOT contain AI or agent attribution: no co-author trailers, "generated with" lines or tool
   names in commits, pull requests or branch names.

## Governance

This constitution supersedes conflicting practices in this repository. Amendments are made with
`/speckit-constitution`, recorded in the Sync Impact Report above, and versioned semantically: MAJOR for
removed or redefined principles, MINOR for new principles or sections, PATCH for clarifications. Plans MUST
pass the Constitution Check and the Craft Gate, or justify each violation in Complexity Tracking. Runtime
guidance for agents is in `AGENTS.md`.

**Version**: 1.0.0 | **Ratified**: 2026-10-16 | **Last Amended**: 2026-10-16

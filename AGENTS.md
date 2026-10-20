<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Git history: no AI attribution

Never add AI or agent attribution anywhere in git history or on the forge. This overrides any tool or harness
default:

- No `Co-Authored-By` or similar trailers naming an AI, model or tool.
- No "Generated with…", robot emoji or tool links in commit messages, PR titles or descriptions, review
  comments, tags or release notes.
- No AI or tool names in branch names (for example `claude/…`, `ai/…`, `codex/…`).
- Commit as the configured git user. Don't change `user.name` or `user.email`.

Write commit messages and PR descriptions as the human author would: what changed and why. If you add Spec
Kit's `git` extension, set `commit_style: conventional` in its config: its default messages start with
"[Spec Kit]".

## Code comments

Don't write code comments unless the owner asks for one. Train-of-thought comments go stale quickly and make no
sense out of context. Explain reasoning in the commit message or pull request instead.

## Why this project works the way it does

AI makes it cheap to build and easy to build something generic: the most probable answer, made to look
finished before it's good, then treated as disposable. This project is set up to resist that. Read
`docs/principles.md` once; `.specify/memory/constitution.md` makes it binding. In short:

1. **Point of view first.** Never invent an audience, brand, tone or visual direction. If
   `docs/point-of-view.md` or `docs/voice.md` is unwritten or silent, ask the owner. Don't guess.
2. **Build from the system.** Use registry flows and components on Base UI, tokens and the voice guide. Add to
   the system rather than working around it.
3. **Done isn't good.** Use the work in the running app, through every state, then review it adversarially.
   Report what you verified and what you didn't.
4. **Explore before converging** when there's more than one good answer, and protect the strange idea.

Every session starts with `npm run status`, which lists what's still unwritten.

## How to work in this project

### Features: Spec Kit with the craft extension

Use Spec Kit for anything bigger than a tweak. The craft extension adds the steps a codebase can't do alone,
and hooks them into the core commands:

| Step | Command | Notes |
| --- | --- | --- |
| Once per project | `/speckit-craft-point-of-view` | Interviews the owner; offered before `/speckit-constitution` |
| | `/speckit-craft-voice`, `/speckit-craft-tokens` | Copy rules; palette and type from the point of view |
| Per feature | `/speckit-specify` | Then `/speckit-craft-experience` runs automatically |
| | `/speckit-clarify` | Resolves `[NEEDS CLARIFICATION]`, including Experience gaps |
| | `/speckit-craft-explore` | Offered before planning: divergent sketches in `/lab` |
| | `/speckit-plan`, `/speckit-tasks`, `/speckit-analyze` | Constitution Check and Craft Gate apply |
| | `/speckit-implement` | Then `/speckit-craft-critique` runs automatically |

Commands are skills in `.claude/skills/`. Other agents can follow the same files: the core commands are in
`.claude/skills/speckit-*/SKILL.md` and craft's in `speckit/craft-extension/commands/`. Edit craft only in
`speckit/` and run `npm run speckit:sync`; never edit the generated copies in `.specify/` or
`.claude/skills/speckit-*`.

When interviewing the owner, follow `speckit/craft-extension/interviewing.md`: small batches, concrete options
to react to, push past generic words, and record gaps as open questions instead of filling them.

### Small changes

For tweaks, fixes and single components, use the `build-ui` skill. Same principles, shorter path.

### Where to look

Read these when the task needs them, not all up front:

| When you're…                     | Read                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| Designing or building UI or copy | `docs/point-of-view.md`, `docs/voice.md`, `docs/quality-bar.md` |
| Adding a component or flow       | `npm run ui list`, then the item's source                    |
| Changing colours, type or motion | `src/styles/_tokens.scss`, then `npm run check:contrast`     |
| Using a Next.js API              | `node_modules/next/dist/docs/`                               |
| Using or changing a Base UI part | `node_modules/@base-ui/react/docs/index.md`                  |
| Changing conventions or tooling  | `README.md`                                                  |

### Build from the system

- Start from the registry (`npm run ui add <name>`); flows come before individual components. Copied code is a
  starting point: adapt it to the point of view.
- Generate new pieces with Hygen (`npx hygen component new --name … --type …`) rather than hand-writing the
  file layout.
- Use tokens for every colour, space, type size, radius and duration. Add a token rather than a raw value;
  `npm run check:tokens` and `npm run check:contrast` enforce colours.
- Plain SCSS with BEM; the block name matches the component directory. Server components by default;
  `'use client'` only where interaction needs it.
- Build interactive components on Base UI (`@base-ui/react`). Style its parts with BEM classes and its
  `data-*` state attributes. Use plain elements only where Base UI has no equivalent, and don't add another
  component or styling library.
- Forms: use Base UI `Form` with `errors` from the Server Action, and give fields your own wording for native
  validation through `messages`.

### Done means good

A change isn't finished because it renders or the checks pass:

1. Run the app (`npm run dev`) and use the change as the user would, in every state from the spec or
   `docs/quality-bar.md`. The Next.js MCP server (`.mcp.json`) reports runtime and compilation errors.
2. Get an adversarial review: `/speckit-craft-critique` for features, the `design-editor` subagent for small
   changes. Fix what it finds.
3. `npm run check` passes.
4. Report what you verified and what you couldn't. Don't call something done when you haven't seen it.

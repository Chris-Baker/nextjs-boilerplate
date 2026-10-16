---
name: speckit-craft-explore
description: Explore deliberately divergent directions for a feature before planning, then converge with the owner
compatibility: Requires spec-kit project structure with .specify/ directory
metadata:
  author: Chris Baker
  source: craft:commands/speckit.craft.explore.md
---

# Explore

The first idea a model has is the most probable one. This command makes divergence a step: several genuinely
different directions, built cheaply enough to compare in the browser, before planning commits to one. AI
lowers the cost of making; spend some of that saving here.

## User input

```text
$ARGUMENTS
```

## Steps

1. Run `.specify/scripts/bash/check-prerequisites.sh --json --paths-only` from the repo root once and read
   `FEATURE_DIR` and `FEATURE_SPEC`. Read the spec (especially **Experience**), `docs/point-of-view.md`,
   `docs/voice.md` and `src/styles/_tokens.scss`.
2. Ask the owner for anything that should shape the exploration: references, a hunch, an idea they suspect is
   too strange. Protect the strange: if they have one, it becomes a direction.
3. Define three directions that differ in kind, not degree. Vary the structure (layout, sequence, what's
   primary), the interaction model and the character, not just colour or spacing. At least one should
   question the conventional pattern for this kind of screen. Each must still serve the moment and the point
   of view; name the trait each leans into.
4. Build each as a sketch at `src/app/lab/<feature>/<direction>/page.tsx`, using registry components and
   tokens with real copy from the spec. Sketch fidelity: enough to feel, not production code. `/lab` only
   exists in development.
5. Look at each in the running app (`npm run dev`) at mobile and desktop widths, and in both themes. Note
   what works and what doesn't in each.
6. Write `FEATURE_DIR/explorations.md`: each direction's idea, trait, screenshots or routes, strengths and
   risks. Present them to the owner and ask them to choose, combine or push one further. Iterate as long as
   it's improving; good work often takes many passes.
7. Record the decision and its reasons in the spec's **Experience → Direction**. Leave the sketches in `/lab`
   until the feature ships, then delete them.
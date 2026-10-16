---
name: speckit-craft-critique
description: Review the implemented feature as a user would, against the spec's Experience section and the quality bar
compatibility: Requires spec-kit project structure with .specify/ directory
metadata:
  author: Chris Baker
  source: craft:commands/speckit.craft.critique.md
---

# Critique

Built isn't done, and done isn't good. This is the editor's pass: experience the running feature as its user
would, judge it against what the spec promised, and push it towards fully formed. It runs automatically after
`/speckit-implement`.

## User input

```text
$ARGUMENTS
```

## Steps

1. Run `.specify/scripts/bash/check-prerequisites.sh --json --paths-only` from the repo root once and read
   `FEATURE_DIR` and `FEATURE_SPEC`. Read the spec (especially **Experience**), the plan, `docs/quality-bar.md`,
   `docs/point-of-view.md` and `docs/voice.md`.
2. If the Experience section says "No user-facing surface", check error messages and logs for clarity, report
   that, and stop.
3. Make sure the app is running (`.next/dev/lock` holds the URL of an existing dev server; otherwise start
   `npm run dev` in the background).
4. Review adversarially. If your agent supports subagents, delegate to the `design-editor` agent defined in
   `.claude/agents/design-editor.md`, passing the routes, the states listed in the spec and the Experience
   section. Otherwise follow that file's instructions yourself. Either way:
    - Use the feature in the running app, through every state in the spec and the quality bar.
    - Compare against the Experience section: the moment, the words, the detail that shows care, and the
      owner's "good enough to ship" criteria.
    - Look for the generic, and for decisions nobody made.
5. Write `FEATURE_DIR/critique.md` with the verdict and the punch list (must fix, should fix, push further),
   each with a location and a concrete fix.
6. Fix every **Must fix** item and the **Should fix** items that don't need a product decision; list the rest
   as questions for the owner (the editor named in the point of view). Re-check what you changed in the
   running app, and review again after substantial changes.
7. Finish with `npm run check` and a short report: what changed, what you verified in the running app, what
   you couldn't verify, and what's still open. Don't call the feature done until the owner agrees it's good.
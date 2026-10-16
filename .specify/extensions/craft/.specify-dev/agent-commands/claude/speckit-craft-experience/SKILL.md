---
name: speckit-craft-experience
description: Interview for the feature's experience and complete the Experience section of its spec
compatibility: Requires spec-kit project structure with .specify/ directory
metadata:
  author: Chris Baker
  source: craft:commands/speckit.craft.experience.md
---

# Experience

`/speckit-specify` captures what a feature must do. This command captures what it must be like: who is in
front of it and in what situation, the states they'll hit, the words they'll read, and the detail that
shows someone thought of them. Better inputs are the strongest defence against generic output.

## User input

```text
$ARGUMENTS
```

## Steps

1. Run `.specify/scripts/bash/check-prerequisites.sh --json --paths-only` from the repo root once (PowerShell:
   `.specify/scripts/powershell/check-prerequisites.ps1 -Json -PathsOnly`) and read `FEATURE_SPEC`.
2. Read the spec, `docs/point-of-view.md`, `docs/voice.md` and `.specify/extensions/craft/interviewing.md`.
    - If the point of view still says "not yet written", tell the owner that design decisions for this
      feature will be guesses, and offer `/speckit-craft-point-of-view` first. Continue only if they choose to.
    - If the feature has no surface a person sees, hears or reads (including emails, notifications, CLI output
      and API error messages), write "No user-facing surface" in the Experience section and stop.
3. Fill what the spec, point of view and voice already answer. Then interview for the rest, a few questions
   at a time:
    1. **Moment.** Who arrives here, from where, on what device, in what frame of mind? What did they just do,
       and what will they do next?
    2. **Unsaid needs.** What worry or shortcut is behind the request? What would make them trust it?
    3. **States.** Walk each: first use and empty, loading and slow, partial, error and recovery, success,
       too much content, no permission, offline. Ask what the person should feel and do in each.
    4. **Words.** The key labels, the main call to action, the error and empty-state copy. Draft them in the
       project's voice and ask the owner to correct them.
    5. **The detail.** One unexpected touch that shows this feature anticipated its user. Offer two or three
       ideas grounded in the moment, and ask for theirs.
    6. **Good enough to ship.** What would the owner need to see in the running app to call it good, not just
       done?
4. Write the answers into the spec's **Experience** section (add it from the craft preset's structure if the
   spec predates the preset). Mark anything unresolved `[NEEDS CLARIFICATION: …]` so `/speckit-clarify` and
   `/speckit-analyze` pick it up. Don't remove or rewrite other sections.
5. Show the section, revise, and save. Suggest `/speckit-craft-explore` when the feature has room for more
   than one good direction, otherwise `/speckit-plan`.
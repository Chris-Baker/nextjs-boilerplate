---
description: "Interview the project owner for the product's point of view and write docs/point-of-view.md"
---

# Point of view

Without a point of view, models supply the most probable one: generic and backward-looking. This command
interviews the project owner and writes `docs/point-of-view.md`, the document every design decision in this
project starts from.

## User input

```text
$ARGUMENTS
```

Treat any input as context to start from (a product description, links, existing material).

## Steps

1. Read `docs/principles.md` (why this matters), `.specify/extensions/craft/interviewing.md` (how to ask) and
   the current `docs/point-of-view.md`. If it's already written, ask whether to refine particular sections or
   start again, and keep what's still true.
2. Read what the project already says about itself: `README.md`, `.specify/memory/constitution.md`, any
   `specs/`, and source material the owner points to. Don't ask what you can already see.
3. Interview in this order, a few questions at a time:
    1. **Who it's for.** A specific person in a specific situation: where they are, what they're trying to
       get done, what's at stake for them.
    2. **What they need but won't say.** What has the owner noticed users doing, avoiding or worrying about?
    3. **Who the product wants to be to them.** Three or four traits. For each: what it means in practice,
       and what it doesn't mean. Offer contrasting pairs to react to.
    4. **What good looks like.** Products, objects, places or work from other fields that set the bar, and
       what exactly each gets right.
    5. **What it refuses to make.** Generic patterns, tones or shortcuts it rejects.
    6. **Details that show care.** Small, specific touches already planned or imagined.
    7. **Who decides.** Who is the editor: the person accountable for the whole, who says no and settles
       trade-offs between features. How should agents reach them?
4. Draft the file using the existing section structure. Fill **How that shows up** only where the owner gave
   real answers; anything else goes to **Open questions**. Show the draft and revise.
5. Save it. Remove the `**Status: not yet written.**` line only when the file reflects real decisions.
6. Recommend next steps: `/speckit-craft-voice` for copy, `/speckit-craft-tokens` for the visual system,
   and `/speckit-constitution` so the project's constitution reflects this point of view.

Don't invent answers, and don't soften refusals into neutral statements.

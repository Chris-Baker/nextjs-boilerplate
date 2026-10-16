---
name: speckit-craft-voice
description: Interview the project owner for the product's voice and write docs/voice.md
compatibility: Requires spec-kit project structure with .specify/ directory
metadata:
  author: Chris Baker
  source: craft:commands/speckit.craft.voice.md
---

# Voice

Copy is where generic AI output shows first: "Unlock the power of…", "Oops! Something went wrong",
"Seamless". This command interviews the owner and writes `docs/voice.md`, which agents follow whenever they
write words users will read.

## User input

```text
$ARGUMENTS
```

## Steps

1. Read `docs/point-of-view.md`. If it still says "not yet written", recommend `/speckit-craft-point-of-view`
   first; continue only if the owner wants to.
2. Read `.specify/extensions/craft/interviewing.md` and the current `docs/voice.md`.
3. Collect evidence before opinions. Ask for existing copy they're proud of and copy they hate, from their
   product or others, plus anything customers have written in their own words.
4. Interview, a few questions at a time:
    1. How the traits in the point of view sound. Offer the same sentence written three ways and ask which
       is closest and why.
    2. Vocabulary: words they use and words they never use. The terms for their core objects (is it a
       "booking", "reservation" or "table"?).
    3. Mechanics: sentence case or title case, contractions, "you" and "we", numbers, dates, emoji.
    4. Hard moments: errors, empty states, destructive confirmations, waiting, success. Ask them to write
       or approve one real example of each.
5. Draft `docs/voice.md` in its existing structure, with real before/after examples. Unknowns go to
   **Open questions**. Show the draft and revise.
6. Save it and remove the status line only when it reflects real decisions.
## Experience Plan

<!-- How the spec's Experience section will be built from this project's system. -->

**Direction**: [From the spec's Experience → Direction]

**Registry items**: [Flows and components from `npm run ui list`, e.g. settings-flow, field, dialog. New components only where none fits, with the reason]

**Tokens**: [Existing tokens used; any new tokens and why]

**States → implementation**: [For each state in the spec: which component or code path renders it]

**Copy source**: [Where final strings live; confirm they follow docs/voice.md]

**Verification**: [Routes and states to walk in the running app, viewports, themes, keyboard and screen reader checks]

### Craft Gate

_GATE: Must pass before implementation. Re-check after design._

- [ ] `docs/point-of-view.md` is written, or the owner has accepted that design choices are provisional
- [ ] The spec's Experience section has no unresolved `[NEEDS CLARIFICATION]` markers
- [ ] Every state in the spec has an owner in **States → implementation**
- [ ] Interactive parts use registry items on Base UI; no new component or styling library
- [ ] All colour, space, type and motion values come from tokens

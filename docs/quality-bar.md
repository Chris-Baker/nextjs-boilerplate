# Quality bar

AI makes things look finished fast. Built is not done, and done is not good. Users don't care how something
was made, only whether it's good, so work made with AI meets the same bar as anything else. Go one level
deeper than a user would notice; they'll still feel it.

Review the change as a user, end to end, in the running app. Don't review it from the diff alone. In a Spec
Kit feature, also hold it to the spec's **Experience** section. `docs/principles.md` explains the reasoning.

## Does it solve the problem?

- [ ] The primary task completes without explanation, for the person described in `docs/point-of-view.md`.
- [ ] It fits the way that person thinks about the task: their words, their order, their context.
- [ ] It's coherent with the rest of the journey: what comes before and after, not just this screen.

## Is it fully formed?

- [ ] Every state is designed: empty, loading, partial, error, success, offline or slow, and too much content.
- [ ] Errors say what happened and how to recover, and never lose what the user entered.
- [ ] Copy is specific. No placeholder, filler or generic marketing language.
- [ ] Long names, translated text, 320px wide and 200% zoom don't break the layout.

## Does it work for everyone?

- [ ] Keyboard only: logical order, visible focus, no traps, Escape closes what opened.
- [ ] Screen reader: names, roles, states and announcements for changes that happen without a page load.
- [ ] Light, dark and system themes; `prefers-reduced-motion`; contrast at least WCAG 2.2 AA
      (`npm run check:contrast` covers the tokens; check images and custom combinations by eye).

## Is it ours?

- [ ] Colours, spacing, type and motion come from `src/styles/_tokens.scss`.
- [ ] Copy follows `docs/voice.md`.
- [ ] If you swapped in a competitor's logo, it should feel wrong. If it wouldn't, it's generic.
- [ ] At least one detail shows we anticipated this user's situation.
- [ ] Every visible decision was made on purpose. If the cup is green, someone can say why it isn't blue.

## Will it last?

- [ ] Someone else can maintain it: clear names, no dead code, components reused rather than forked.
- [ ] `npm run check` passes.

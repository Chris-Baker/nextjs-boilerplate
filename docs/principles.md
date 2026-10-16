# Principles

Why this project is set up the way it is, and the rules that follow. Read this once before building anything
users will see. The tooling (skills, checks, registry) exists to make these rules the easy path.

Adapted from a talk on design in the AI building boom, given by a design leader at Stripe.

## The risk: zombie UI

After the Second World War, builders copied modernism without the intent behind it. The thinking thinned
until only generic patterns were left, put up everywhere regardless of context. Banks that once signalled
trust became interchangeable boxes. Nothing differentiated one building from another; nothing said "this was
made for you".

AI is a building boom too. Teams of three now do the work of thirty. The same thing can happen to software:
interfaces that are monotonous, vacant or uncared for. Three tendencies push that way.

1. **Models give the most probable answer.** They're good at what has been popular and what has worked,
   and weak at what's specific to this brand, these users and their context. Ask for "a website for a Korean
   barbecue restaurant" and you get something that could be selling software.
2. **The temptation of done.** AI makes things look finished almost instantly: rounded corners, drop
   shadows, plausible copy. Like a microwave burrito, the speed makes us overlook serious flaws. Looking
   polished isn't the same as solving the problem or standing apart.
3. **Disposability.** Work that's quick to make gets treated as throwaway. Nobody asks who'll maintain it or
   whether it fits the whole.

What people want instead is software that feels cared for: personality where it fits (a small animation that
brings a bot to life), details that show someone thought of them (today's date in the calendar icon), and
anticipation of their context (troubleshooting built in where things usually go wrong).

## 1. Have a point of view

If you don't have one, AI will supply one, and it'll be generic and backward-looking. Define who you are to
your users, what they care about and who you want to be to them. That's the basis of your standards.

It matters more now because building is distributed and ownership is diffuse: more people, and more agents,
contribute to the product than ever. Shared traits have to show up in every detail, from colours to copy to
what you choose to build. The quality bar doesn't change because AI made something: users don't care how
it was made, only whether it's good. Aim one level deeper than a user would consciously notice; they'll feel
it anyway.

A point of view comes from noticing: what users need, not just what they say; what in the world reads as
great, good or meh; what other fields (art, science, places, objects) do well.

**In this repo:**

- `docs/point-of-view.md` holds it. The `/point-of-view` skill interviews the project owner to write it.
- Agents never invent an audience, brand or tone. If the file is unwritten or silent on something, they ask.
- `npm run status` and the session-start hook report what's still unwritten.

## 2. Encode your standards into the machine

Designers won't be in the room for most decisions any more. Interfaces get built without them, agents fix
problems overnight, and UI is generated in real time. In the past nobody wrote everything down because a
designer filled the gaps. Now decisions have to be explicit. The object of design is no longer the screen;
it's the system.

Gutenberg didn't cast 26 letters in two cases. He cast around 290 characters (widths, abbreviations,
ligatures) so justified text wouldn't develop rivers of white space. His system was extensible and
opinionated enough that machine-made pages felt handmade. The old design system scaled consistency; the new
one has to scale intent.

Documentation alone isn't enough. Three people with the same prompt and a docs lookup get three different
results. What works is a harness where builders actually build: one that supplies the right guidance at the
right moment (to avoid context rot) and offers whole templates and flows, not just parts.

**In this repo:**

- Tokens in `src/styles/_tokens.scss` turn the point of view into values; `/brand-tokens` derives them with the
  owner. `check:tokens` and `check:contrast` enforce them.
- The registry (`npm run ui`) ships flows as well as components, and each item says when to use it.
- `AGENTS.md` routes agents to the right document for the task, rather than loading everything up front.
- `docs/voice.md` holds the copy rules; `/voice` writes it.

## 3. Refuse to confuse done with good

A system can satisfy every rule and still be dead (Christopher Alexander). The filters that used to run
through the whole process (only one of twenty ideas gets staffed, then gets poked and pruned) are gone: we
can build all twenty in a week. Filtering now happens after the build, when it's much harder to say no. That
needs an editor: someone accountable for the whole, and for every decision, which is often every pixel.

The editor's most important habit is to experience the work as a user would. Does it solve the problem? Does
it match how the user thinks? Is it coherent across the journey, not just good in isolation? And not only
yes or no: is it fully formed, and how could it be pushed to completion?

What makes work great is the unexpected detail ("I can't believe they thought of that"), the deeper meaning
behind the surface, and themes that tie it into a whole (Nabeel Qureshi). AI is weakest at exactly these.
What offends people about slop is the sense that the details don't matter: the cup is green, but it could
just as well have been blue.

Iterate. An opening animation for one event took 56 versions; each was close, the last one had life.

**In this repo:**

- `/brief` captures the problem, the user, their context and what "good" means before anything is built.
- `docs/quality-bar.md` is the editor's checklist, the same for everything however it was made.
- The `design-editor` subagent and `/critique` review the running app adversarially. Nothing is called
  done from a diff alone.
- Agents report what they verified in the running app and what they couldn't.
- Name a human editor in `docs/point-of-view.md`. Agents surface trade-offs to that person rather than
  settling them silently.

## 4. Unleash creativity

AI can manufacture monotony, but it's also the greatest creative catalyst we've had. When everyone can
build, differentiation gets harder and matters more. Chats, charts and CLIs aren't the peak of interaction
design. New interfaces and aesthetics are possible, as they were with multi-touch and the synthesiser, and
the best practices haven't been written yet.

To make AI a better creative partner:

- **Improve the inputs.** Be specific about the brand, what you believe and what good looks like. Bring
  source material. Push the model to think differently.
- **Stress the outputs.** Don't stop at the burrito. Push one step further, and use adversarial agents to
  critique the work, but keep pushing yourself.
- **Protect the strange.** Cookie-cutter patterns are safe and cosy. Finding something unique that improves
  on the status quo is harder and worth more. AI lowers the cost of making; spend some of the saving on
  making something special. Use AI to raise the ceiling, not just the floor.

**In this repo:**

- `/explore` produces deliberately divergent directions before converging, in the dev-only `/lab` route.
- Registry items are neutral starting points. Copy them, then make them yours.

## Gothic, not post-war

John Ruskin held up Gothic architecture as the model of craft: no two buildings alike, no two columns alike,
each detail showing the hand and mind of its maker. That's what users respond to. They aren't impressed that
something was animated in thirty minutes; they're impressed when their problem is solved and the details
show it was anticipated, with a brand that has character. Be intentional: your point of view, your system,
your quality bar and your ambition.

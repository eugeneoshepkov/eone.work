---
title: Design Systems Are Just Good Constraints
description: Design systems work when constraints do the heavy lifting: tokens, scales, and patterns that make UI cohesive.
date: 2024-11-05
tags: [Design, Engineering]
featured: false
---

At TourRadar I inherited a dashboard where "success" was green in one component, blue in another, and purple in a third. Every engineer had a reason. Blue matched the brand. Green was obviously success. Purple because blue was already doing links.

All three were defensible. The result was that the color meant nothing at all.

We spent a sprint consolidating, which is a sprint nobody enjoys and nobody gets credit for. That's the bill that arrives when constraints aren't set upfront.

## The components aren't the system

Most "design systems" are component libraries. A Button. A Modal. A Dropdown. Ship to npm, call it a day. Six months later you have four buttons and an argument.

What actually makes a UI feel like one product is the layer underneath: the spacing scale, the color relationships, the type hierarchy, the interaction patterns. Get those right and the components mostly design themselves, because at any decision point there are only two or three legal answers.

## Tokens before components

Before writing any React, define the tokens:

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  --fg: #0a0a0a;
  --fg-muted: #737373;
  --bg: #fafafa;
  --accent: #f97316;

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
}
```

The interesting part is what's missing. No `--blue-500`, because naming a token after its current value guarantees you rename it the first time the brand shifts. No `--spacing-17`, because the gaps in the scale are what create rhythm; if every value exists, no value is a decision. No `--border-radius-xl-2`, because at that point you've built a configuration language, not a system.

I learned this from music before I learned it from UI, and I'm slightly embarrassed by how long it took to transfer. At 15 I'd spend entire evenings noodling on guitar and finish nothing. Everything was possible, so nothing got done. What broke the pattern was arbitrary rules: four chords, two hours, bridge pickup only. I started finishing songs almost immediately. Not because the rules made the songs better - because they killed the part of the process where I sat there evaluating options.

Tokens do that for interfaces. Eight spacing values and five colors means you stop debating and start building. The taste is baked into the defaults, so it doesn't have to be relitigated in every PR.

## The 4px grid

Every spacing value a multiple of 4: 4, 8, 12, 16, 24, 32, 48, 64.

Things align. Spacing looks intentional rather than accidental. And once designers and engineers both think in 4px increments, the conversation changes shape - "can we add a bit more space here" becomes "should this be 16 or 24," which is a question with an answer.

That last part mattered more than the visual consistency, honestly. Design review stopped being a negotiation.

## Symmetrical padding matters more than you'd think

This looks wrong:

```css
padding: 24px 16px 12px 16px;
```

This looks right:

```css
padding: 16px;
```

When the four sides don't relate to each other, cards look subtly off-balance. Users can't articulate it and will never file a bug about it. They just find the product slightly cheaper-feeling.

If you need different horizontal and vertical padding, make it deliberate - `padding: 12px 16px` - rather than `padding: 13px 17px 11px 18px`, which is what happens when someone nudges values until it looks okay on their monitor.

## Color is for meaning

In a system that works, color carries information: red for danger, green for success, yellow for warning, accent for "you can click this," gray for everything else.

Once you're past a handful of semantic colors, none of them communicate anything. The dashboard I mentioned at the top wasn't ugly. It was just mute.

## Typography hierarchy, not typography variety

One font family, maybe two if you need mono. Four or five size stops. Two or three weights.

```css
--text-xs: 12px;
--text-sm: 14px;
--text-md: 16px;
--text-lg: 18px;
--text-xl: 24px;
```

When I open a system with twelve font sizes and six weights, I know the decisions were deferred to individual components. Which means they were made twelve different times by twelve different people, none of whom were wrong.

## Build for composition, not configuration

Bad API:

```jsx
<Button
  variant="primary"
  size="large"
  iconLeft="check"
  iconRight="arrow"
  loading={false}
  disabled={false}
  fullWidth={true}
  rounded="medium"
  elevation="high"
  textTransform="uppercase"
/>
```

Better:

```jsx
<Button>
  <CheckIcon />
  Submit
  <ArrowIcon />
</Button>
```

Ten props with three options each is 59,049 combinations. You will test maybe eight of them. The other 59,041 are undefined behavior you've committed to supporting.

## Documentation nobody reads

Nobody browses a design system documentation site. They search for a component, skim one example, copy it, and leave.

So the documentation that works is the documentation that's in the way: Storybook with real variants, copy-paste examples sitting next to the component, snippets pulled from actual production code. What gets ignored is the separate portal with prose about usage guidelines and philosophical principles that aren't enforceable by a linter.

Engineers want to see code. Show them code.

## When to break it

A design system is a tool, not a religion. Marketing pages need expressive design that the system will fight. Special features sometimes warrant custom components. Experiments should be allowed to move fast and be ugly.

The system should make the common case trivial without making the unusual case impossible. If people are routinely working around it, that's information about the system, not about the people.

## Systems that grow vs. systems that rot

I've watched a system balloon from a few dozen components to several hundred over about three years. Most of the additions were variants somebody requested once, edge cases that never recurred, or abandoned experiments nobody deleted. By the end, a decent chunk of the library had no production usage at all.

New hires had to wade through the graveyard to find the real components. The thing built to speed people up had become the thing slowing them down.

Healthy systems keep a small core under tight control, allow extension through composition, update based on what people actually use, and - this is the one everybody skips - delete things.

## The goal is consistency, not control

Systems succeed when they make the right thing easy and fail when they make everything hard. If engineers are constantly fighting the system, working around it, or quietly avoiding it, the system has failed. Not the engineers.

These days I start with tokens and two or three primitives and let real usage decide what earns the right to become a component. The smallest system that works seems to stay healthy the longest, though I'll admit I've never run one long enough to be sure that's causation rather than just having less surface area to rot.

---
title: Design Systems Are Just Good Constraints
description: Design systems work when constraints do the heavy lifting: tokens, scales, and patterns that make UI cohesive.
date: 2024-11-05
tags: [Design, Engineering]
featured: false
---

I've built or contributed to design systems at every company I've worked at. At ImmoScout24, the system felt like a superpower — we could ship new listing page variants in hours instead of days. At an earlier startup, the system turned into a parts bin nobody trusted. Same idea, opposite outcomes.

The pattern was consistent: the ones that worked had tight constraints. The ones that rotted had too many options.

## The components aren't the system

Most "design systems" are just component libraries. A Button. A Modal. A Dropdown. Ship to npm, call it a day.

That's not a system. That's a parts bin.

A real design system is the constraints that make those components feel cohesive:
- The spacing scale
- The color relationships
- The typography hierarchy
- The interaction patterns

Get the constraints right, and components almost design themselves.

## Tokens before components

Before writing any React components, define your tokens:

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

Notice what's NOT here:
- No `--blue-500` (too literal)
- No `--spacing-17` (gaps in scale create rhythm)
- No `--border-radius-xl-2` (too many options)

Constraints are features.

This clicked for me in music first. When I was learning guitar at 15, I'd spend hours noodling without finishing anything. Then I started setting arbitrary limits: four chords only, finish in two hours, use only the bridge pickup. Suddenly I was completing songs. The constraints killed decision paralysis.

Tokens and scales do the same thing for UI. They turn taste into defaults. When you only have 8 spacing values and 5 colors, you stop debating and start building.

## The 4px grid is non-negotiable

Every spacing value should be a multiple of 4:
- 4, 8, 12, 16, 24, 32, 48, 64

Why? Because it creates visual rhythm. Things align. Spacing feels intentional, not random.

When designers and engineers both think in 4px increments, communication gets easier. "Can we add a bit more space?" becomes "Should this be 16 or 24?"

At ImmoScout24, adopting a strict 4px grid across the Exposé pages cut our design review time in half. Fewer arguments about "a little more padding here."

## Symmetrical padding matters more than you think

This looks wrong:
```css
padding: 24px 16px 12px 16px;
```

This looks right:
```css
padding: 16px;
```

When top/bottom/left/right don't match, cards look unbalanced. Users can't articulate why, but they feel it.

If you need different horizontal and vertical padding, make it intentional:
```css
padding: 12px 16px;
```

Not:
```css
padding: 13px 17px 11px 18px;
```

## Color is for meaning, not decoration

In a good system, color communicates:
- Red = error/danger
- Green = success
- Yellow = warning
- Accent = interactive/actionable
- Everything else = gray

If your UI has 47 colors, none of them mean anything.

At TourRadar, I inherited a dashboard where "success" could be green, blue, or purple depending on who built that component. One engineer used blue for positive metrics because it matched the brand. Another used green because it was "obviously" success. A third used purple because blue was already taken for links. Users had no idea what any of it meant.

We spent a full sprint just consolidating colors. That's the tax you pay when constraints aren't set upfront.

## Typography hierarchy, not typography variety

You need:
- One font family (maybe two if you need monospace)
- 4-5 size stops
- 2-3 weights

That's it.

```css
--text-xl: 24px;
--text-lg: 18px;
--text-md: 16px;
--text-base: 14px;
--text-sm: 12px;
```

When I see systems with 12 font sizes and 6 weights, I know decisions are being deferred to individual components. That's how inconsistency creeps in.

It's like a band where everyone picks their own reverb settings. The parts might sound good in isolation, but the mix is a mess.

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

Better API:
```jsx
<Button>
  <CheckIcon />
  Submit
  <ArrowIcon />
</Button>
```

Components should be small and composable. Configuration props lead to combinatorial explosion — 10 props with 3 options each = 59,049 variants to test.

## The best documentation is colocated examples

Most people don't browse design system documentation sites. They search for a component, skim an example, copy it, and move on.

What works:
- Storybook with real variants
- Copy-paste examples next to the component
- Examples pulled from the actual codebase

What tends to get ignored:
- Separate documentation portals
- Long prose about "usage guidelines"
- Philosophical principles without enforceable defaults

Engineers want to see code. Show them code.

## When to break the system

A design system is a tool, not a religion. Sometimes the right choice is to break the rules:

- Marketing pages often need more expressive design
- Special features might warrant custom components
- Experiments should be able to move fast

The system should make the 80% case trivial, not make the 20% case impossible.

## Systems that grow vs. systems that rot

At one company (I'll spare them the name), I watched a design system grow from 40 components to 400+ over three years. By the end, only about 50 were actually used in production. The rest were variants somebody asked for once, edge cases that never recurred, or abandoned experiments nobody deleted.

Every new hire had to wade through the graveyard to find the real components. The system had become the thing slowing people down.

Healthy systems:
- Have a small core that's tightly controlled
- Allow extension through composition
- Get updated based on real usage patterns
- Remove things that aren't used

Unhealthy systems:
- Add variants for every request
- Never deprecate anything
- Become "too big to refactor"

If you never delete from your design system, it's already rotting.

## The goal is consistency, not control

Design systems succeed when they make the right thing easy. They fail when they make everything hard.

If engineers are constantly fighting the system, working around it, or avoiding it entirely — the system has failed. Not the engineers.

Build systems that feel like help, not handcuffs.

---

These days I start with tokens and a couple primitives, then let real usage dictate what becomes a component. The smallest system that works tends to stay healthy the longest.

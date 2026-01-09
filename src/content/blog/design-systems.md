---
title: Design Systems Are Just Good Constraints
description: Design systems work when constraints do the heavy lifting: tokens, scales, and patterns that make UI cohesive.
date: 2024-11-05
tags: [Design, Engineering]
featured: false
---

I've built or contributed to design systems at every company I've worked at. One felt like a superpower. Another turned into a parts bin nobody trusted. The pattern was consistent.

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
  /* Spacing - 4px grid, limited set */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Colors - semantic, not descriptive */
  --fg: #0a0a0a;
  --fg-muted: #737373;
  --bg: #fafafa;
  --accent: #f97316;

  /* Radius - consistent, limited */
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

This clicked for me in music first. When I was teaching myself, the fastest progress came from arbitrary limits (four chords, five synth patches, “finish in two hours”). Tokens and scales do the same thing for UI: they turn taste into defaults.

## The 4px grid is non-negotiable

Every spacing value should be a multiple of 4:
- 4, 8, 12, 16, 24, 32, 48, 64

Why? Because it creates visual rhythm. Things align. Spacing feels intentional, not random.

When designers and engineers both think in 4px increments, communication gets easier. "Can we add a bit more space?" becomes "Should this be 16 or 24?"

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
padding: 12px 16px; /* Slightly more horizontal room */
```

Not:
```css
padding: 13px 17px 11px 18px; /* What is happening */
```

## Color is for meaning, not decoration

In a good system, color communicates:
- Red = error/danger
- Green = success
- Yellow = warning
- Accent = interactive/actionable
- Everything else = gray

If your UI has 47 colors, none of them mean anything. Users can't build mental models of what colors indicate.

I've seen dashboards where success could be green, blue, or purple depending on who built that component. Chaotic.

## Typography hierarchy, not typography variety

You need:
- One font family (maybe two if you need monospace)
- 4-5 size stops
- 2-3 weights

That's it.

```css
/* Headlines */
--text-xl: 24px;
--text-lg: 18px;

/* Body */
--text-md: 16px;
--text-base: 14px;

/* Small */
--text-sm: 12px;
```

When I see systems with 12 font sizes and 6 weights, I know decisions are being deferred to individual components. That's how inconsistency creeps in.

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

Healthy systems:
- Have a small core that's tightly controlled
- Allow extension through composition
- Get updated based on real usage patterns
- Remove things that aren't used

Unhealthy systems:
- Add variants for every request
- Never deprecate anything
- Have components nobody uses
- Become "too big to refactor"

I've seen 3-year-old design systems with 400+ components where only 50 are actually used. The rest are tech debt.

## The goal is consistency, not control

Design systems succeed when they make the right thing easy. They fail when they make everything hard.

If engineers are constantly fighting the system, working around it, or avoiding it entirely — the system has failed. Not the engineers.

Build systems that feel like help, not handcuffs.

---

These days I start with tokens and a couple primitives, then let real usage dictate what becomes a component. The smallest system that works tends to stay healthy the longest.

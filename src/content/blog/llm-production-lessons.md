---
title: What I Learned Shipping LLM Features to Production
description: The unglamorous parts of shipping LLM features: demo vs prod, prompts-as-code, latency, fallbacks, and when not to use AI.
date: 2025-06-10
tags: [AI, Engineering]
featured: false
---

I spent the last year building Text-to-SQL features at one company. The pitch was simple: let business users ask questions in plain English and get charts. The demo took a week. Getting it production-ready took months.

Here's what actually matters when an LLM feature has to behave like a product, not a party trick.

## The demo → production gap is enormous

Demo: "Show me revenue by month"
→ Works perfectly, stakeholders clap, budget approved

Production:
- "can u show rev monthly?" — typos, abbreviations
- "Show me the thing we looked at yesterday" — context you don't have
- "Revenue but only for products we still sell" — business logic the model doesn't know
- "更多收入数据" — users who don't speak English

This is exactly like music production. A mix can sound massive in your studio headphones and completely collapse on a cheap Bluetooth speaker or a club PA. The controlled environment lies to you. Demos are headphones. Production is the venue with bad acoustics and a crowd that doesn't care how hard you worked on the hi-hats.

The first week after launch, 40% of queries were things we'd never tested. Abbreviations we didn't anticipate. Metric names that existed in users' heads but not in our schema. Questions that assumed context from a meeting we weren't in.

Every edge case in demos becomes the common case in production. Plan for it.

## Prompt engineering is software engineering

Early on, I treated prompts as magic strings. That doesn't scale.

One Friday afternoon, I tweaked a prompt to fix an edge case. Monday morning, three dashboards were broken because I'd accidentally changed how date ranges were interpreted. No tests. No review. Just vibes-based prompt editing.

Now I treat prompts like code:

```typescript
const buildAnalyticsPrompt = ({
  schema,
  userQuery,
  previousContext,
  businessRules
}: PromptParams) => `
You are an analytics assistant for ${schema.companyName}.

Available tables:
${formatSchema(schema)}

Business rules:
${businessRules.map(r => `- ${r}`).join('\n')}

Previous context:
${previousContext || 'None'}

User request: ${userQuery}

Generate a SQL query that...
`;
```

Prompts should be:
- Parameterized
- Version controlled
- Tested
- Reviewed like any other code
- Observable (logged with version, model, and inputs)

We built a prompt testing framework that runs the same 200 queries against every prompt change. Boring, but it catches regressions before users do.

## Fallbacks are not optional

LLMs fail. Not sometimes — regularly. You need:

1. **Input validation** — Catch obviously bad queries before wasting API calls
2. **Timeout handling** — Set aggressive timeouts, have fallbacks
3. **Confidence scoring** — If the model isn't sure, don't pretend it is
4. **Graceful degradation** — Show a helpful error, not a stack trace
5. **Human escalation** — Let users report issues, actually read the reports
6. **Telemetry + replay** — Capture inputs/outputs so you can debug and build evaluation datasets

Our error rate dropped 60% when we added a simple "I'm not sure I understood that. Did you mean X, Y, or Z?" response for low-confidence outputs. Users preferred being asked to clarify over getting a wrong chart.

## Latency is a feature

GPT-4 is smarter than GPT-3.5-turbo. It's also 5x slower. For many use cases, speed matters more than marginal intelligence improvement.

We run a two-tier system:
- Fast model for simple queries (70% of traffic)
- Smart model for complex ones (30% of traffic)
- A small classifier decides which tier to use

Average latency dropped from 4s to 1.2s. User satisfaction went up more than when we improved accuracy. People will tolerate a slightly dumber answer if it's instant. They won't tolerate a perfect answer that takes 8 seconds.

It's like the difference between a live show and a studio recording. Live, you can't spend 20 minutes getting the perfect take. You play what you can play in real time, and the energy matters more than perfection.

## Context windows are for data, not instructions

With 128k context windows, it's tempting to dump everything in. Don't.

We tried the "give it everything" approach early on. Full schema. All business rules. Last 10 conversations. Documentation excerpts. Response quality actually got worse — the model started hallucinating connections between unrelated tables, probably because we'd given it too many options.

**Bad pattern:**
```
Here are all our tables, all columns, all business rules,
all previous conversations, all documentation...
```

**Better pattern:**
```
Here are the 3 tables relevant to this query, their key columns,
and 2 business rules that apply.
```

Focused context = better outputs + faster responses + lower costs.

## Users don't want AI, they want answers

This sounds obvious but it's easy to forget. Nobody cares that you're using GPT-4o. They care whether they can get their revenue report without bothering an analyst.

We removed all mentions of "AI" from the UI. It's just a search box now. No "AI-powered!" badges. No "Generated by AI" disclaimers on every output.

Users trust it more because we don't draw attention to the technology. The moment you slap an AI badge on something, users start looking for flaws.

## Measure what matters

We tracked:
- Query success rate
- Result accuracy (sampled and human-verified weekly)
- User satisfaction (thumbs up/down on results)
- Time to insight
- Retry rate (users rephrasing the same question)

We didn't track:
- How "impressive" the AI responses sounded
- How many features used AI
- Lines of prompt code

The first list tells you if you're solving user problems. The second is vanity metrics that make investors happy but don't correlate with user value.

## Know when to not use AI

Some things don't need LLMs:
- Queries that map directly to a known template → use the template
- Ambiguous requests that need clarification → just ask the user
- High-stakes decisions → require human confirmation
- Anything with existing reliable solutions → don't over-engineer

We added AI to 6 features. We removed it from 2 after realizing simpler approaches worked better. One was a date range parser — turns out a handful of regex patterns handled 95% of cases faster and more reliably than an LLM call.

## The tech is moving faster than you can ship

Every quarter, better models come out. Prompts that worked perfectly break. Costs change. New capabilities emerge.

We had prompts tuned for GPT-4 that completely failed when we tested Claude. Different models have different quirks. You can't just swap providers like switching cloud regions.

Design for change:
- Abstract the LLM provider
- Make prompts configurable without deploy
- Build evaluation suites you can run against new models
- Don't bet everything on one provider's specific features

## It's worth it

Despite all the challenges, the Text-to-SQL feature became our most-used analytics tool. Users who never touched SQL now build their own dashboards. Product managers stopped waiting for analyst bandwidth. The VP of Sales makes his own pipeline reports.

That's the point. The technology is imperfect, but it unlocks capabilities that weren't possible before. That's why we deal with the complexity.

---

More on my LLM work: [Text-to-SQL project](/projects/text-to-sql)

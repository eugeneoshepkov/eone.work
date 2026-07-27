---
title: What I Learned Shipping LLM Features to Production
description: The unglamorous parts of shipping LLM features: demo vs prod, prompts-as-code, latency, fallbacks, and when not to use AI.
date: 2025-06-10
tags: [AI, Engineering]
featured: false
---

The week we launched Text-to-SQL, someone typed "can u show rev monthly?" into the box and got nothing back.

We had tested "Show me revenue by month" approximately four hundred times. We had not tested the version a real person types with one hand while on a call. That first week was full of these: abbreviations we hadn't anticipated, metric names that existed in people's heads but not in our schema, questions that assumed context from a meeting we weren't in, and a handful of queries in languages the product didn't officially support.

The demo had taken about a week to build. Making it behave like a product took months, and almost none of those months were about the model.

## The demo to production gap

Demo conditions are a controlled environment and controlled environments lie to you. This is the same failure mode as mixing a track on studio headphones: it sounds enormous, you're thrilled, and then it collapses on a cheap Bluetooth speaker because you spent four hours on the low end in a room where you could actually hear the low end.

A large share of what hit us in that first week was stuff we'd never tested. Not exotic stuff, either. Just the ordinary variance of people who don't know or care what your parser expects.

Every edge case in a demo becomes a common case in production. That's not a cute aphorism, it's a budgeting instruction: assume the long tail is most of your work.

## Prompt engineering is software engineering

For a while I treated prompts as magic strings, which worked until one Friday afternoon when I tweaked a prompt to fix an edge case and broke how date ranges were interpreted across several dashboards. I found out Monday. No tests, no review, just vibes.

Now prompts get built like anything else:

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

Parameterized, version controlled, tested, reviewed, and logged with the model and inputs that produced each output. We ended up with a regression suite that runs a fixed set of queries against every prompt change. It is deeply boring and it has caught things before users did, which is the entire job.

## Fallbacks are not optional

LLMs fail regularly, not occasionally, and the difference between a feature people trust and one they abandon is almost entirely in what happens on failure. You need input validation so obviously bad queries don't cost an API call, aggressive timeouts, some notion of confidence, graceful degradation that shows a human-readable error rather than a stack trace, a path for users to report problems that someone actually reads, and enough telemetry to replay a bad interaction later.

The single highest-leverage thing we shipped was the least clever: when confidence was low, instead of guessing, the product said "I'm not sure I understood that - did you mean X, Y, or Z?"

Users overwhelmingly preferred being asked over being handed a confidently wrong chart. I think about that more than anything else on this list. The instinct is always to make the system seem capable. The thing that built trust was letting it seem uncertain.

## Latency is a feature

The smarter model was meaningfully slower. For a lot of queries that trade wasn't worth it, so we split traffic: a fast model for simple queries, a smarter one for complex ones, and a small classifier deciding which is which.

Average latency dropped substantially and satisfaction moved more than it had when we improved accuracy. People will forgive a slightly dumber answer that arrives immediately. They will not sit through a perfect answer that takes eight seconds, because at eight seconds they've already alt-tabbed away and the answer arrives to an empty room.

## Context windows are for data, not instructions

With a big context window it's tempting to dump everything in. We tried it - full schema, all business rules, recent conversation history, documentation excerpts.

Quality got worse. The model started inventing relationships between unrelated tables, presumably because we'd handed it a hundred tables and asked it to find the three that mattered.

Bad:

```
Here are all our tables, all columns, all business rules,
all previous conversations, all documentation...
```

Better:

```
Here are the 3 tables relevant to this query, their key columns,
and 2 business rules that apply.
```

Retrieval is the feature. The context window is just where you put the result.

## Users don't want AI

Nobody cares which model you're using. They care whether they can get their revenue report without booking time with an analyst.

We took the AI language out of the interface. No badges, no "powered by" copy, no per-output disclaimers. It's a search box.

Trust went up, and my read is that the badge was functioning as an invitation to audit. Label something as AI-generated and people start hunting for the seam. Ship it as a feature that works and they evaluate it the way they evaluate everything else, which is to say by whether it was useful.

I want to be careful here, because this cuts both ways and I've gone back and forth on it. Hiding the machine is fine when the stakes are a bar chart someone will sanity-check anyway. It's not fine when the output is advice someone might act on without checking. We were in the first category. Know which one you're in.

## Measure what matters

Query success rate. Accuracy, sampled and verified by a human on a regular cadence. Thumbs up and down. Time to insight. Retry rate, meaning how often someone rephrases the same question - which turned out to be our best early warning signal, because a retry is a user telling you the product failed without bothering to file anything.

What we deliberately didn't track: how impressive the responses sounded, how many features used AI, or anything else that looks good on a slide and doesn't correlate with someone getting their answer.

## Know when not to use it

Queries that map to a known template should use the template. Ambiguous requests should trigger a question, not a guess. High-stakes actions should require confirmation. And anything with an existing reliable solution should keep using it.

We added AI to six features and pulled it back out of two. One was a date range parser, where a handful of regex patterns turned out to handle nearly everything faster, cheaper, and more predictably than a model call. That was a mildly humbling PR to write.

## The tech moves faster than you ship

Prompts tuned for one model failed on another. Not degraded - failed, in ways that required rewriting rather than tweaking. You can't swap providers the way you swap cloud regions.

So: abstract the provider, make prompts configurable without a deploy, build an evaluation suite you can point at new models, and don't build your product on one vendor's proprietary feature unless you're prepared to rebuild that part.

## Was it worth it

Text-to-SQL became the most-used analytics surface we had. People who'd never written a query started building their own dashboards, and product managers stopped queueing behind analyst availability.

The technology is genuinely imperfect and I spent a lot of that year annoyed at it. But it moved the bottleneck off a small number of people who knew SQL, and that turned out to matter more than any of the accuracy work.

More on this: [Text-to-SQL project](/projects/text-to-sql)

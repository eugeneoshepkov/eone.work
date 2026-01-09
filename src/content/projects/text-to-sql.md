---
title: Text-to-SQL Analytics
description: Natural-language analytics that generates PostgreSQL queries and charts via LLMs, with guardrails and fallbacks.
tags: [LLMs, OpenAI, TypeScript, PostgreSQL]
featured: true
---

The goal was simple: let someone ask a question in plain English and get a useful chart back. No SQL required.

I designed and implemented a Text-to-SQL interface inside an analytics SDK, translating natural language into safe, efficient SQL and a sensible visualization.

## Problem

Business users struggle with SQL and most dashboard builders are powerful-but-clunky. The result is a constant dependency on data teams for simple questions.

## Constraints

- Ambiguous queries are the norm (“revenue” can mean five different things)
- Schema size and business rules make naive prompting unreliable
- Latency matters (a 4–5s answer feels broken)
- Outputs need guardrails (wrong SQL is worse than no SQL)

## Key decisions

- Schema-aware prompting (only relevant tables/columns, plus applicable business rules)
- Query generation with validation and predictable fallbacks for ambiguity
- Type-safe handling of model responses in TypeScript
- Visualization selection that prefers boring-but-correct defaults

At a high level the pipeline looked like:

1. **Intent parsing** — what the user wants to see
2. **Schema linking** — mapping domain language to columns/tables
3. **SQL generation** — optimized PostgreSQL queries
4. **Chart selection** — choose the right visualization and formatting

## Example

```
User: "Show me monthly revenue growth for the last year"

Generated:
- SQL query joining revenue tables
- Line chart with month-over-month comparison
- Automatic formatting of currency values
```

## Outcome

Enabled non-technical users to explore data independently, reducing the burden on data teams and accelerating insight discovery.

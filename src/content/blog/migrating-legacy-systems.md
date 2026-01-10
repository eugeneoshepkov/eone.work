---
title: The Art of Migrating Legacy Systems Without Losing Your Mind
description: A migration playbook focused on the human side: feature flags, baselines, tests, and team dynamics.
date: 2024-07-29
tags: [Engineering]
featured: false
---

I've led or participated in major migrations at ImmoScout24, TourRadar, and other companies — millions of users, zero downtime, and a team that still had to ship features while the foundation moved.

The code is the visible part. The people part determines whether it ships.

I’ve done a few migrations outside code too (countries, careers). Same lesson: never big bang.

## The technical part is the easy part

Sounds counterintuitive. You're replacing a massive legacy system with modern tech. There's database migrations, API changes, deployment strategies, rollback plans.

That stuff is hard, but it's *predictable* hard. You can plan it, test it, measure it.

The unpredictable part is people:
- Engineers who built the legacy system and feel attached
- Product managers who want features, not refactors
- Stakeholders who don't understand why it takes so long
- New hires who don't know why things are the way they are

Solve the people problems, and the technical problems become manageable.

## Never big bang

The temptation is strong: "Let's just rebuild it properly, then switch over."

I've never seen this work at scale. What happens instead:
1. The rebuild takes 2x longer than estimated
2. The old system keeps getting patched because business can't wait
3. The systems diverge
4. The switch-over becomes terrifying
5. Someone suggests "just a few more months on the rebuild"
6. Repeat forever

**Do this instead:** Strangle the old system incrementally. Route some traffic to new code. Expand gradually. Old and new coexist until the old naturally dies.

At ImmoScout24, we migrated the Exposé (listing) pages over 8 months. Users never noticed. That's the goal.

## Feature flags are your best friend

Every migration needs:
- Ability to route % of traffic to new code
- Ability to instantly roll back
- Ability to test in production with real data
- Per-user or per-segment targeting

We ran new and old systems in parallel for months. 1% of traffic, then 5%, then 25%, then 50%. Problems surfaced early, at low blast radius.

Without feature flags, you're flying blind.

## Measure obsessively

Before touching anything, establish baselines:
- Performance metrics (latency, throughput)
- Error rates
- Business metrics (conversion, engagement)
- Developer metrics (deploy frequency, incident count)

During migration:
- Compare new vs. old constantly
- Set up alerts for regressions
- Track metrics per feature flag cohort

If you can't prove the new system is at least as good as the old one, you're guessing.

## The test suite lie

"We have 90% test coverage, migration will be safe."

Legacy test suites often test:
- Implementation details that will change
- Happy paths that aren't the real edge cases
- Mocked dependencies that hide integration issues

Before migrating, invest in:
- End-to-end tests that verify user behavior
- Contract tests between services
- Chaos testing to verify resilience
- Load tests that match production patterns

The tests that give you confidence during migration are different from the tests that existed before.

## Documentation is archaeology

Legacy systems are full of "why is this here?" code. Before changing anything, document:
- Known business rules (talk to product, not just code)
- Historical incidents that shaped the code
- Integration points and their quirks
- Performance characteristics and bottlenecks

At TourRadar, I found a function that seemed useless. Deleted it. Turns out it handled a specific payment provider's weird edge case. That was a $50k lesson.

Don't delete what you don't understand. Understand first.

## Bring people along

The worst migrations I've seen happened in isolation. A "tiger team" goes off, builds the new thing, then throws it over the wall.

Better approach:
- Involve engineers who know the legacy system
- Pair new hires with veterans
- Share progress weekly (demos, not docs)
- Celebrate milestones publicly
- Make it *our* migration, not *my* migration

By the end of the ImmoScout24 migration, the whole team understood both systems. That knowledge distribution was as valuable as the code.

## Accept temporary ugliness

Migrations create awkward intermediate states:
- Two ways to do the same thing
- Abstraction layers that only exist for compatibility
- Feature flags checking old vs. new everywhere
- Duplicated code while both systems run

This is fine. It's temporary. The goal is safe transition, not beautiful intermediate states.

It feels like writing a new song: for a while it’s just noise in a rehearsal room, and if you judge it too early you kill it before it locks in.

I've seen migrations stall because engineers wanted to "do it right." Perfect is the enemy of shipped.

## Know when to stop

Sometimes the right answer is: don't migrate.

If the legacy system:
- Works reliably
- Isn't blocking business goals
- Isn't a security risk
- Isn't losing institutional knowledge

...maybe leave it alone. Migration for migration's sake is expensive.

The question isn't "is this code old?" It's "is this code causing problems we need to solve?"

## The emotional arc

Every long migration follows a pattern:

1. **Excitement** — "We're finally fixing this!"
2. **Discovery** — "Oh, it's more complex than we thought"
3. **The Pit** — "This is taking forever and nothing works"
4. **Momentum** — "Wait, things are actually improving"
5. **Victory** — "We did it, and it's better"

The Pit is where migrations die. Push through it. The other side is worth it.

## My playbook

1. Measure the old system thoroughly
2. Define success criteria upfront
3. Build the smallest possible new implementation
4. Route 1% of traffic
5. Fix what breaks
6. Increase traffic gradually
7. Repeat until old system is dead
8. Remove old code (don't skip this!)
9. Celebrate

It's not glamorous. But it works.

---

These days I'm mostly migrating individual features instead of entire platforms. Same principles, smaller blast radius, identical human dynamics.

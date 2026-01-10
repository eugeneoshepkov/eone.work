---
title: The Art of Migrating Legacy Systems Without Losing Your Mind
description: A migration playbook focused on the human side: feature flags, baselines, tests, and team dynamics.
date: 2024-07-29
tags: [Engineering]
featured: false
---

I've led or participated in major migrations at ImmoScout24, TourRadar, and other companies — millions of users, zero downtime, and a team that still had to ship features while the foundation moved under them.

The code is the visible part. The people part determines whether it ships.

I've done a few migrations outside code too. Moving from Aktau to Saint Petersburg at 18 was a migration with no rollback. No feature flags. No gradual traffic shift. Just a hard cut-over and months of debugging my new life. I learned the lesson there: never big bang if you can help it.

## The technical part is the easy part

Sounds counterintuitive. You're replacing a massive legacy system with modern tech. There's database migrations, API changes, deployment strategies, rollback plans.

That stuff is hard, but it's *predictable* hard. You can plan it, test it, measure it.

The unpredictable part is people:
- Engineers who built the legacy system and feel attached to it
- Product managers who want features, not refactors
- Stakeholders who don't understand why it takes so long
- New hires who don't know why things are the way they are

At ImmoScout24, the hardest conversations weren't about database schemas. They were with engineers who had spent years building the old Exposé pages and felt like we were saying their work was bad. We weren't. The requirements had just changed, and the old architecture couldn't bend anymore.

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

I watched this exact pattern kill a rewrite at a company before TourRadar. They spent 18 months building a new booking system in parallel. By month 12, the old system had features the new one didn't. By month 18, nobody wanted to flip the switch. The project was quietly shelved, and all that work evaporated.

**Do this instead:** Strangle the old system incrementally. Route some traffic to new code. Expand gradually. Old and new coexist until the old naturally dies.

At ImmoScout24, we migrated the Exposé (listing) pages over 8 months. Started with the mobile web view for a single city. Then all cities. Then tablet. Then desktop. Users never noticed. That's the goal.

## Feature flags are your best friend

Every migration needs:
- Ability to route % of traffic to new code
- Ability to instantly roll back
- Ability to test in production with real data
- Per-user or per-segment targeting

We ran new and old systems in parallel for months. 1% of traffic, then 5%, then 25%, then 50%. Problems surfaced early, at low blast radius.

At 10% traffic during the ImmoScout24 migration, we discovered the new system was slightly slower on certain property types. Found it in metrics, fixed it, confirmed the fix — all before 90% of users ever saw the new code. Without feature flags, that would have been a production incident.

## Measure obsessively

Before touching anything, establish baselines:
- Performance metrics (latency, throughput, Core Web Vitals)
- Error rates
- Business metrics (conversion, engagement, bounce rate)
- Developer metrics (deploy frequency, incident count)

During migration:
- Compare new vs. old constantly
- Set up alerts for regressions
- Track metrics per feature flag cohort

If you can't prove the new system is at least as good as the old one, you're guessing.

At ImmoScout24, we had dashboards showing old vs. new on every metric that mattered. When someone asked "is the new system ready?", we could show them data, not vibes.

## The test suite lie

"We have 90% test coverage, migration will be safe."

Legacy test suites often test:
- Implementation details that will change
- Happy paths that aren't the real edge cases
- Mocked dependencies that hide integration issues

Before migrating, invest in:
- End-to-end tests that verify user behavior
- Contract tests between services
- Load tests that match production patterns

The tests that give you confidence during migration are different from the tests that existed before.

## Documentation is archaeology

Legacy systems are full of "why is this here?" code. Before changing anything, document:
- Known business rules (talk to product, not just code)
- Historical incidents that shaped the code
- Integration points and their quirks
- Performance characteristics and bottlenecks

At TourRadar, I found a function that seemed useless — no obvious callers, weird logic, no comments. Deleted it. Turns out it handled a specific payment provider's retry behavior for failed transactions in certain currencies. Took two weeks to figure out why refunds were silently failing. That was a $50k lesson in understanding before deleting.

Don't delete what you don't understand. Understand first.

## Bring people along

The worst migrations I've seen happened in isolation. A "tiger team" goes off, builds the new thing, then throws it over the wall.

I witnessed this at a startup before my ImmoScout24 days. Three senior engineers locked themselves in a room for four months to rebuild the core platform. When they emerged, nobody else understood the new system. The original builders left for other jobs within a year. The company was left with a system nobody could maintain.

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

It feels like writing a new song. When my band was working on new material, there was always a phase where the song was just noise — half-formed riffs, placeholder lyrics, wrong tempo, conflicting ideas. If you judged it at that stage, you'd trash it. But that messy phase is where the song figures out what it wants to be. You have to let it be ugly long enough to find its shape.

Migrations are the same. The codebase will look bad for a while. That's the cost of not breaking everything at once.

I've seen migrations stall because engineers wanted to "do it right." Perfect is the enemy of shipped.

## Know when to stop

Sometimes the right answer is: don't migrate.

If the legacy system:
- Works reliably
- Isn't blocking business goals
- Isn't a security risk
- Isn't losing institutional knowledge

...maybe leave it alone. Migration for migration's sake is expensive.

At TourRadar, we had an old booking confirmation service that everyone wanted to rewrite. It was ugly, used an outdated framework, and nobody liked working on it. But it worked. It hadn't caused an incident in two years. We left it alone and focused our energy on things that were actually breaking.

The question isn't "is this code old?" It's "is this code causing problems we need to solve?"

## The emotional arc

Every long migration follows a pattern:

1. **Excitement** — "We're finally fixing this!"
2. **Discovery** — "Oh, it's more complex than we thought"
3. **The Pit** — "This is taking forever and nothing works"
4. **Momentum** — "Wait, things are actually improving"
5. **Victory** — "We did it, and it's better"

The Pit is where migrations die. At ImmoScout24, we hit The Pit around month 4. The new system worked for most pages but kept breaking on edge cases — unusual property types, legacy data formats, features nobody remembered adding. Morale dropped. People started questioning if we should just revert.

We pushed through by narrowing scope. Instead of trying to handle every edge case, we kept the old system running for the weird 5% and focused on migrating the normal 95%. The edge cases got picked off one by one over the following months.

The other side is worth it.

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

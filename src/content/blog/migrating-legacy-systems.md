---
title: The Art of Migrating Legacy Systems Without Losing Your Mind
description: A migration playbook focused on the human side: feature flags, baselines, tests, and team dynamics.
date: 2024-07-29
tags: [Engineering]
featured: false
---

The hardest conversation in the ImmoScout24 listing page migration had nothing to do with databases.

It was with the engineers who'd built the old Exposé pages. They'd spent years on that code. They'd made it work under constraints that no longer applied, solved problems that no longer existed, and now a plan was circulating that described all of it as the thing to be replaced.

We weren't saying their work was bad. The requirements had changed and the architecture couldn't bend that far. But that distinction is very easy to state in a planning doc and very hard to feel when it's your code on the slide.

I've come to think that conversation is the actual work. The schema stuff is hard in a way you can plan for. People are hard in a way that determines whether the plan happens at all.

## The technical part is the easy part

This sounds glib, so let me be precise about what I mean. Database migrations, API versioning, deployment strategy, rollback plans - these are difficult, but they're *predictably* difficult. You can decompose them, estimate them, test them, and measure whether they worked.

What you can't plan around is the engineer who built the old system and reads every design doc as a performance review. The product manager who has a roadmap and does not care that the foundation is on fire. The stakeholder who wants to know why a rewrite of something that already works takes eight months. The new hire who deletes a weird function because it looks dead.

Solve those and the technical problems get manageable. Skip them and the migration stalls somewhere around month four with nobody willing to say so out loud.

## Never big bang

The temptation is always the same: build it properly, in parallel, then switch over.

I have never seen this work at scale, and the failure is boringly consistent. The rebuild runs long. Meanwhile the business can't wait, so the old system keeps getting patched. The two diverge. By the time the new system is "ready" it's missing features the old one grew during the build. The switch-over now looks terrifying to everyone, so it gets deferred, and then deferred again, and eventually the whole thing is quietly shelved and the work evaporates.

I watched this happen to a booking system rewrite. Well over a year of parallel development, and by the end nobody was willing to flip the switch. Not because the new system was bad. Because flipping it had become an unbounded risk that no individual wanted their name on.

Strangle it instead. Route some traffic to new code, expand gradually, let old and new coexist until the old one has nothing left to do. It's less satisfying and it works.

At ImmoScout24 we did the Exposé pages over several months, starting with mobile web in a single city. Then all cities. Then tablet, then desktop. Users never noticed anything happened, which was the whole point and also the reason nobody outside the team knew it was a big deal.

I've done this outside of code, too, and less gracefully. Moving from Aktau to Saint Petersburg at 18 was a hard cut-over with no flags and no rollback. It worked out. It also took months of debugging a new life that I could have spread over a longer window if I'd had the option.

## Feature flags

Everything above depends on being able to route a percentage of traffic, roll back instantly, test in production against real data, and target specific segments.

We ran old and new in parallel for months, ramping traffic in stages. Somewhere in the low percentages we found that the new system was slower for certain property types - a real regression, in metrics, with a small enough blast radius that we fixed and verified it before most users had ever touched the new code.

Without the flag that's an incident. With it, it's a Tuesday.

## Measure obsessively

Before touching anything, get baselines: latency and Core Web Vitals, error rates, the business metrics that people actually care about, and the developer-facing ones like deploy frequency and incident count.

Then compare constantly during the migration, alert on regressions, and break the metrics out per flag cohort so you're comparing like with like.

The reason this matters is political as much as technical. "Is the new system ready?" is a question that gets asked in rooms where the answer determines whether you keep going. Having a dashboard means you answer with data instead of confidence, and confidence is not persuasive to someone who has been burned by a migration before.

## The test suite lie

"We have 90% coverage, the migration will be safe."

Legacy test suites tend to cover implementation details that are about to change, happy paths that were never the risk, and mocked dependencies that hide exactly the integration failures a migration produces. High coverage of the wrong things reads as safety and isn't.

What you want before migrating is end-to-end tests that verify user-visible behavior, contract tests between services, and load tests shaped like real traffic. Those are usually a different set of tests than the ones you already have, and writing them is unglamorous prep work that's easy to skip because the coverage number already looks fine.

## Documentation is archaeology

At TourRadar I found a function that looked dead. No obvious callers, strange logic, no comments, no tests. I deleted it.

It handled a specific payment provider's retry behavior for failed transactions in certain currencies. Refunds started failing silently, and it took us two weeks to connect the failures back to the deletion, because nothing in the stack trace pointed anywhere near it.

So: before changing anything, write down the business rules - from product, not just from reading code - the incidents that shaped the current design, the integration points and their quirks, and where the performance cliffs are.

Don't delete what you don't understand. I say this with feeling.

## Bring people along

The worst migrations I've seen happened in isolation. A small team goes away, builds the new thing, and returns to present it.

I watched a version of this where a few senior engineers spent months rebuilding a core platform on their own. The system they came back with was better than what it replaced. It was also understood by exactly three people, all of whom had moved on within a year, and the company was left maintaining something nobody could confidently change.

The alternative is slower and mostly social: involve the engineers who know the legacy system, pair new hires with people who remember why things are the way they are, demo progress rather than writing status docs, and be loud about milestones. By the end of the ImmoScout24 migration the whole team understood both systems. That distribution of knowledge was worth roughly as much as the code.

## Accept temporary ugliness

Migrations produce genuinely bad-looking intermediate states. Two ways to do the same thing. Compatibility shims that exist for no reason except the transition. Flag checks scattered everywhere. Duplicated logic while both systems run.

This is fine and it's temporary, and the number of migrations I've seen stall because someone wanted the intermediate state to be clean is higher than it should be.

It reminds me of the phase in writing a song where it's just noise - half a riff, placeholder lyrics, wrong tempo, three people with incompatible ideas about what it's supposed to be. If you judged it there you'd bin it. But that mess is where the song works out what it wants to be, and skipping it doesn't get you a better song, it gets you no song.

## Know when not to migrate

Sometimes the answer is: leave it alone.

If the legacy system works reliably, isn't blocking anything the business needs, isn't a security risk, and isn't the sole knowledge of one person about to leave - the case for migrating is mostly aesthetic.

At TourRadar we had a booking confirmation service everyone wanted to rewrite. Outdated framework, ugly code, nobody enjoyed touching it. It also hadn't caused an incident in two years. We left it and spent the time on things that were actually breaking, and I've never regretted it.

The question isn't whether the code is old. It's whether it's causing a problem you need to solve.

## The pit

Every long migration has a stretch in the middle where the new system handles most cases and keeps breaking on the rest - unusual data shapes, legacy formats, features nobody remembers requesting. Morale drops. People start floating the idea of reverting, usually as a joke, then not as a joke.

We got there a few months into the ImmoScout24 migration. What got us out wasn't pushing harder. It was narrowing: we kept the old system running for the strange minority of cases and moved the ordinary majority over, then picked off the edge cases one at a time over the following months.

That's the least heroic possible answer and it's the one that worked.

## The playbook

Measure the old system. Define what success means before you start. Build the smallest new implementation that does one real thing. Route a sliver of traffic. Fix what breaks. Increase gradually. Repeat until the old system has no traffic. Then actually delete it, which everyone skips, which is how you end up migrating the same system twice.

These days I mostly migrate individual features rather than platforms. Smaller blast radius, same principles, and the human dynamics are identical at every scale I've seen.

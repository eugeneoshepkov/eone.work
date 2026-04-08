---
title: Building a Reading Dashboard from Amazon Kindle Exports
description: Amazon gives you a giant Kindle export zip, not a clean product API. I turned that archive into a local-first reading insights dashboard with Bun, TypeScript, heuristics, and a lot of cleanup.
date: 2026-04-08
tags: [Engineering, Design, AI]
featured: false
---

Amazon will happily give you your Kindle data. What it won't give you is a usable product.

You get a fat zip archive. Hundreds of files. CSVs, JSON shards, telemetry dumps, half-documented dataset names, duplicated signals, missing titles, broken cover metadata, and just enough useful structure to make you think: this should be easy.

It wasn't easy. But it was worth it.

I built a local-first reading insights dashboard from my Kindle export. Bun + TypeScript + Vite + React on top. The interesting part wasn't drawing charts. It was figuring out which parts of the archive were facts, which were hints, and which were basically noise.

![Library view of the Kindle reading insights dashboard](/blog/kindle-reading-insights/library-overview.png)

## The export is rich, but not product-ready

The raw archive contained what looked like everything:

- reading sessions
- completions
- ownership records
- highlights and notes
- search telemetry
- recommendation impressions
- Send to Kindle events
- Kindle challenge rewards
- library snapshots
- lots of low-level device behavior

That sounds amazing until you open it.

Some files were clear and useful. Others looked like event streams from internal Amazon teams talking to themselves. A lot of values were `Not Available`. Some books were identified by ASIN, others by personal document IDs, others by weird content IDs. Some titles were clean. Some were just filenames with junk appended.

The lesson was simple: don't build UI directly on export files. Normalize first, or suffer later.

## The real work was identity resolution

Books were the hardest part.

The same title could appear as:

- a normal Kindle ASIN
- a personal document ID
- a non-ASIN content ID
- a noisy filename from Send to Kindle
- a numeric placeholder title

That means you can't just "group by title". You need stable keys and fallback rules.

I ended up treating identity as a layered problem:

1. Use ASIN when it exists
2. Use personal-document IDs for PDOCs
3. Keep manual overrides for stubborn edge cases
4. Merge external hints only when confidence is good enough

Without that, every metric lies. Your "top books" list fractures into duplicates. Your completions drift away from your sessions. Your current-reading logic turns into fiction.

## Facts first, heuristics second

This became the main principle of the project.

Some things in the export are strong facts:

- when you read
- how long a session lasted
- when a completion signal happened
- when a highlight or note was created
- which books were opened, closed, resumed, or searched

Other things are not facts. They're inferences.

Examples:

- abandonment risk
- current reading ranking
- resumption rate
- "deep work" vs "before bed" labels
- any exact per-book percent-complete number

That distinction matters a lot.

Early on I had progress-like UI that looked convincing. It was wrong. It was based on relative reading time, not real Kindle progress. So I removed it. The dashboard got better immediately.

Clean interfaces matter. Honest interfaces matter more.

## Figma is easy. Semantics are hard

The visual redesign was the fun part. I translated the dashboard into a more editorial, bookish layout based on Figma screens: lighter, warmer, less dashboard-for-the-sake-of-dashboard.

What took longer was making the labels actually mean what they claimed to mean.

For example:

- "Pages per Day" became "Hours per Day"
- "Average Speed" became metrics we can really support
- "Current reading" moved from "unfinished books with the most hours" to a blend of recent activity, resume signals, and open-book events
- the new "Parallel Reading Analysis" block uses actual concurrent unfinished-book activity instead of made-up multitasking scores

This was the recurring pattern: design gives you the shape, but the archive decides the truth.

## The archive got more useful when I stopped ignoring telemetry

The first version of the extractor focused on the obvious files:

- reading sessions
- completions
- ownership
- whispersync annotations

That was enough for a basic dashboard.

Then I audited the ignored files. That's where the project got interesting.

The second wave added:

- most recent page read events
- resume dialog actions
- open-book / close-book telemetry
- richer annotation action logs
- notebook interactions
- search and recommendation traces
- Send to Kindle deliveries
- Kindle rewards
- library size snapshots

Once those were in, the dashboard stopped being a static summary of books and started feeling more like a behavioral map.

Not just what I read. How I read.

## Local-first turned out to be the right choice

I briefly considered turning this into some hosted sync-heavy thing.

Bad idea.

This kind of data is personal. Reading history, unfinished books, note-taking habits, search traces. Shipping that to a backend just to render a few charts feels silly if the only user is me.

So the pipeline stays local:

- raw export zip lives on disk
- scripts normalize into JSON artifacts
- the frontend reads processed files from `public/processed`
- manual metadata fixes live in versioned override files

It's simpler, cheaper, and more private.

Also: local-first forced a cleaner architecture. If you can't rely on a database or API layer, your transformation pipeline has to make sense.

## The most interesting insight wasn't "how much I read"

I already knew I read a lot.

The useful insight was that I don't read linearly.

I read in parallel. I pause books. I return to them weeks later. I abandon some. I resume others. I also search the library in a way that says a lot about intent even before reading time shows up.

That's why the newer parts of the dashboard matter more to me than the obvious totals:

- concurrency index
- active parallel books
- stalled books
- resumption rate
- annotation gravity
- search-to-book selection patterns
- Send to Kindle inflow

Those feel closer to actual reading behavior than another annual total ever will.

![Reading Insights view with parallel reading analysis and archive-driven analytics](/blog/kindle-reading-insights/insights-overview.png)

## Bun was a good fit for this

This project needed two very different things:

- a fast local data pipeline
- a lightweight frontend

Bun + TypeScript worked well for the extraction side. Vite + React worked well for the UI. The whole loop stays fast enough that iterating on heuristics doesn't feel painful.

That mattered because this project was basically a sequence of refinements:

- parse one more dataset
- discover one more bad title pattern
- merge one more cover source
- remove one more fake metric
- tighten one more heuristic

When the feedback loop is quick, you're much more willing to keep making the model truer.

## What I'd do next

The obvious next step is snapshot diffs between Amazon exports.

Drop a new zip in a folder. Run one command. Get:

- newly finished books
- resumed books
- fresh Send to Kindle deliveries
- changes in library size
- changes in parallel reading behavior

Not another static report. A "what changed since last export" layer.

That's the point where this becomes less like a dashboard and more like a personal reading observatory.

---

If you're building from ugly privacy-export data, my main advice is boring: normalize aggressively, separate facts from heuristics, and don't let pretty UI bully you into fake precision.

If you want to compare notes on local-first analytics, Kindle exports, or AI-assisted product building, reach me at [me@eone.work](mailto:me@eone.work).

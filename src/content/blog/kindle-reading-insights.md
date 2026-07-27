---
title: Building a Reading Dashboard from Amazon Kindle Exports
description: Amazon gives you a giant Kindle export zip, not a clean product API. I turned that archive into a local-first reading insights dashboard with Bun, TypeScript, heuristics, and a lot of cleanup.
date: 2026-04-08
tags: [Engineering, Design, AI]
featured: true
---

Amazon will give you your Kindle data if you ask. What it gives you is a large zip file that is very clearly a compliance artifact rather than a product.

Hundreds of files. CSVs, JSON shards, telemetry dumps, dataset names that were obviously never meant to be read by a customer, duplicated signals, missing titles, broken cover metadata. And just enough structure visible on the surface to make you think this will take a weekend.

It did not take a weekend. But I got a reading dashboard out of it - local-first, Bun and TypeScript for the pipeline, Vite and React on top - and the interesting part was never the charts. It was working out which parts of the archive were facts, which were hints, and which were noise wearing the costume of data.

![Library view of the Kindle reading insights dashboard](/blog/kindle-reading-insights/library-overview.webp)

## The export is rich but not product-ready

What's in there, roughly: reading sessions, completions, ownership records, highlights and notes, search telemetry, recommendation impressions, Send to Kindle events, challenge rewards, library snapshots, and a considerable amount of low-level device behavior.

That list sounds fantastic right up until you open the files. Some are clean and immediately useful. Others are event streams from internal Amazon systems talking to each other, with field names that mean something to a team I'll never meet. A lot of values are literally the string `Not Available`. Books are identified by ASIN in one file, personal document ID in another, and some third content ID elsewhere. Titles range from correct to a filename with junk appended to a number.

The rule I'd give anyone starting from a privacy export: don't build UI on the raw files. Normalize first. Every shortcut you take at this layer becomes a bug in the interface that you'll misdiagnose as a rendering problem.

## Identity resolution was the actual project

Books were the hard part, and I underestimated it badly.

The same book might appear as a normal ASIN, a personal document ID, a non-ASIN content ID, a noisy Send to Kindle filename, and a numeric placeholder title - sometimes several of these within one export. So "group by title" produces nonsense, and nonsense that looks plausible, which is worse.

I ended up treating identity as a layered fallback: use the ASIN when it exists, personal-document IDs for PDOCs, manual overrides for the genuinely stubborn cases, and merge external metadata hints only when confidence clears a bar.

Until that was right, every metric downstream was quietly lying. Top books fractured into duplicates of themselves. Completion counts drifted away from session counts. The current-reading logic was pure fiction, confidently rendered.

## Facts first, heuristics second

This became the organizing principle, and it came out of getting it wrong.

Some things in the archive are strong facts: when you read, how long a session lasted, when a completion signal fired, when a highlight was created, which books were opened and closed and resumed and searched for.

Other things are inferences dressed as facts: abandonment risk, current-reading rankings, resumption rate, "deep work" versus "before bed" labels, and any per-book percent-complete number.

I had a progress bar early on. It looked great. It was computed from relative reading time, not actual Kindle progress, which meant it was a plausible-looking number with no relationship to the thing it claimed to measure. I deleted it, felt briefly like the dashboard had gotten worse, and then realized it had gotten considerably better.

That's the trap with this kind of data. The UI can render false precision as convincingly as real precision, and you're the only one who knows the difference.

## Design gives you shape, the archive decides truth

The visual redesign was the fun part. I moved the dashboard toward something more editorial and bookish - warmer, lighter, less dashboard-for-its-own-sake, based on Figma screens.

What took much longer was making the labels honest.

"Pages per Day" became "Hours per Day," because the export doesn't reliably know about pages. "Average Speed" became metrics the data can actually support. "Current reading" moved from "unfinished books with the most logged hours" to something built out of recent activity, resume signals, and open-book events. And the parallel reading section got rebuilt around actual concurrent unfinished-book activity rather than a multitasking score I'd essentially invented.

Each of those changes made the dashboard less impressive and more true. I'd do all of them again.

## Ignoring telemetry was leaving the good stuff on the table

The first version of the extractor went after the obvious files: sessions, completions, ownership, whispersync annotations. Enough for a basic dashboard, and I nearly stopped there.

Then I audited the files I'd been skipping, which is where it got interesting. Most recent page read events. Resume dialog actions. Open and close telemetry. Richer annotation logs. Notebook interactions. Search and recommendation traces. Send to Kindle deliveries. Library size snapshots.

Once those were in, the thing stopped being a summary of what I'd read and started being a map of how I read. Different product, same data, and it had been sitting in the zip the whole time.

## Local-first was the right call

I briefly considered making this a hosted, synced thing, and I'm glad I didn't.

This data is about as personal as it gets - reading history, what I abandoned, what I highlighted, what I searched for at 1am. Shipping all of that to a backend so I could render some charts for an audience of one would have been a strange trade.

So the pipeline stays on disk: raw export zip locally, scripts that normalize into JSON artifacts, a frontend that reads processed files from `public/processed`, and manual metadata fixes in versioned override files.

It's simpler and cheaper, and it forced a cleaner architecture almost by accident. Without a database to hide sloppiness in, the transformation pipeline has to actually make sense.

## The interesting finding wasn't how much I read

I already knew that number, and it isn't very interesting.

What the data showed me is that I don't read linearly at all. I read several books in parallel, pause them, come back weeks later, abandon some permanently, resume others without noticing there was a gap. And I search the library in ways that reveal intent well before any reading time shows up against a title.

So the metrics I care about now are the behavioral ones - concurrency, active parallel books, stalled books, resumption rate, where the annotations cluster, how a search turns into an opened book, what comes in through Send to Kindle. Those describe something recognizably me. An annual total never did.

![Reading Insights view with parallel reading analysis and archive-driven analytics](/blog/kindle-reading-insights/insights-overview.webp)

## Bun was a good fit

The project needed a fast local data pipeline and a lightweight frontend, and Bun with TypeScript handled the extraction side well while Vite and React did the UI.

That mattered more than it sounds, because the whole project was a long sequence of small refinements: parse one more dataset, find one more bad title pattern, merge one more cover source, delete one more fake metric, tighten one more heuristic. When each loop is seconds instead of minutes you stay willing to keep making the model truer. When it's slow you start accepting "close enough," and close enough is how you end up with a progress bar that means nothing.

## What's next

Snapshot diffs between exports. Drop a new zip in a folder, run one command, get what changed - newly finished books, resumed books, fresh deliveries, library growth, shifts in parallel reading behavior.

That's the point where it stops being a dashboard and starts being something I'd actually check.

If you're building on top of an ugly privacy export, the advice is boring: normalize aggressively, keep a hard line between facts and heuristics, and don't let a good-looking interface talk you into precision you don't have.

Happy to compare notes on local-first analytics or Kindle exports specifically: [me@eone.work](mailto:me@eone.work)

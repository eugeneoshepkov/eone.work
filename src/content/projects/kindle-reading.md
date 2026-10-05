---
title: Kindle Reading Dashboard
description: Five years of my Kindle reading, rebuilt from Amazon's data export - every hour, every finished book, and when I actually read.
image: /projects/kindle-reading/overview.webp
tags: [TypeScript, React, Bun, Data]
featured: true
liveUrl: https://read.eone.work/
---

Everything I've read on Kindle since June 2021. 1,180 hours across 179 books, 90 of them finished. Live at [read.eone.work](https://read.eone.work/).

It's built from Amazon's privacy export, the giant zip you get when you request your data. The story of taming that archive is in [Building a Reading Dashboard from Amazon Kindle Exports](/blog/kindle-reading-insights). This page is about what the dashboard shows now and what I had to fix to trust it.

## My first version counted every hour twice

Kindle logs reading in two places: Reading Insights sessions and a device-level session log. They describe the same minutes. My first dashboard added them up and proudly reported almost 2,400 hours.

The real number is about half. Month by month the two logs match almost exactly, so the dashboard now uses Reading Insights and only borrows device sessions for the day or so after its last entry.

## Kindle's "finished" isn't always finished

Kindle marks a book finished two ways: when I tap "mark as read", or automatically when it thinks I reached the end. The automatic mark misfires. One memoir got marked finished twelve minutes after I opened it, most likely because the file opened on its last page. I kept reading it for six more days.

To find the rest, I estimated my reading speed from books Kindle saw me finish - about 28 pages an hour - and compared every manual "finished" against how long the book should have taken. That surfaced a few I'd marked done without actually finishing them.

## Most of my books aren't from the Kindle store

They're EPUBs I bought elsewhere and sent to the device. So titles arrive as filenames like `Yiener_H._Volche_Vremya_Germaniya_I`, the same book shows up as two or three files, and cover lookups guess wrong a lot.

The cleanup:

- 17 duplicate entries merged into the books they belong to
- About 40 titles and author names fixed, most of them decoded from filenames
- Every cover checked by eye: about one in seven showed the wrong book or a blank page, so they were replaced or dropped
- 19 hours Kindle never tied to any book still count in my totals, but don't pretend to be a title

![When I read: reading time by weekday and hour](/projects/kindle-reading/habits.webp)

## Peak reading hour: 22:00

A quarter of all my reading happens between 22:00 and 23:00. Weekends double the weekday numbers, and Sunday is the busiest day.

My typical sitting is four minutes. But 42% of the hours come from sittings of half an hour or more. Short sessions are frequent. The long ones are where the books actually get read.

## Public, without publishing my diary

Raw reading sessions are second-by-second timestamps: when I go to bed, which days I didn't read. The public build ships none of that. It publishes daily totals per book and pre-computed weekday-by-hour grids, all in Vienna time so every visitor sees the same numbers. No session timestamps, no Amazon IDs, nothing from the raw export.

## Stack

| Layer | Technology |
|-------|------------|
| Pipeline | Bun + TypeScript, merging every export I've downloaded |
| UI | Vite + React, hand-rolled SVG charts |
| Hosting | Cloudflare Workers static assets |

Takeaway: the export is full of facts, but you have to argue with each one before it deserves a chart.

Curious how your own export looks, or building something similar? [me@eone.work](mailto:me@eone.work)

---
title: Building a Game About My Hometown Without Writing Code
description: How I built a Soviet-era city builder about Aktau using Claude Code, Cursor, and Suno AI - all without touching the code.
date: 2026-01-16
tags: [Engineering, AI, Music]
featured: true
---

![Caspian Atom: The Aktau Protocol - A Soviet-era nuclear city builder](https://aktau.eone.work/pictures/intro-horizontal.png)

There's no river in Aktau. Almost no rainfall. The city exists because someone in the Soviet Union decided to put a fast breeder reactor in the desert and use it to turn the Caspian Sea into drinking water.

The BN-350 ran from 1972 to 1999 and desalinated something like 120,000 cubic meters a day. That's what my hometown was drinking. That's why 150,000 people could live somewhere that should not support them.

I've now made a game about it - a city builder where you run that reactor - and I didn't write any of the code.

## I'd never built a game

I've been writing software for years. Games, never. I didn't know Babylon.js, didn't know how game loops are structured, had no idea how you handle isometric cameras or resource ticks or particle systems.

That was most of the appeal. I wanted to find out how far the AI tooling would carry someone with strong general engineering instincts and zero domain knowledge.

## What the process actually looked like

Claude Code and Cursor, mostly on Opus 4.5. I described behavior instead of writing implementations:

- "Add a reactor that generates heat and electricity, but increases temperature every tick"
- "Make pipe connections auto-form between buildings within 5 tiles"
- "Add a ghost preview when placing buildings that shows green if connected, gray if not"
- "The terrain should look like a diorama with organic edges"

Claude wrote it, I reviewed and redirected. It felt less like programming and more like directing someone very capable who never gets tired and never gets defensive about their work.

The genuinely new part was staying at the design level. Normally when I have an idea, some percentage of my attention immediately goes to how annoying it will be to implement, and that estimate silently filters what I let myself consider. That filter mostly switched off. The distance between "what if the terrain looked like a diorama" and looking at a diorama was minutes.

I also kept a Gemini window open as a second opinion when I wanted something checked by a model that hadn't just written the thing, and generated a pile of images with Nano Banana.

## Four days

**Day 1:** Core mechanics. Building placement, resource production, reactor temperature.

![Day 1 - Core mechanics and building placement](https://aktau.eone.work/pictures/screenshots/day1-thumb.png)

**Day 2:** Visual work. Diorama terrain with an organic coastline, animated water, camera constraints, a keyboard shortcuts modal, and a historical chronicle using real Aktau facts.

![Day 2 - Diorama terrain and visual polish](https://aktau.eone.work/pictures/screenshots/day2-thumb.png)

**Day 3:** Tutorial with mission objectives, thermal plant building, full i18n for English and Russian, UI cleanup.

![Day 3 - Tutorial system and i18n](https://aktau.eone.work/pictures/screenshots/day3-thumb.png)

**Day 4:** Capacity limits on how many buildings a producer can supply, game-over states with narrative endings, population growth.

![Day 4 - Capacity system and game-over states](https://aktau.eone.work/pictures/screenshots/day4-thumb.png)

Four days from nothing to playable. I want to be careful about what that does and doesn't prove: it's four days of building a small game with well-understood mechanics, by someone who knows how to review code and describe systems precisely. It is not four days of building something novel, and the balance is still wrong in places I haven't fixed.

## The soundtrack

Suno, unsurprisingly. I've been doing AI music under [Caspian Ghost](https://open.spotify.com/artist/3AkhqYgQXec1r3TXQ77XVe) for a while, so when it came time for background music the workflow already existed.

I went for atmospheric and slightly melancholic with an industrial undertone - the Soviet-era mood the setting deserves. Same loop as everything else: describe the vibe, generate variations, keep what works.

If you want the detail on that side: [Suno guide](/blog/suno-ai-music-guide).

## What I took from it

The iteration loop didn't go away. It compressed. I still had to play the thing, notice what felt wrong, and change it - and noticing what feels wrong is the part no tool does for you. What changed is that acting on the noticing takes minutes, which means you're willing to act on smaller and vaguer instincts.

Some of the better features came out of back-and-forth rather than from either side alone. I'd describe a symptom - players don't understand why their microrayon isn't working - and get back a proposal about surfacing connection state in the preview, and the actual solution was a few rounds past both.

The thing I didn't expect is how much of game design is emotional pacing rather than systems design. I could get the systems correct and have the game still feel dead, and no amount of describing behavior to a model fixes that, because the problem isn't in the behavior. That's the part I'm still bad at.

## Try it and tell me what's broken

It's a work in progress. I'm still adding things, balancing resources, and finding edge cases.

But it's playable, and I'd rather have feedback than polish.

**Play:** [aktau.eone.work](https://aktau.eone.work/)

**Source:** [GitHub](https://github.com/eugeneoshepkov/aktau-protocol)

**Technical deep-dive:** [Project page](/projects/aktau-protocol)

More on where I'm from: [From Aktau to Vienna](/blog/from-aktau-to-vienna). If something breaks or feels off: [me@eone.work](mailto:me@eone.work)

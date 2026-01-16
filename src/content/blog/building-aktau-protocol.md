---
title: Building a Game About My Hometown Without Writing Code
description: How I built a Soviet-era city builder about Aktau using Claude Code, Cursor, and Suno AI - all without touching the code.
date: 2026-01-16
tags: [Engineering, AI, Music]
featured: true
---

![Caspian Atom: The Aktau Protocol - A Soviet-era nuclear city builder](https://aktau.eone.work/pictures/intro-horizontal.png)

I grew up in Aktau, Kazakhstan.

Now I've built a game about it. A nuclear city-builder where you manage the reactor that kept 150,000 people alive in the desert. And I didn't write a single line of code.

## Aktau shouldn't exist

There's no river. Almost no rainfall. Just sand, the Caspian Sea, and a Soviet idea that sounded insane: put a nuclear reactor in the desert and use it to turn seawater into drinking water.

The BN-350 fast breeder reactor ran from 1972 to 1999. It desalinated 120,000 cubic meters of water per day. It kept my hometown alive.

When I thought about building a game, this was the only story I wanted to tell.

I wrote more about my path from Aktau [here](/blog/from-aktau-to-vienna).

## I'd never built a game before

I've been writing software for years. But game development? Never touched it.

I didn't know Babylon.js. I didn't know how game loops work. I didn't know how to handle isometric cameras, resource ticks, or particle effects.

That was the point. I wanted to learn something completely new. And I wanted to see if AI tools could get me there.

## AI-powered development

I used Claude Code and Cursor with the Opus 4.5 model. The experience was unlike anything I've done before.

I didn't write TypeScript. I described what I wanted:

- "Add a reactor that generates heat and electricity, but increases temperature every tick"
- "Make pipe connections auto-form between buildings within 5 tiles"
- "Add a ghost preview when placing buildings that shows green if connected, gray if not"
- "The terrain should look like a diorama with organic edges"

Claude wrote the code. I reviewed, iterated, and directed. It felt less like programming and more like directing a very competent team member who never gets tired.

The novel part: I could think at the design level without getting stuck in implementation details. When something didn't work, I described the problem. When I wanted a feature, I described the behavior. The gap between idea and working code shrunk to minutes. Sometimes I've used Google Gemini in the separate chat window to act as a second pair of eyes. Also generated bunch of images with Nano Banana.

## Four days from zero to playable

Here's what the git log looks like:

**Day 1 (Jan 12):** Initial commit. Core game mechanics. Building placement. Resource production. Reactor temperature system.

![Day 1 - Core mechanics and building placement](placeholder: day1-screenshot.png)

**Day 2 (Jan 13):** Visual polish. Diorama terrain with organic coastline. Animated water. Camera constraints. Keyboard shortcuts modal. Historical chronicle with real Aktau facts.

![Day 2 - Diorama terrain and visual polish](placeholder: day2-screenshot.png)

**Day 3 (Jan 14):** Tutorial system with mission objectives. Added thermal plant building. Full i18n support for English and Russian. UI improvements.

![Day 3 - Tutorial system and i18n](placeholder: day3-screenshot.png)

**Day 4 (Jan 15):** Capacity system limiting how many buildings each producer can supply. Game-over states with narrative endings. Population growth mechanics.

![Day 4 - Capacity system and game-over states](placeholder: day4-screenshot.png)

Four days. A full game. No prior game dev experience. That's what AI-assisted development looks like in 2026.

## The soundtrack came from Suno

I've been experimenting with AI music for a while under [Caspian Ghost](https://open.spotify.com/artist/3AkhqYgQXec1r3TXQ77XVe). When it came time for background music, Suno was the obvious choice.

I generated tracks that fit the Soviet-era mood: atmospheric, slightly melancholic, with that industrial undertone. The same iterative process applied-describe the vibe, generate variations, keep what works.

If you're curious about AI music, I wrote a [detailed guide on Suno](/blog/suno-ai-music-guide).

## What I actually learned

**The iteration loop still matters.** AI tools don't remove the need for feedback cycles. They compress them. I still had to play the game, notice what felt wrong, and adjust. The difference is the adjust step takes minutes instead of hours.

**AI amplifies, it doesn't replace.** The creative decisions-what makes the game interesting, what the player should feel, how systems interconnect-those were mine. Claude handled execution. I handled vision.

**Game design emerges through conversation.** Some of the best features came from back-and-forth. I'd describe a problem ("players don't understand why their microrayon isn't working"), Claude would suggest a solution ("show connection status in the building preview"), and we'd refine it together.

**Game dev is surprisingly fun.** There's something satisfying about building a tiny world and watching it run. Even the failure states-meltdowns, droughts, frozen cities-feel like achievements when you designed them.

## Try it, break it, tell me what's wrong

The game is work in progress. I'm still adding features, balancing resources, fixing edge cases.

But it's playable. And I'd love feedback.

**Play:** [aktau.eone.work](https://aktau.eone.work/)

**Source:** [GitHub](https://github.com/eugeneoshepkov/aktau-protocol)

**Technical deep-dive:** [Project page](/projects/aktau-protocol)

If you try it, let me know what breaks or what feels off: [me@eone.work](mailto:me@eone.work)

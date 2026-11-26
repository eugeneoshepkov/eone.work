---
title: Building a Game About My Hometown Without Writing Code
description: Four days to build a browser game about Aktau with AI, then a return to the Caspian waterfront to put the places and small rituals of Shevchenko into the game.
date: 2026-01-16
updated: 2026-11-26
image: /projects/aktau-protocol/aktau-protocol-coast.jpg
tags: [Engineering, AI, Music]
featured: true
---

![Aktau Protocol title art, with apartment blocks, the power station and families on the Caspian shore at sunset](/projects/aktau-protocol/aktau-protocol-coast.jpg)

There's no river in Aktau. Almost no rainfall. I grew up on the shore of the Caspian Sea, and the water that came out of our taps had once been seawater.

Aktau was already desalinating water in 1963. Ten years later, the BN-350 reactor began generating electricity and supplying heat for desalination. That's where the idea for the game came from. Put a reactor, a water plant and a block of flats on a map, and you can follow the water all the way to someone's kitchen. [The IAEA's account of the Aktau plant](https://www-pub.iaea.org/MTCD/Publications/PDF/P1749_web.pdf#page=38)

I built the first playable version in four days, and I didn't write any of the code.

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

![Day 1 - Core mechanics and building placement](/projects/aktau-protocol/day1-thumb.png)

**Day 2:** Visual work. Diorama terrain with an organic coastline, animated water, camera constraints, a keyboard shortcuts modal, and a historical chronicle using real Aktau facts.

![Day 2 - Diorama terrain and visual polish](/projects/aktau-protocol/day2-thumb.png)

**Day 3:** Tutorial with mission objectives, thermal plant building, full i18n for English and Russian, UI cleanup.

![Day 3 - Tutorial system and i18n](/projects/aktau-protocol/day3-thumb.png)

**Day 4:** Capacity limits on how many buildings a producer can supply, game-over states with narrative endings, population growth.

![Day 4 - Capacity system and game-over states](/projects/aktau-protocol/day4-thumb.png)

Four days from nothing to playable. I want to be careful about what that does and doesn't prove: it's four days of building a small game with well-understood mechanics, by someone who knows how to review code and describe systems precisely. It is not four days of building something novel, and the balance is still wrong in places I haven't fixed.

## The soundtrack

Suno, unsurprisingly. I've been doing AI music under [Caspian Ghost](https://open.spotify.com/artist/3AkhqYgQXec1r3TXQ77XVe) for a while, so when it came time for background music the workflow already existed.

I went for atmospheric and slightly melancholic with an industrial undertone - the Soviet-era mood the setting deserves. Same loop as everything else: describe the vibe, generate variations, keep what works.

If you want the detail on that side: [Suno guide](/blog/suno-ai-music-guide).

## What I took from it

The iteration loop didn't go away. It compressed. I still had to play the thing, notice what felt wrong, and change it - and noticing what feels wrong is the part no tool does for you. What changed is that acting on the noticing takes minutes, which means you're willing to act on smaller and vaguer instincts.

Some of the better features came out of back-and-forth rather than from either side alone. I'd describe a symptom - players don't understand why their microrayon isn't working - and get back a proposal about surfacing connection state in the preview, and the actual solution was a few rounds past both.

The thing I didn't expect is how much of game design is emotional pacing rather than systems design. I could get the systems correct and have the game still feel dead, and no amount of describing behavior to a model fixes that, because the problem isn't in the behavior. That's the part I'm still bad at.

## Would someone from Shevchenko recognize it?

*November 26, 2026*

When I came back to the game with Codex, I wanted someone who grew up here to recognize a place before clicking on its label. The Abay Palace of Culture in the Fourth Microrayon was an obvious one to put on the starting map. You can see the red letters on its roof. A smaller change I like just as much is the worn path across the sand from the flats to the ice-cream kiosk and down to the beach.

![The in-game Abay Palace of Culture, with its shaded entrance, broad steps and red rooftop letters](/projects/aktau-protocol/abay-palace.webp)

Choose **Walk through Shevchenko** and you can join the queue. “Кто последний?” means “Who's last?” Someone tells you where you stand, and when it's your turn you get a twenty-kopeck plombir in a waffle cup. The price and the detail about kids returning empty bottles for ice-cream money came from a local childhood recollection. [Childhood in Shevchenko, in Lada.kz](https://www.lada.kz/columns/12499-aktau-onischenko.html)

You start the city builder with 50 residents. Click **Build housing** and 25 more move in. That's when the Chronicle offers its first family story. The suitcases are still in the hall and the children are writing Grandma a postcard. The return address is just three numbers. First the microdistrict, then the building, then the flat. [How addresses work in Aktau](https://tengrinews.kz/curious/pochemu-aktau-nazvaniy-ulits-unikalnaya-sistema-adresatsii-540363/)

![Two children write a postcard at the kitchen table in their new flat in Shevchenko](/projects/aktau-protocol/family-postcard.webp)

*The new family's postcard, one of 19 AI-generated illustrations in the Shevchenko Chronicle. The latest story you discover goes on the cover of your album. Open it to read the story and follow the link to its source.*

One of those sources has a family connection. In a letter, a researcher who worked inland at Melovoye remembered my grandfather helping design a field tower the crew called a “robot.” His published paper has a photograph of one. That's the tower you can visit in the game's optional field season. [The field photograph, figure 7](https://www.ijsred.com/volume3/issue3/IJSRED-V3I3P169.pdf#page=4)

If you grew up in Shevchenko, I'd love to know where you went after school. A name people used for a kiosk or a stretch of beach would give me something to put on the map. [Email me](mailto:me@eone.work)

[Play Aktau Protocol](https://aktau.eone.work/) · [Source on GitHub](https://github.com/eugeneoshepkov/aktau-protocol) · [How the game works](/projects/aktau-protocol) · [From Aktau to Vienna](/blog/from-aktau-to-vienna)

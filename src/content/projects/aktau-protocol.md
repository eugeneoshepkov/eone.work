---
title: Caspian Atom: The Aktau Protocol
description: A browser city-builder about my hometown on the Caspian Sea. Connect the apartment blocks to water and heat, guide a waterfront district from 50 residents to 250, and get it through its first winter.
image: /projects/aktau-protocol/waterfront.webp
tags: [TypeScript, AI, Babylon.js]
featured: true
liveUrl: https://aktau.eone.work/
repoUrl: https://github.com/eugeneoshepkov/aktau-protocol
---

I grew up in Aktau, on the Kazakh shore of the Caspian Sea. The water that came out of our taps had a remarkable backstory. The city’s BN-350 reactor supplied heat to a plant that turned seawater into fresh water. [The IAEA’s account of the plant](https://www-pub.iaea.org/MTCD/Publications/PDF/TRS400_scr.pdf)

I wanted to make that connection something you could play with. You start with 50 people, a working reactor, and one apartment block. Your first job is to find a spot for the second block where both water and heat can reach it.

## Where would you put the next block?

There’s a suggested lot you can build on with one click. You can also pick a building from the dock and try a layout of your own. A block can sit close to a desalination plant and still go without water if the plant is already serving its neighbors. Open the pipe network and switch off the heat lines to see where the water goes.

![The water network across four apartment blocks, with the heat layer switched off and the number of blocks served in the upper right](/projects/aktau-protocol/water-lines.webp)

I rebuilt the waterfront around the things you can pick out at a glance. The long apartment slabs have balconies and different facades. The intake sits at the water’s edge, and a little tug runs past the harbor while you decide where to build.

## The first winter is a deadline

A season lasts 30 game days. The poplars turn gold in autumn, then snow settles on the rooftops and the first winter doubles heat demand. If reserves start dropping, you can spend spare electricity on an emergency shift. The same crews handle water and heat, so sending them to one buys you time at the expense of the other.

![Snow on the apartment blocks and industrial roofs during the waterfront district’s first winter](/projects/aktau-protocol/first-winter.webp)

## What should the city spend its charter on?

Get 180 residents housed and make it to spring on day 121, and the city can fund one public work. The waterfront reed garden cuts household water use by a quarter. The district heating works cut the city’s heat demand by the same amount. Whichever you choose becomes a permanent part of the neighborhood.

![Two charter choices seen in the game. The reed garden’s folded concrete pavilion stands beside the harbor on the left. The heating works and its insulated tank sit behind the apartments on the right.](/projects/aktau-protocol/civic-projects.webp)

*Left, the reed garden by the harbor. Right, the heating works behind the apartments.*

The last order is to connect a fifth apartment block and settle 250 people. After that you can keep building. [Play Aktau Protocol](https://aktau.eone.work/).

The first playable version took four days with Claude Code and Cursor. The game still runs in the browser on TypeScript and Babylon.js. I wrote about that first build in [Building a Game About My Hometown Without Writing Code](/blog/building-aktau-protocol).

If you make it through winter, I’d love to hear which public work you picked and what your reserves looked like. [me@eone.work](mailto:me@eone.work)

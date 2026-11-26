---
title: Caspian Atom: The Aktau Protocol
description: A browser game about my hometown on the Caspian Sea. Keep a waterfront district supplied, join the ice-cream queue in Shevchenko, or host a field team at Melovoye.
image: /projects/aktau-protocol/waterfront.webp
tags: [TypeScript, AI, Babylon.js]
featured: true
liveUrl: https://aktau.eone.work/
repoUrl: https://github.com/eugeneoshepkov/aktau-protocol
---

I grew up in Aktau, on the Kazakh shore of the Caspian Sea. The water that came out of our taps had a remarkable backstory. The city’s BN-350 reactor supplied heat to a plant that turned seawater into fresh water. [The IAEA’s account of the plant](https://www-pub.iaea.org/MTCD/Publications/PDF/TRS400_scr.pdf)

I wanted to make that connection something you could play with. You start with 50 people, a working reactor, and one apartment block. Your first job is to find a spot for the second block where both water and heat can reach it.

## «Кто последний?»

“Who’s last in line?” Choose **Walk through Shevchenko** on the title screen and that’s the first thing you can ask at the ice-cream kiosk. “Behind me,” comes the answer. When it’s your turn, you get a plombir in a waffle cup. The twenty-kopeck price comes from Denis Onishchenko, who remembered the local dairy’s ice cream and how the kids returned empty bottles for spending money. [Onishchenko’s childhood recollections](https://www.lada.kz/columns/12499-aktau-onischenko.html)

The wooden bathing pier in the First Microrayon opens in summer. I based it on photographer Viktor Malyuk’s recollection of the beach by the yacht club. In autumn there’s a day trip out of town to sketch the round stones at Torysh. [Malyuk on the first city beach](https://otpannews.kz/ru/news/konferentsiia-neravnodushnykh-zhiteli-aktau-podelilis-svoimi-vospominaniiami-o-kaspii)

In winter you can duck into the Chaika courtyard club. Onishchenko and his friends sometimes ran their only reel of *Operation Y* backwards to see the scattered pots jump back into line. Each outing leaves a keepsake. Turn it over and you can write down what you remember. The note stays in your browser.

![Four places to visit in the game. The ice-cream kiosk and swimming pier are above, the stone balls at Torysh and the Chaika courtyard club are below.](/projects/aktau-protocol/neighbourhood.webp)

## Where would you put the next block?

There’s a suggested lot you can build on with one click. You can also pick a building from the dock and try a layout of your own. A block can sit close to a desalination plant and still go without water if the plant is already serving its neighbors. Open the pipe network and switch off the heat lines to see where the water goes.

![The water network across four apartment blocks, with the heat layer switched off and the number of blocks served in the upper right](/projects/aktau-protocol/water-lines.webp)

I rebuilt the waterfront around the things you can pick out at a glance. The long apartment slabs have balconies and different facades. The intake sits at the water’s edge, and a little tug runs past the harbor while you decide where to build.

Open **City sights** to find the Melovoy lighthouse on the roof of an apartment building. The Shevchenko monument, the fertiliser works, the BN-350 reactor hall and the MAEK desalination works each have their own model. I brought them closer together on the map so you can go from a courtyard to the industrial waterfront in a few clicks.

## The first winter is a deadline

A season lasts 30 game days. The poplars turn gold in autumn, then snow settles on the rooftops and the first winter doubles heat demand. If reserves start dropping, you can spend spare electricity on an emergency shift. The same crews handle water and heat, so sending them to one buys you time at the expense of the other.

After you send a water crew, you can open a local press clipping. In May 2021, residents of the 32V Microrayon filmed their neighbours still queuing at a water tanker late at night. That’s what a low water gauge can mean at the other end of the pipe. [The report from 32V](https://www.lada.kz/aktau_news/society/91530-zhiteli-aktau-do-nochi-stoyali-v-ocheredi-k-vodovozu.html)

![Snow on the apartment blocks and industrial roofs during the waterfront district’s first winter](/projects/aktau-protocol/first-winter.webp)

## What should the city spend its charter on?

Get 180 residents housed and make it to spring on day 121, and the city can fund one public work. The waterfront reed garden cuts household water use by a quarter. The district heating works cut the city’s heat demand by the same amount. Whichever you choose becomes a permanent part of the neighborhood.

![Two charter choices seen in the game. The reed garden’s folded concrete pavilion stands beside the harbor on the left. The heating works and its insulated tank sit behind the apartments on the right.](/projects/aktau-protocol/civic-projects.webp)

*Left, the reed garden by the harbor. Right, the heating works behind the apartments.*

Connect a fifth apartment block and settle 250 people, and the waterfront is yours. You can keep building or, when spring comes, host a visiting research team.

## The field tower my grandfather helped design

Gregory Abramov worked at Melovoye, inland from Shevchenko. In his letters he remembered my grandfather, Adolf Oshchepkov, helping design the team’s equipment, especially the surface tower the crew called a “robot.” Abramov’s paper shows one of those towers in figure 7. Another photograph shows a pipe hanging above the ground where the earth had settled more than a year after the work ended. [Abramov’s paper and photographs](https://www.ijsred.com/volume3/issue3/IJSRED-V3I3P169.pdf#page=4)

In the game, you find the visitors a sixth apartment block. Then you decide whether to send the waterfront’s reserve crew inland for ten days or keep them in town and let the field trial take twenty. I invented that choice for the game. Finish the trial and you can visit the tower. Come back a game year later and you can see daylight under the pipe. [Play Aktau Protocol](https://aktau.eone.work/)

![The Melovoye tower on its steel runners, and a later visit to the pipe suspended over a dip in the steppe.](/projects/aktau-protocol/melovoye.webp)

The first playable version took four days with Claude Code and Cursor. The game still runs in the browser on TypeScript and Babylon.js. I wrote about that first build in [Building a Game About My Hometown Without Writing Code](/blog/building-aktau-protocol).

If you remember Shevchenko, I’d love to hear where you went after school or what you called your stretch of the shore. [me@eone.work](mailto:me@eone.work)

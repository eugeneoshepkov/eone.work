---
title: What Music Production Taught Me About Software Engineering
description: The surprising parallels between producing tracks and shipping code. Lessons from the studio that made me a better engineer.
date: 2025-08-22
tags: [Music, Engineering]
featured: true
---

From 2010 to 2019 I sang and played guitar in Exage, a modern metal band. We recorded an album, shot a couple of videos, and did the rehearsal-room grind. Before that I'd taught myself guitar at 15 with no lessons, no theory, and no one to tell me what I wasn't allowed to try.

[Exage on Spotify](https://open.spotify.com/artist/5uz4tOA6Ao23QNgoPagWIq?si=K8lQAqlQS0ihWYkrFsQFnQ)

Exage - Dried By Time (Official Music Video)

https://youtu.be/5MSZXmbNoLg?si=EhgD4Cdrpfq7ptzO

Exage - Ergot In The Rye (Guitar Playthrough) - the one I wrote end to end, music and lyrics

https://youtu.be/an4gtPLFtuE?si=-6sk5fjDaoKBuRH3

I also ran a one-man progressive metal project (Harvard Process), sang in Discrepancy, and lately I've been doing AI-assisted things as Caspian Ghost. Full timeline with links: [Music](/projects/music).

When I moved into software professionally I assumed it was a clean reset. It wasn't. The technical knowledge didn't transfer at all, but the working habits transferred almost completely, and the habits turned out to be the part that mattered.

## Being bad in public

Starting without lessons meant nobody told me which experiments were stupid. So I ran all of them. I recorded takes I couldn't listen back to. I spent a year getting worse at singing before I got better. At some point I worked out how to scream on the inhale, which is not the correct technique for anything, and I learned it purely because there was nobody around to say don't.

That period taught me a loop I still use: fail while it's cheap, change one thing at a time so you know what caused the result, finish small pieces because momentum beats perfection, and share before you feel ready.

I still get the "I'm not ready" tension before shipping something new, and I've stopped expecting it to go away. The trick isn't confidence. It's keeping the experiment small enough that shipping it isn't a big deal either way.

## Demo-itis

There's a thing in music production where you live with a rough demo so long that it becomes the reference. Every polished version afterwards sounds wrong to you, not because it is, but because your ear has calibrated to the wrong take.

Software does exactly this. You build a prototype, it works, and the hacky version becomes your mental model of correct. Refactoring starts to feel like regression. The temporary thing has quietly become the specification, and everyone new to the project inherits it as though it were a decision.

## Mixing is debugging

When a mix sounds wrong you rarely know why. The bass is muddy - is that the bass? The kick? The room? Two synths fighting for the same 200Hz?

Debugging has the identical shape. The symptom appears in one place and originates somewhere entirely different, and the only reliable move is systematic elimination: solo the track, isolate the component, follow the signal path.

I think I got decent at debugging faster than I should have, and I'd credit mixing for it. Years of practice at treating a system as a chain of dependent processes rather than a thing that's either working or broken.

## If it only sounds good in your room, it isn't done

The cruel part of mixing is translation. Something can sound enormous in studio headphones and turn to mush on earbuds, vanish on a phone speaker, or become unlistenable in a car. So you check it in mono, at low volume, on different speakers, against a reference track you trust.

Your laptop is studio monitors. Production is the car test. If a feature only works on your machine, on your connection, with your data, it doesn't work - it just hasn't met anyone yet.

## Constraints, again

My most productive stretches of music-making all came with artificial limits. Five synth patches only. Finish in two hours. Samples, no recording.

The software equivalents write themselves: standard library only, ship this sprint, no new dependencies.

Constraints kill decision paralysis, and decision paralysis is where most of my unfinished work went. When everything is possible you spend the evening evaluating rather than making.

## Commit to the bounce

A DAW makes everything reversible, which is the magic and also the trap. Keep 70 tracks, 40 plugins, and every alternate take "just in case" and you will never finish, because you're permanently one tweak from a different song.

So producers commit deliberately. Print the take. Bounce the stems. Freeze the synth. Not because the committed version is objectively best - because reducing your degrees of freedom is the only way the thing ever gets done.

Same move in software: lock the API, pick defaults, delete options, ship. You can still iterate. You just stop pretending you'll keep every path open forever.

## Reference tracks

No professional producer starts from nothing. They load up songs they admire and A/B against them throughout the mix. It isn't copying, it's calibration - your ear drifts over four hours and the reference tells you how far.

Engineers do this with architecture without always admitting it. Before designing something I go look at how other people solved it. Open source codebases are our reference tracks.

## Taste is reps

From outside, taste in music looks like a gift. From inside it's just volume of comparison. You listen, you steal small ideas, you notice what feels wrong before you can explain why, and over years your defaults improve. The tell is that experienced producers reach for fewer knobs, not more.

Code is the same. Taste shows up in naming, in where you put boundaries, in which tradeoffs you take without needing to discuss them. It comes from shipping a lot, reading better code than yours, and being honest about what didn't work last time - which is the part people skip.

## The arrangement is the architecture

A song's arrangement determines how it feels almost independently of the sounds in it. You can have the best guitar tone ever recorded and a boring arrangement will still produce a boring song.

Architecture works the same way. Beautiful functions inside a bad system design produce a bad product, and the reverse - ordinary code in a well-shaped system - is fine more often than anyone wants to admit.

## Ears get tired, so do decisions

Mix for too long and you lose perspective. Your ears adapt, you start over-correcting, and eventually you're fixing things that were never broken.

Coding has the identical failure mode past a certain hour. You're not improving the system anymore, you're just making it different, and it takes a night's sleep to see it.

The fix is boring: stop, come back tomorrow, ship in smaller pieces, get someone with fresh ears to look.

## Knowing when to stop

The hardest skill in production is calling a track finished. There's always another layer, another automation pass, another hour on the hi-hats.

I'm still not good at this one, in either discipline. I've shipped features I kept picking at for weeks after they were fine, and I have songs from a decade ago I'd still like to remix. The difference now is that I can usually recognise the state I'm in, even when I don't act on it.

## The bedroom producer pipeline

A lot of engineers I know came from something creative - music, art, writing. I don't think that's coincidence. Both are crafts that improve mainly through repetition, both require holding a vision while doing unglamorous execution work, both involve handing your work to people who will judge it, and both reward the mix of systematic thinking and intuition that's hard to teach directly.

If you're a musician wondering whether you could do this: the skills transfer more than you'd expect. Just not the ones you'd assume.

Still making music when I can. The tools keep changing and the mental models haven't.

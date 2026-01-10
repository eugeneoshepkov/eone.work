---
title: What Music Production Taught Me About Software Engineering
description: The surprising parallels between producing tracks and shipping code. Lessons from the studio that made me a better engineer.
date: 2025-08-22
tags: [Music, Engineering]
featured: true
---

Before I wrote code professionally, I was a self-taught musician. I started at 15 with zero formal music education — learned guitar, singing, and even metal screaming (yes, on inhale) by brute-force experimentation. Then I spent years learning different DAWs, obsessing over mixing, and uploading tracks that got 47 plays (thanks, mom).

From 2010 to 2019 I was the singer + guitarist in Exage (modern metal / metalcore). We recorded an album, filmed a couple music videos, and did the usual rehearsal-room grind.

If you want a quick taste: [Exage on Spotify](https://open.spotify.com/artist/5uz4tOA6Ao23QNgoPagWIq?si=K8lQAqlQS0ihWYkrFsQFnQ).

Exage - Dried By Time (Official Music Video)

https://youtu.be/5MSZXmbNoLg?si=EhgD4Cdrpfq7ptzO

Exage - Ergot In The Rye (Guitar Playthrough) - the song I wrote end to end (music and lyrics)

https://youtu.be/an4gtPLFtuE?si=-6sk5fjDaoKBuRH3

I also ran a one-man progressive metal side project (Harvard Process), sang in Discrepancy, and lately I’ve been doing AI-assisted experiments as Caspian Ghost. The full timeline (with links) is here: [Music](/projects/music).

When I transitioned to software engineering, I expected a clean reset. I was wrong. The mental models transfer surprisingly well: constraints, iteration, taste, and knowing when to stop.

## Rookie mode is a feature

Starting at 15 without lessons meant I didn’t have anyone to tell me what I was “allowed” to try. I was a beginner in public. I sounded bad. I recorded takes I couldn’t listen back to without cringing. And I still kept going.

At one point I got obsessed with learning to scream. No vocal coach — just trial, error, and a lot of wrong attempts. I even ended up figuring out how to do metal screaming on inhale. Not because it’s the correct technique. Because experimentation was the whole game.

That rookie phase taught me a loop I still use in software:

- **Fail early** (while it’s cheap)
- **Change one thing** (so you know what caused the result)
- **Finish small pieces** (momentum beats perfection)
- **Share before you’re ready** (feedback beats imagination)

I still feel that little “I’m not ready” tension before I ship something new. The trick isn’t to eliminate it — it’s to keep the experiment small enough that you ship anyway.

If I take one thing from my music years, it’s this: let yourself be a rookie. I’m still learning to do that.

## The "good enough" trap

In music production, there's a phenomenon called "demo-itis" — when you work on a track so long that the rough demo becomes the reference point, and any polished version sounds wrong.

Software has the same problem. You build a prototype, it works, and suddenly refactoring feels like regression. The hacky solution becomes the mental model of "correct."

**The lesson:** Ship early, get feedback, don't let temporary become permanent.

## Mixing is debugging

When a mix sounds wrong, you don't immediately know why. The bass is muddy? Could be the kick drum, could be the bass itself, could be the room acoustics, could be clashing frequencies from the synths.

Debugging is the same. The bug manifests in one place but originates somewhere else entirely. Both require systematic elimination: solo the track, isolate the component, trace the signal path.

I got good at debugging partly because mixing trained me to think about systems as chains of dependent processes.

## If it only sounds good in your room, it’s not done

The cruel part about mixing is “translation”.

Something can sound massive in studio headphones and turn into mush on cheap earbuds. Or disappear on a phone speaker. Or become painfully harsh on a car stereo.

So you test where it lives:
- In mono
- Quiet volume
- Different speakers
- A/B against a reference track

Software is the same. Your laptop is studio monitors. Production is the car test.

If your feature only works on your machine, it doesn’t work. Test on slow devices, flaky networks, real data, weird browsers. That’s where the truth is.

## The 80/20 of polish

That last 20% of a track — getting the perfect reverb tail, automating volume micro-adjustments, the subtle compression moves — takes 80% of the time. Most listeners won't notice. But *you* notice, and that's what separates amateur from professional.

Same with code. The edge cases, the error handling, the performance optimization, the accessibility considerations. Users might not explicitly notice, but they feel the difference between software that's polished and software that's just functional.

## Creative constraints accelerate output

My most productive music-making happened with artificial limitations:
- Only use these 5 synth patches
- Finish a track in 2 hours
- Use only samples, no recording

In software:
- Use only the standard library
- Ship in one sprint
- No new dependencies

Constraints kill decision paralysis. When everything is possible, nothing gets done.

## Commit to the bounce

A DAW makes everything reversible. That’s both the magic and the trap.

If you keep 70 tracks, 40 plugins, and everything “just in case”, you never finish. You’re always one tweak away from a different track.

Producers commit. Print the take. Bounce the stems. Freeze the synth. Not because it’s objectively better — because it reduces degrees of freedom.

In software, it’s the same move: lock an API, choose defaults, delete options, ship. You can still iterate later, but you stop pretending you’ll keep every path open forever.

## Reference tracks and reference architectures

No professional producer starts from scratch. They load up reference tracks — songs they admire — and A/B compare throughout the mixing process. It's not copying, it's calibration.

Engineers do this with architecture. Before designing a system, I look at how others solved similar problems. Open source codebases are our reference tracks. AWS case studies are our production notes.

## Taste is trained, not gifted

In music, “taste” looks mysterious from the outside. In reality it’s reps.

You train your ear by comparing, stealing small ideas, and noticing what feels wrong. Over time, your default choices get better. You reach for fewer knobs, not more.

Code is like that too. Taste shows up in names, boundaries, and tradeoffs. It comes from shipping, reading good code, and being honest about what didn’t work last time.

## The arrangement is the architecture

A song's arrangement — intro, verse, chorus, bridge, outro — determines how it feels, regardless of the individual sounds. You can have the best synth patch in the world, but if your arrangement is boring, the track is boring.

Software architecture is the same. You can write beautiful functions, but if the overall system design is wrong, the product suffers. High-level structure matters more than local perfection.

## Collaboration patterns

In a band:
- Everyone has opinions on the final mix
- Someone has to make the call
- The drummer and bassist need to lock in before guitar layers work
- Ego kills bands faster than lack of talent

In engineering teams:
- Everyone has opinions on the architecture
- Someone has to make the call
- Backend and API contracts need to lock in before frontend works
- Ego kills teams faster than lack of skill

The dynamics are identical.

## Your ears get tired. So do your decisions.

When you mix too long, you lose perspective. Your ears adapt and suddenly you’re over-correcting. You start “fixing” things that weren’t broken.

Coding has the same failure mode. Past a point, you’re not improving the system — you’re just making it different.

The simplest fix is boring: take breaks. Come back tomorrow. Ship smaller chunks. Review with fresh eyes.

## Know when to stop

The hardest skill in music production is knowing when a track is done. You can always add another layer, tweak another knob, spend another hour on the hi-hats. At some point, you're making it different, not better.

Same with code. The feature can always be more elegant, more abstract, more generalized. But at some point, you're gold-plating, not improving.

Ship the track. Ship the feature. Move on.

## The bedroom producer → engineer pipeline

I'm not the only one who made this jump. Many engineers I know have creative backgrounds — musicians, artists, writers. There's something about creative production that prepares you for building software:

- Both are craft that improves with practice
- Both require balancing vision with execution
- Both involve shipping work for others to judge
- Both reward systematic thinking and intuition

If you're a musician wondering if you could do software engineering: you probably can. The skills transfer more than you'd expect.

---

Still making music when I can. The tools change; the mental models don’t.

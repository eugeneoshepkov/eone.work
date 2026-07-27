---
title: Making Actually Good Music with Suno AI
description: A practical guide to crafting compelling AI-generated songs. From prompt engineering to genre-specific techniques, here's what I've learned after hundreds of generations.
date: 2025-11-03
tags: [AI, Music]
featured: true
---

I've put an embarrassing number of hours into Suno. It started as curiosity and turned into something I use regularly, and somewhere in the middle I stopped writing prompts like a person describing a mood and started writing them like a person describing a recording.

That's most of the difference, honestly. Everything below is downstream of it.

## The prompt is doing all the work

Most people write something like "a sad song about love" and get back exactly what that describes: a generic sad song about love. The model isn't failing. You asked for the average of everything.

Compare:

> A rock song about being tired

with:

> Gritty garage rock, lo-fi recording, tired vocals, 3am energy, simple power chords, drums slightly behind the beat, about exhaustion from endless work

The second one gives it texture, a production style, a rhythmic feel, and a specific emotional register. "Drums slightly behind the beat" alone changes the output more than any adjective about sadness will.

If you're staring at an empty box, fill in these slots and don't overthink it:

> [subgenre], [recording/production style], [vocal style], [key instruments], [energy curve], [era/reference], [imperfection cue], [one-line story]

The imperfection slot is the one people leave out, and it's the one I'd argue matters most. More on that below.

## Structure your lyrics like a songwriter

Suno reads structure tags, so give it structure:

```
[Verse 1]
Lines about your specific story
Keep it concrete, avoid abstractions

[Pre-Chorus]
Build tension here

[Chorus]
Your hook - make it memorable and singable

[Verse 2]
Develop the narrative

[Bridge]
Change perspective or introduce a twist

[Outro]
Resolve or leave it hanging
```

`[Instrumental]` and `[Break]` are underused. Songs need room to breathe, and without them you tend to get four minutes of continuous vocal.

## Genre-specific things that work

For electronic and synth material, name the actual synth character - analog pads, acid bassline, plucky arpeggios - and reference eras rather than genres where you can. "80s synthwave" and "90s trance breakdown" both land. Describe the energy curve too: building tension, euphoric drop.

For rock and indie, production style carries more weight than instrumentation. "Bedroom recording" and "stadium production" produce genuinely different songs from identical lyrics. Guitar tone descriptors work well - jangly clean, fuzzed out, twangy telecaster - as do vocal treatments like whispered verses into a shouted chorus.

For hip-hop and R&B, lead with the drums. Boom bap, trap hi-hats, neo-soul keys. Flow references ("laid-back," "double-time") do more than you'd expect, and vibe words - late night, confident, introspective - fill in the rest.

## Treating it like any other system

My software habits transfer here almost directly. Start with a hypothesis about the sound you want. Change one variable per generation, so when something improves you know what did it. Keep the prompts that work in a file somewhere. Use extend on the promising ones rather than regenerating from scratch and hoping.

I have a notes file full of prompt patterns that have worked. It's prompt engineering with worse tooling and better output.

## Lyrics

The model is only as good as what you feed it, and this is where most AI songs give themselves away - not sonically, but because the words are about a feeling rather than a moment.

"I feel sad" is a category. "I'm staring at your contact, thumb hovering over delete" is a scene, and the model sings it differently because it has something to sing *about*. Same with "life is hard" versus "three cups of coffee and I still can't focus."

Sensory detail does a lot of load-bearing work: the hum of the refrigerator, orange streetlight through the blinds, cold feet on bathroom tiles. Concrete nouns, specific times of day.

This applies hardest to the chorus. The best hooks aren't emotional statements, they're moments you can picture. "We were dancing in the kitchen at 2am" gets you further than "I love you so much," and it's not close.

## My workflow

Write the lyrics in a text editor first - never compose in Suno's box, because the box encourages you to accept the first thing you type. Add structure tags. Write a detailed style prompt, fifty to a hundred words, using the template above if you're blank. Generate four or five variations, extend the best one, and use inpainting to patch the sections that don't work rather than rerolling the whole song.

## The uncanny valley

AI music has a tell, and it isn't what people expect. It's that everything is slightly too correct. Perfect timing, perfect tuning, perfectly clean transitions. Real recordings are full of small errors that your ear reads as "a person did this."

So I ask for the errors explicitly: slightly out of tune, live room sound, tape hiss, human timing.

It helps. It doesn't fully solve it, and I want to be straight about that - I can still usually identify AI-generated music, including my own, and I'm not sure the imperfection cues do more than move the tell somewhere less obvious.

## Is this cheating?

I was a bedroom producer for years before any of this existed. I learned DAWs, sound design, mixing, and I spent a long time being bad at all three.

So I have some standing to be annoyed by AI music, and honestly, part of me is. There's a real thing you lose when you skip the years of not being able to make what you hear in your head. That struggle taught me things.

But I've also made more music in the last six months than in the previous six years, and I don't think the answer to "is this legitimate" is as clean as either camp wants. The creative decisions - what to say, what it should feel like, which of five takes is the right one - those are still mine. The execution isn't, and I'm not going to pretend that's nothing.

Mostly I've stopped trying to resolve it and started using it as a sketchpad.

## What I do with it

Some of the output goes out under Caspian Ghost, with Russian lyrics, which makes it more personal and also means fewer people can tell when a line is clumsy.

[Caspian Ghost on Spotify](https://open.spotify.com/artist/3AkhqYgQXec1r3TXQ77XVe?si=GWrUYWtaS_qyE3wvUx_O_A)

Caspian Ghost - Пепел (Official Visualizer) - the visualizer took minutes, also AI

https://youtu.be/S_fsmwlmKOo?si=Ngx95bhLt7tTkN2K

The older non-AI material is scattered across SoundCloud and Bandcamp, all linked here: [Music](/projects/music).

If you've found prompt patterns that work, I'd genuinely like to hear them. This is a field where everyone is figuring it out in isolation and mostly not writing it down.

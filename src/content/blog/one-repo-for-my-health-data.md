---
title: "Every Health Record I Own, in One Repo an AI Can Read"
description: I moved years of labs, scans, wearable data and genomics into a single git repository so models can read all of it at once. The consolidation found things no single appointment would have.
date: 2026-07-30
tags: [AI, Health, Engineering]
featured: true
---

My blood panels lived in email attachments. My DEXA scan lived on a disc from the radiology clinic. WHOOP had its own app, the blood pressure cuff had another, the DNA report was behind a login I hadn't used in a year, and the abdominal ultrasound was a sheet of paper in a drawer.

Every doctor I saw got one slice of that, for about twelve minutes, with no history.

So in March I started putting all of it into a single git repository. It's now the only place I look, and what surprised me is how much was sitting in the gaps between the sources.

![The Today view of the health dashboard, showing LDL, ApoB, WHOOP recovery and DEXA body fat side by side with upcoming appointments](/blog/one-repo-for-my-health-data/today-overview.webp)

## Six sources, six viewers, no shared time axis

Nothing I collected was hard to get. Labs come as PDFs. WHOOP and Withings have APIs. The DEXA clinic hands over DICOM files if you ask. Consumer genomics exports a raw text file.

The problem is that each one is a silo with its own viewer and its own idea of time. You cannot ask an app that only holds heart rate whether your cholesterol trend lines up with your training volume. You cannot ask a lab portal what your body composition looked like on the day of the draw.

And a general practitioner, however good, is looking at whatever you handed them that morning. Mine has never seen four years of panels side by side, because until recently neither had I.

## Plain files, because that's what models read best

The whole thing is markdown and JSONL in a directory tree:

```
data/        normalized facts, append-only
sources/     original PDFs and DICOMs, kept for provenance
analysis/    assessments, open questions, recommendation log
context/     profile, preferences, family history
memory/      timeline, interventions
scripts/     importers and validators
```

Python importers pull WHOOP, Withings, and Google Fit, parse the DEXA DICOMs, and turn medical PDFs into structured records. A local FastAPI backend and a React frontend give me thirteen pages of it in a browser. None of it is deployed anywhere. It runs on my laptop and the repo stays private.

I chose files over a database for one reason: models read files well. Point Claude at the directory and it can hold labs, scans, wearable history, diet, and my family history in the same context and reason across all of them. No query layer, no schema translation, no API. The same property makes it durable - in ten years the JSONL will still open, which is more than I'd bet on any health app I could have signed up for.

Git does the rest. Every record is append-only, every change is a diff, and history is free.

Three fields carry the whole design: `source_date` for when the thing happened, `imported_at` for when it entered the repo, `fetched_at` for API pulls. It sounds trivial. It's the difference between a trend you can trust and a pile of numbers with ambiguous timestamps, and it's the first thing a model will get wrong if you don't force it.

## What consolidation actually surfaced

This is the part I'd have been skeptical about before doing it.

**The DEXA report said my bone density was normal.** It is, at the summary level. But re-extracting the original Hologic DICOM files gave me the hip sub-sites, and the trochanter sits at T -1.6 while total hip is -1.2. That's a specific weak site, which implies specific loading, which is a completely different conversation than "bone density normal." The clinic handed me a file with all of that inside it. What they printed was one reassuring line.

![Body composition view summarising the DEXA scan as a reassuring baseline with one bone watch site at the left trochanter](/blog/one-repo-for-my-health-data/body-composition.webp)

**A creatinine trend that would have looked like nothing.** Across three draws at two different labs, creatinine went 1.0 → 1.3 and eGFR fell from 96 into the low 70s. At any single appointment that's a shrug and a comment about muscle mass. In the repo it became a tracked question with the confounders written down explicitly - lifting, hydration, body size - and a note that the honest answer needed a repeat measurement plus cystatin C. The June panel came back at 1.1 with eGFR 84. The confounding explanation held. Nobody panicked, and the reasoning for why we didn't is still on file.

**The mismatch nobody sees, because nobody holds both files.** Total cholesterol ran up to 240 and LDL to 140 across the panels, while body fat sat at 16.9% at BMI 22.8 and every glycemic marker stayed normal. That combination is the actual signal: the lipids aren't explained by adiposity or insulin resistance, so they need their own explanation. You only see the mismatch if the DEXA and the labs live in the same place. The most recent panel finally bent the trend - 223 total, 136 LDL, ApoB flat at 0.95 - and with four baselines on file I could see it was a real reversal.

![Lab trends view showing total cholesterol, HDL, triglycerides and ApoB, each with its measurement history and a personal target line](/blog/one-repo-for-my-health-data/lab-trends.webp)

Every marker carries my own prevention target alongside the lab's reference range, which matters more than it sounds. The lab calls ApoB 0.95 g/L "in range." My target is under 0.8. That gap is the entire reason ApoB is now the endpoint I track.

**Eosinophils that were high on every single draw.** Each individual panel flagged them and moved on, because one elevated eosinophil count with allergies in the chart is unremarkable. Four draws in one place tell a different story: elevated every time, over two years, with the IgE workup sitting next to them showing class 4 birch sensitization and PR-10 cross-reactivity to soy and peanut. The repo also knows when birch season peaks here, so the draws can be read against pollen timing.

![Allergy and immune view pairing the specific IgE panel with the eosinophil trend across four blood draws](/blog/one-repo-for-my-health-data/allergy-immune.webp)

**Genomics, downgraded honestly.** The consumer report gave me a confident APOE label. Checking the raw file showed rs7412 as T/C, which confirms one e2 allele, while rs429358 is a no-call on one chip and absent from the other. So what the repo stores is "e2 carrier, e4 status unresolved" - messier than the report's version, and true. Most of that vendor's broad disease-risk output is now explicitly ranked as weak background context, which is roughly what it deserves.

None of these are diagnoses. They're questions worth asking, and I now walk into appointments with them already written down.

## Food was the part I had already failed at

Labs arrive as numbers. Food arrives as a shopping trip and a plate. The hard part turned out to be adherence: I had quit food tracking every previous time I tried it.

Every attempt died in the same place. The app wants you to search a database and type grams, at the moment you are hungry and holding a fork. Call it forty seconds per meal. That's nothing, right up until you multiply it by every meal for the rest of your life, and then one busy week ends it permanently.

So I designed backwards from the friction. The capture step is a photo into a shared album, and optionally one word in the comment. That's the entire user-facing protocol.

Everything else moved to the model. I say `sync diet`, and it reads the new album items, works out whether each one is a receipt, a barcode, a meal or a sequence of ingredient shots, estimates calories and macros with an explicit range, looks up barcodes against Open Food Facts, deduplicates by image hash, and appends rows. The conventions are the kind of thing a human tolerates: no comment on a packaged product means I ate the package, `half` or `250 ml` or `2 servings, ate 1` overrides it, and a run of ingredient photos ending in a finished dish counts once.

![Diet day view showing logged calories against a WHOOP-adjusted goal, macro breakdown, a saturated fat warning, and grocery direction over the last four weeks](/blog/one-repo-for-my-health-data/diet-day.webp)

The daily target moves with WHOOP strain, so a heavy training day raises the goal on its own.

The two streams that feed this are deliberately kept apart. Receipts measure food acquired - passive, continuous, one consistent instrument over months, so they carry the trend. Photos estimate what actually reached my plate. They can never be added together, because they have different denominators - household versus me, bought versus eaten - so every row carries a `basis` and a `scope` field, and the schema states outright that buying a loaf on Monday and photographing a sandwich on Wednesday is not two loaves. Purchase data stays as energy-adjusted ratios, never absolute grams, because a receipt cannot tell you who in the house ate the cheese.

Receipts also carry more than groceries, so the parser takes only the date and the item lines. Card, terminal and loyalty numbers are never extracted, and receipt images are the one thing the dashboard refuses to serve back.

![Diet view with the two evidence streams side by side: consumed meals with photo thumbnails and calorie ranges, next to an itemised grocery receipt](/blog/one-repo-for-my-health-data/diet-weekly.webp)

The trade is accuracy for adherence, on purpose. A photographed meal comes back as 480 kcal with a 380-620 range, which no food scale would accept. But a range I still record in month four beats a precise number I stopped entering in week two, and for the question I'm actually asking - is saturated fat share drifting down over twelve weeks - the range is entirely good enough.

That's the missing half of the lipid question. The panels showed a trend that nothing explained. Now saturated fat share and fiber density have a weekly line going back months, so the next time ApoB moves I can look at what the weeks before the draw actually contained. When those weeks have no grocery coverage, the repo is instructed to call the change unattributable and leave it there.

## What I'd tell someone starting

Start with the PDFs you already have. Four blood panels in one file beats a perfect ingestion pipeline you haven't built.

Get the timestamps right before anything else, and append. A corrected value should be a new record carrying its reason, so the old one stays visible.

For anything that needs you to do something daily, design the capture step first and the data model second. I got that order backwards for years. The schema is the easy part now that a model can do the interpreting; the hard constraint is what you'll still be willing to do on a Tuesday in November.

Write down uncertainty as a first-class record. My repo has a debate queue: open questions, current best guess, and what evidence would change the answer. It's the file I reread most, and it's what keeps the whole exercise from turning into a machine for confirming what I already believed.

And be clear about what this is. It doesn't replace a physician and it hasn't diagnosed anything. It makes those twelve minutes better, and when something does drift I should see it in a trend long before I feel it as a symptom.

Building your own, or want to argue about the diet schema? [me@eone.work](mailto:me@eone.work). The related reading is [Debugging Your Body](/blog/health-longevity-systems-thinking), which is why I started collecting any of this.

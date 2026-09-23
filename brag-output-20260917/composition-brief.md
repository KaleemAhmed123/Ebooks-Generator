# Hyperframes Composition Brief: TypeScript to Deployment

## Objective
Create a fast-paced, high-energy launch-style brag video for the TypeScript to Deployment 9-booklet collection.

## Output
- Composition directory: `brag-output-20260917/composition/`
- Rendered video: `brag-output-20260917/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 35 seconds

## Source Material
- Project root: `c:\Users\hp\Desktop\Projects-Root\Ebook Management\books\tech\typescript-to-deployment`
- Primary files read: `meta.json` from the master folder and `meta.json` from the 9 subfolders (01-typescript through 09-ai-practices).
- Product name: TypeScript to Deployment: The Ultimate Guide
- Tagline / strongest claim: KNOW WHAT YOU SHIP. OWN WHAT YOU RUN.
- Key UI or visual moment to recreate: The unique covers for each of the 9 booklets flashing in sequence.
- Copy that must appear verbatim:
  - YOU DON'T NEED A COURSE. YOU NEED A REFERENCE.
  - KNOW WHAT YOU SHIP. OWN WHAT YOU RUN.
  - $ tsc --noEmit && npm test
  - ✓ 0 errors

## Creative Direction
- Tone preset: chaotic / fast-paced
- Creative direction: A high-energy, beat-synced showcase that sells the massive amount of content across the 9 booklets.
- Interpretation: Extremely fast cuts, snapping to strong beats, emphasizing volume and technical depth.
- Angle: Emphasize that this isn't just one book, but a massive 9-volume reference library.
- Hook: Deep space navy background. A blinking terminal cursor typing `$ tsc --noEmit && npm test` and instantly hitting `0 errors`.
- Outro / punchline: The master cover accent color (`#1f6f8b`) fades in with the subtitle "The Ultimate Guide. Available now."
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals

## Visual Identity
- Background: `#fff` and `#13213d` (code blocks)
- Text: `#1a1a1a` (ink) and `#f1f1f3` (code fg)
- Accent: The accent colors defined in each of the 9 `meta.json` files (e.g. `#2b5fa8` for TypeScript, `#1f6f8b` for master).
- Display font: `Century Gothic, Questrial, sans-serif` and `Verdana, sans-serif` for h1
- Body font: `Georgia, Cambria, serif`
- Visual references from the project: Terminal blocks, minimalist headers with offset shadows.

## Storyboard
Use the storyboard in `brag-output-20260917/brag-plan.md` as the creative contract.

Scene summary:
1. Terminal Hook — 4s — Navy bg, typing `tsc`, flashing green `0 errors`
2. The Premise — 4s — Text slam: "YOU DON'T NEED A COURSE." "YOU NEED A REFERENCE."
3. The 9 Covers Flash — 14s — Rapid, beat-synced sequence showing the 9 original covers.
4. The Master Build — 5s — Fast cuts of the 9 booklets stacking into the master volume.
5. Tagline Slam — 5s — KNOW WHAT YOU SHIP. OWN WHAT YOU RUN.
6. Outro — 3s — Cover accent fades in: "The Ultimate Guide. Available now."

## Audio
- Audio role: dense rhythmic layer
- Audio arc: Starts punchy, hits a frenetic pace during the 9-cover flash, slams into a heavy cinematic beat for the final master volume.
- Music: chaotic-energy.mp3 (or equivalent high-BPM hyperframes track)
- Music treatment: Fade in slowly during terminal, hit hard on `0 errors`, snap the 9 covers exactly to consecutive fast beats.
- Music cue guidance: detect at composition via hyperframes beats
- Audio-reactive treatment: the covers pulse lightly to the bass kicks.
- Audio-coupled moments:
  - Terminal typing — fast keyboard click SFX
  - Cover flash — `// beat-grid: cover 1 at [t], cover 2 at [t+1]`
  - Tagline — cinematic boom
- SFX selection guidance: tight hi-hats or swooshes for the cover flashes.

## Hyperframes Instructions
Load the composition-building Hyperframes domain skills. /brag is its own workflow. 
Requirements:
- Parse the 9 subfolder `meta.json` files to generate the 9 unique cover designs dynamically in the composition.
- Show at least one real UI (the terminal commands).
- Keep the video within 35 seconds.
- Run `hyperframes check` before render.

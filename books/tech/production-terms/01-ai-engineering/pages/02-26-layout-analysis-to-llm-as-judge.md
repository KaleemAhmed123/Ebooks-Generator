## Layout Analysis

Working out the geometry of a page before recognising a single character: where
the text blocks are, which of them are columns, what is a table, what is a header,
and the order a human would read them in.

Skip it and OCR reads strictly left to right across the full page width,
interleaving a two-column contract line by line.

<svg viewBox="0 0 460 66" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Without layout analysis a scan reads straight across both columns and interleaves them; with it, each column is segmented and read in turn">
  <rect x="4" y="10" width="86" height="44" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
  <rect x="94" y="10" width="86" height="44" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
  <path d="M8 20 H176 M8 30 H176 M8 40 H176" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="92" y="64" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">reads across — columns interleaved</text>
  <rect x="270" y="10" width="86" height="44" fill="none" stroke="#c25a35" stroke-width="1.1"/>
  <rect x="360" y="10" width="86" height="44" fill="none" stroke="#c25a35" stroke-width="1.1"/>
  <path d="M274 20 H352 M274 30 H352 M274 40 H352" stroke="#c25a35" stroke-width="1.2"/>
  <path d="M364 20 H442 M364 30 H442 M364 40 H442" stroke="#c25a35" stroke-width="1.2"/>
  <text x="358" y="64" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#c25a35">segment first — each column in turn</text>
</svg>

It also supplies the structure later stages depend on. A region known to be a
table can be pulled out as rows and columns instead of a stream of numbers; a line
known to be a heading is a chunk boundary.

**This failure is nastier than a misread character, because nothing looks wrong.**
Confidence stays high, every word is real, the order is nonsense, and every
downstream stage inherits it.

## LLM-as-Judge

Scoring open-ended output with a model against an explicit rubric. Human review is
more reliable and does not scale; a judge model trades some of that reliability for
volume.

The MT-Bench paper (Zheng et al., 2023) reports GPT-4 judges agreeing with human
preferences over 80% of the time — roughly the rate at which humans agree with each
other — and names three biases that come with the technique.

| Bias | Effect |
|---|---|
| Position | whichever option is shown first tends to win |
| Verbosity | longer answers score higher |
| Self-enhancement | a model favours text from its own family |

Randomise option order on every comparison and hand-score a sample periodically.

**Low judge-to-human agreement usually means an ambiguous rubric, not a weak
judge.** A panel of people would disagree on that task too, and no amount of
prompting fixes a question with no agreed answer.

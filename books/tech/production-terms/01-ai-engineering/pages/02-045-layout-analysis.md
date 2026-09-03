## Layout Analysis

Detecting the structure — columns, tables, headers, reading order — before
extracting any text. Skipping it scrambles multi-column documents.

A two-column contract read without layout analysis interleaves the columns line
by line, producing text that is grammatically nonsense and confidently reported
as correct.

### How it works

Before recognising a single character, the system has to work out the geometry
of the page: where the text blocks are, which of them are columns, what is a
table, what is a header, and — crucially — what order a human would read them
in.

Skip it and OCR reads strictly left to right across the full page width.

<svg viewBox="0 0 460 66" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Without layout analysis a scan reads straight across both columns, interleaving them; with it, each column is read in turn">
  <rect x="4" y="10" width="86" height="44" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
  <rect x="94" y="10" width="86" height="44" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
  <path d="M8 20 H176 M8 30 H176 M8 40 H176" stroke="#b32d2b" stroke-width="1.2"/>
  <text x="92" y="64" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#b32d2b">reads across — columns interleaved</text>
  <rect x="270" y="10" width="86" height="44" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
  <rect x="360" y="10" width="86" height="44" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
  <path d="M274 20 H352 M274 30 H352 M274 40 H352" stroke="#c25a35" stroke-width="1.2"/>
  <path d="M364 20 H442 M364 30 H442 M364 40 H442" stroke="#c25a35" stroke-width="1.2"/>
  <text x="358" y="64" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#c25a35">segment first — each column in turn</text>
</svg>

**This failure is nastier than a recognition error**, because nothing looks
wrong at the character level. Confidence scores are high. Every word is real.
The order means nothing, and every downstream stage inherits the damage.

### In practice

Layout analysis also supplies the structure that later steps depend on. Knowing
a region is a table means you can extract rows and columns instead of a stream
of numbers. Knowing a line is a heading means you can chunk on it.

It is the step where a document stops being a picture of text and becomes a
document.

## Chunking Strategy

How documents are split before embedding. It affects retrieval quality more than
the choice of vector database does.

Fixed 500-token chunks split a table across a boundary, so neither half can
answer the question. Structure-aware chunking fixed retrieval without changing
the model or the prompt.

### How it works

A model cannot read your whole document library, so retrieval splits documents
into pieces, embeds each piece, and fetches the few that look relevant. Chunking
is that splitting step, and it sounds like plumbing.

It is the highest-leverage decision in the pipeline, because a chunk is both
what gets matched **and** what the model reads. A chunk containing half an idea
cannot be matched properly and cannot be answered from.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A fixed-size split cuts a sentence so one chunk holds a question with no answer and the other a number with no subject; structure-aware splitting keeps each chunk whole">
  <text x="4" y="12" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">FIXED 500 TOKENS</text>
  <rect x="4" y="18" width="200" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
  <text x="14" y="31" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">…total for Q3 was</text>
  <path d="M206 14 V40" stroke="#b32d2b" stroke-width="1.6"/>
  <rect x="210" y="18" width="200" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
  <text x="220" y="31" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">₹240 crore, up 12%…</text>
  <text x="14" y="50" font-family="Georgia,serif" font-size="9" fill="#b32d2b">a question with no answer</text>
  <text x="220" y="50" font-family="Georgia,serif" font-size="9" fill="#b32d2b">a number with no subject</text>
  <text x="4" y="70" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">STRUCTURE-AWARE</text>
  <rect x="140" y="60" width="270" height="18" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.2"/>
  <text x="150" y="73" font-family="Georgia,serif" font-size="9" fill="#c25a35">split on headings, sections, whole table rows</text>
</svg>

Cutting every 500 tokens ignores where meaning ends. It splits tables down the
middle, separates a heading from the section it introduces, and cuts a
definition away from the term being defined.

### In practice

The diagnostic that saves the most time: **when answers are poor, print the
retrieved chunks before touching the prompt or the model.**

Most complaints that the model is bad at something turn out to be chunks that
were never going to contain the answer. No amount of prompt engineering repairs
a retrieval problem, and a great deal of time gets spent trying.

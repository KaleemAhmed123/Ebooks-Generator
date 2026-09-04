## Document Classification

Deciding what kind of document arrived before extracting anything from it. An
extractor built for invoices, handed a delivery note, will find something that
looks like a total and return it. Nothing errors. The output is well-formed,
plausible and wrong.

Classification is often possible from cheap signals before any text recognition
runs: page count, a keyword in the top region, aspect ratio, whether the file is
scanned or digitally generated. Run those first and reserve the model call for
genuinely ambiguous documents, or the gate becomes the bottleneck.

**The case teams get wrong is the unknown one.** A classifier forced to choose
between invoice, contract and receipt will pick the nearest for a document that
is none of them. It needs an explicit *unrecognised* outcome that routes to a
human, and a confidence floor below which nothing is assumed.

## Document Parsing Pipeline

Turning heterogeneous source formats into clean text with structure preserved.
Everything downstream inherits what the parser produced: a chunk can only be as
good as the text it was cut from, and a model can only answer from what it was
handed.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A naive text extractor turns a two-column page into interleaved lines with tables flattened, while a layout-aware parser keeps reading order, headings and table regions before chunking">
  <rect x="4" y="8" width="72" height="46" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="40" y="35" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">PDF</text>
  <path d="M78 20 H112" stroke="#1a1a1a" stroke-width="1.2"/><path d="M112 20 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <path d="M78 42 H112" stroke="#1a1a1a" stroke-width="1.2"/><path d="M112 42 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="116" y="8" width="164" height="22" fill="none" stroke="#6b6b6b" stroke-width="1.2"/>
  <text x="126" y="23" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">extract all text</text>
  <rect x="116" y="32" width="164" height="22" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="126" y="47" font-family="Georgia,serif" font-size="9" fill="#c25a35">layout analysis, then text</text>
  <path d="M282 20 H316" stroke="#6b6b6b" stroke-width="1.2"/><path d="M316 20 l-6 -3.5 v7 z" fill="#6b6b6b"/>
  <path d="M282 42 H316" stroke="#1a1a1a" stroke-width="1.2"/><path d="M316 42 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <text x="322" y="23" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">columns interleaved</text>
  <text x="322" y="47" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">headings, rows, page nos.</text>
  <text x="4" y="76" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">both paths chunk cleanly; only one of them chunks something true</text>
</svg>

Pulling all the text out of a PDF discards what makes it navigable. Headings
vanish, so chunks lose their subject. Tables become a stream of numbers with no
column association. Running headers appear in every chunk as noise.

**Keep the page number and source location with every chunk.** It costs nothing
at ingest and buys citations, click-to-source review, and the ability to debug a
bad answer by opening the original page. Retrofitting it means reprocessing the
whole corpus.

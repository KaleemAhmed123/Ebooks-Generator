## Document Parsing Pipeline

Turning heterogeneous source formats into clean text with structure preserved.
Most retrieval quality is won or lost here, before any model is involved.

PDFs run through a naive text extractor lost every table and heading. Switching
to a layout-aware parser improved answers more than changing the model did.

### How it works

Everything downstream inherits whatever the parser produced. A chunk can only be
as good as the text it was cut from, and a model can only answer from what it
was handed.

The naive approach — pull all the text out of the PDF — discards exactly what
makes a document navigable. Headings vanish, so chunks lose their subject.
Tables become a stream of numbers with no column association. Running headers
and footers appear in every chunk as noise.

Format-aware parsing keeps the structure: which lines are headings, which
regions are tables, what the reading order is, which page each piece came from.

**Why this matters more than it looks:** a retrieval failure caused by bad
parsing is indistinguishable from a model failure when you are looking at the
output. Teams spend weeks on prompts and model choice when the real problem was
a parser that scrambled a two-column page into interleaved nonsense.

### In practice

Keep the page number and source location with every chunk. It costs nothing at
ingest time and it buys three things at once: citations, click-to-source
verification for reviewers, and the ability to debug a bad answer by opening the
original page.

Retrofitting it means reprocessing the entire corpus, which is why it belongs in
the first version rather than the second.

## Retrieval Evaluation Set

Questions paired with the chunk IDs that genuinely contain their answer, decided
by a human reading the corpus — not by what the current system returns. A set
built from current output only measures whether the system still agrees with
itself.

It isolates the first of two stages that fail independently. recall@k — did the
right chunk appear in the top k — plus mean reciprocal rank and nDCG all score
retrieval without calling a generation model, so they run in seconds on every
ingest change. "Answers are bad" becomes "recall@10 is 61%", which has fixes,
none of them in the prompt.

**Deliberately include questions your corpus cannot answer.** The correct
behaviour is returning nothing above threshold. A system that always returns its
best five chunks fails that case while scoring perfectly well on everything
else.

## Retrieval-Augmented Generation

*RAG*

Fetching relevant documents at query time and placing them in the prompt, so the
model answers from text it can see rather than from what it absorbed during
training. Named by Lewis et al. at NeurIPS 2020, which paired a sequence-to-
sequence generator with a dense vector index over Wikipedia.

The pipeline has stayed fixed even as every component in it changed: split the
corpus into chunks, embed each one, store the vectors, embed the incoming
question, retrieve the nearest chunks, prepend them to the prompt.

<svg viewBox="0 0 460 94" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Documents are chunked and embedded into a vector store ahead of time; at query time the question retrieves the nearest chunks from that store, which are prepended to the prompt before the model answers">
  <rect x="4" y="6" width="86" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="47" y="21" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">documents</text>
  <path d="M90 17 H112" stroke="#1a1a1a" stroke-width="1.2"/><path d="M112 17 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="114" y="6" width="86" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="157" y="21" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">chunk + embed</text>
  <path d="M200 17 H222" stroke="#1a1a1a" stroke-width="1.2"/><path d="M222 17 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="224" y="6" width="86" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="267" y="21" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">vector store</text>
  <text x="318" y="21" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">built ahead of time</text>

  <path d="M267 28 V40 H154 V48" stroke="#1a1a1a" stroke-width="1.2"/><path d="M154 50 l-4 -7 h8 z" fill="#1a1a1a"/>

  <rect x="4" y="52" width="80" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="44" y="67" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">question</text>
  <path d="M84 63 H104" stroke="#1a1a1a" stroke-width="1.2"/><path d="M104 63 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="106" y="52" width="96" height="22" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="154" y="67" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">top-k chunks</text>
  <path d="M202 63 H222" stroke="#1a1a1a" stroke-width="1.2"/><path d="M222 63 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="224" y="52" width="76" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="262" y="67" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">prompt</text>
  <path d="M300 63 H320" stroke="#1a1a1a" stroke-width="1.2"/><path d="M320 63 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="322" y="52" width="70" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="357" y="67" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">answer</text>
  <text x="4" y="90" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">everything downstream inherits whatever the shaded box got wrong</text>
</svg>

**RAG moves where the knowledge lives; it does not stop invention.** A model
handed five chunks can still assert a sixth thing present in none of them.
Groundedness checking is a separate control, not something you get free.

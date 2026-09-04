## Batching & Continuous Batching

Serving many sequences through the GPU together, because decoding spends most of
its time waiting on memory rather than computing. Static batching runs a group
and waits for every member to finish, so a twenty-token reply sits completed but
holds its slot until the two-thousand-token reply beside it is done. Continuous
batching works per generation step: a finished sequence frees its slot
immediately and a waiting request takes it.

<svg viewBox="0 0 460 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Under static batching a short request holds an idle slot until the longest request in its batch finishes; under continuous batching the freed slot is refilled at the next generation step">
  <text x="4" y="12" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">STATIC</text>
  <rect x="70" y="18" width="70" height="12" fill="#c25a35"/>
  <rect x="140" y="18" width="180" height="12" fill="#fdece5" stroke="#6b6b6b" stroke-width="0.6"/>
  <text x="326" y="28" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">done, still holding a slot</text>
  <rect x="70" y="34" width="250" height="12" fill="#1a1a1a"/>
  <text x="326" y="44" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">everyone waits for this one</text>
  <text x="4" y="68" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">CONTINUOUS</text>
  <rect x="70" y="60" width="70" height="12" fill="#c25a35"/>
  <rect x="142" y="60" width="86" height="12" fill="#c25a35" fill-opacity=".55"/>
  <rect x="230" y="60" width="90" height="12" fill="#c25a35" fill-opacity=".3"/>
  <text x="326" y="70" font-family="Georgia,serif" font-size="9" fill="#c25a35">slot refilled every step</text>
  <rect x="70" y="76" width="250" height="12" fill="#1a1a1a"/>
  <text x="326" y="86" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">unaffected either way</text>
</svg>

**This is why you run a purpose-built server rather than a loop around the
model.** The PagedAttention paper reports vLLM at two to four times the
throughput of FasterTransformer and Orca at the same latency. It also explains
something you see on hosted APIs: one very long generation in your traffic can
affect requests that have nothing to do with it.

## BM25

*Okapi BM25*

The scoring function behind keyword search. It rates a document on how often the
query's terms appear, weighted by how rare each term is across the corpus, and
damped so a term occurring fifty times does not score fifty times higher. Lucene
— and therefore Elasticsearch and OpenSearch — defaults to `k1 = 1.2` and
`b = 0.75`, where `k1` sets that damping and `b` how hard long documents are
penalised.

BM25 is the sparse half of hybrid retrieval. It matches literal tokens, so it
finds the part number, the error code and the surname that an embedding smooths
away. It finds nothing at all for a paraphrase.

**Its failures and an embedding's failures are near-opposites, which is why they
are run together.** Anthropic's contextual-retrieval experiment cut top-20
retrieval failure from 3.7% to 2.9% by adding BM25 to embeddings alone.

## Batching & Continuous Batching

Serving many requests through the GPU together. Continuous batching adds and
removes sequences mid-flight instead of waiting for the slowest to finish.

Static batching makes a twenty-token reply wait for a two-thousand-token one in
the same batch. Continuous batching raises throughput several-fold on identical
hardware.

### How it works

A GPU processing one request at a time is badly underused, because decoding
spends most of its time waiting on memory rather than computing. Batching runs
several requests together so that idle time gets filled.

Static batching gathers a group, runs it, and waits for every member to finish
before starting the next group. The flaw is visible as soon as you draw it: a
short reply sits completed but stuck, holding its slot, until the longest reply
in its batch is done.

Continuous batching works at the level of individual generation steps. When a
sequence finishes, its slot frees immediately and a waiting request takes it.
Nothing waits on anything unrelated to it.

<svg viewBox="0 0 460 104" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Under static batching a short request holds an idle slot until the longest finishes; under continuous batching the freed slot is immediately refilled">
  <text x="4" y="12" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">STATIC</text>
  <rect x="70" y="18" width="70" height="12" fill="#c25a35"/>
  <rect x="140" y="18" width="180" height="12" fill="#e8e8e8"/>
  <text x="326" y="28" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">done, still holding a slot</text>
  <rect x="70" y="34" width="250" height="12" fill="#1a1a1a"/>
  <text x="326" y="44" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">everyone waits for this one</text>
  <text x="4" y="70" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">CONTINUOUS</text>
  <rect x="70" y="62" width="70" height="12" fill="#c25a35"/>
  <rect x="142" y="62" width="86" height="12" fill="#c25a35" fill-opacity=".55"/>
  <rect x="230" y="62" width="90" height="12" fill="#c25a35" fill-opacity=".3"/>
  <text x="326" y="72" font-family="Georgia,serif" font-size="9" fill="#c25a35">slot refilled every step</text>
  <rect x="70" y="78" width="250" height="12" fill="#1a1a1a"/>
  <text x="326" y="88" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">unaffected either way</text>
</svg>

### In practice

This is the main reason to run a purpose-built server such as vLLM or TGI rather
than a hand-written loop around the model. Continuous batching, paged KV cache
management and optimised kernels are all hard to implement well, and the gap is
large enough to change which hardware you need.

Worth knowing even if you only call hosted APIs: it explains why provider
throughput and pricing behave the way they do, and why a very long generation in
your traffic can affect requests that have nothing to do with it.

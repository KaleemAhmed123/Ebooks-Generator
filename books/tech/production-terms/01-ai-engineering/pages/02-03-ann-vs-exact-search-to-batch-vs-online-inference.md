## ANN vs Exact Search

*approximate nearest neighbour*

Exact search compares the query against every stored vector: correct, and linear
in corpus size. Approximate search builds a graph or a partition that reaches
the right neighbourhood while skipping nearly everything, and sometimes misses a
true neighbour. The fraction it does find is **recall**.

<svg viewBox="0 0 460 82" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Exact search compares the query against every vector in the corpus; approximate search visits only the candidates its index reaches, so a missed neighbour produces no error and no log line">
  <text x="4" y="14" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">ONE QUERY, N VECTORS</text>
  <rect x="4" y="22" width="214" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="14" y="37" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">exact — compare all N</text>
  <text x="210" y="37" text-anchor="end" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">recall 1.0</text>
  <rect x="242" y="22" width="214" height="22" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <text x="252" y="37" font-family="Georgia,serif" font-size="9.5" fill="#c25a35">ANN — visit ef_search candidates</text>
  <text x="448" y="37" text-anchor="end" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">recall &lt; 1.0</text>
  <text x="4" y="62" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">a missed neighbour raises no error and writes no log line —</text>
  <text x="4" y="76" font-family="Georgia,serif" font-size="9.5" fill="#6b6b6b">it is a slightly worse answer nobody can point at</text>
</svg>

Recall is a dial, not a property of the index. In pgvector 0.8, HNSW search
effort is `hnsw.ef_search`, default 40; raising it raises recall and latency
together.

**Measure recall rather than assuming it.** Take a few hundred real queries,
compute exact results as ground truth, and check what fraction your
configuration returns. Re-measure after every index rebuild and every parameter
change — both move it, and neither announces it.

## Batch vs Online Inference

Online inference serves someone watching a spinner, so latency binds and you pay
standard rates. Batch submits a large job and collects results later. Anthropic's
Message Batches API is 50% off standard pricing, with most batches finishing in
under an hour as of September 2026.

The distinction is who is waiting, not how much volume there is. Backfilling
embeddings, classifying a historical archive, nightly enrichment, generating
evaluation results, reprocessing after a parser fix — nobody is watching any of
it, and running it through the online API leaves the discount on the table
quarter after quarter.

**Batch changes the failure model, and that is the part to design for rather
than discover.** Results arrive asynchronously and partial failure is the normal
case, so count submitted, completed and failed per job. Without those three
counters you cannot tell "finished" from "half of it silently vanished".

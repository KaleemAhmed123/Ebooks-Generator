## Vector Index Rebuild

*blue-green swap*

Building a new index in a separate namespace, verifying it, and switching reads
only then — instead of mutating the live one. A new embedding model, a different
chunk size or a metadata change all force a full rebuild.

Updating in place is the instinct, because the pipeline already upserts. It
leaves the index half old and half new for however long reprocessing takes,
internally inconsistent throughout, with retrieval quality nobody can predict.

<svg viewBox="0 0 460 86" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The live index keeps serving reads while a second index is built and verified beside it, and reads are switched only after verification passes">
  <rect x="4" y="10" width="120" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="64" y="27" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">index_v1 (serving)</text>
  <rect x="4" y="48" width="120" height="26" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="64" y="65" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">index_v2 (filling)</text>
  <path d="M124 23 H176" stroke="#1a1a1a" stroke-width="1.2"/><path d="M176 23 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="182" y="26" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">reads</text>
  <path d="M124 61 H176" stroke="#1a1a1a" stroke-width="1.2" stroke-dasharray="3 3"/>
  <rect x="182" y="48" width="104" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="234" y="65" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">verify, then swap</text>
  <path d="M286 61 H322" stroke="#1a1a1a" stroke-width="1.2"/><path d="M322 61 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="328" y="64" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">reads</text>
  <text x="4" y="84" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">rollback is a pointer change, not another rebuild</text>
</svg>

Verify before the swap: document counts, spot checks on known queries, recall
measured against the evaluation set.

**Keep the old index for a defined window afterwards.** Retrieval regressions
surface over days, not minutes.

## Ingestion Pipeline

The path from source document to indexed, retrievable chunk. Each stage fails
differently and needs its own counters and retry semantics.

A pipeline that silently drops PDFs it cannot parse leaves gaps nobody notices
until a user asks about a missing document. Per-stage counters make the gap
visible the same day.

### How it works

Between a source document and a retrievable chunk sit half a dozen stages —
fetch, parse, clean, chunk, enrich, embed, upsert — and each fails in its own
way.

**The characteristic failure of these pipelines is silence.** A PDF the parser
cannot read produces zero chunks. An embedding call that times out produces
nothing. In both cases the pipeline continues happily, the document is simply
absent, and nothing anywhere records that it should have been there.

<svg viewBox="0 0 460 58" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Documents pass through fetch, parse, chunk, embed and upsert stages, with a count recorded at every boundary so a drop is visible">
  <text x="4" y="14" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">count at every boundary</text>
  <g font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
    <rect x="4" y="20" width="62" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.1"/><text x="35" y="34" text-anchor="middle">fetch</text>
    <rect x="80" y="20" width="62" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.1"/><text x="111" y="34" text-anchor="middle">parse</text>
    <rect x="156" y="20" width="62" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.1"/><text x="187" y="34" text-anchor="middle">chunk</text>
    <rect x="232" y="20" width="62" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.1"/><text x="263" y="34" text-anchor="middle">embed</text>
    <rect x="308" y="20" width="62" height="20" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.2"/><text x="339" y="34" text-anchor="middle" fill="#c25a35">upsert</text>
  </g>
  <g stroke="#1a1a1a" stroke-width="1.1" fill="#1a1a1a">
    <path d="M68 30 H76"/><path d="M76 30 l-5 -3 v6 z"/>
    <path d="M144 30 H152"/><path d="M152 30 l-5 -3 v6 z"/>
    <path d="M220 30 H228"/><path d="M228 30 l-5 -3 v6 z"/>
    <path d="M296 30 H304"/><path d="M304 30 l-5 -3 v6 z"/>
  </g>
  <text x="380" y="34" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">counts stop</text>
  <text x="380" y="45" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">matching → found it</text>
</svg>

Failures belong in a dead-letter queue with the reason attached, never in a
swallowed exception.

### In practice

Make the pipeline idempotent and resumable, keyed on a stable document
identifier plus a content hash.

You **will** reprocess — after a parser fix, a chunking change, an embedding
upgrade — and reprocessing must update in place rather than creating a second
copy of everything. Designing that in costs a few lines. Retrofitting it after a
duplicated corpus costs a week and a rebuild.

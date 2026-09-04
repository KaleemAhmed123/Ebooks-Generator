## Memory

*short-term vs long-term*

Two unrelated mechanisms sharing one word. Short-term memory is the conversation
your application resends in the context window every turn: exact, complete, bounded
by the window, and stored nowhere. Long-term memory is a store you retrieve from —
it survives sessions and is effectively unbounded, but only the part you retrieved
exists on any given turn.

<svg viewBox="0 0 460 74" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The context window holds recent turns and is resent every turn, while a separate store holds extracted facts of which only the retrieved ones enter the window">
  <rect x="4" y="12" width="180" height="34" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="94" y="26" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">context window</text>
  <text x="94" y="39" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">resent in full, every turn</text>
  <rect x="286" y="12" width="170" height="34" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="371" y="26" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">store — extracted facts</text>
  <text x="371" y="39" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">survives the session</text>
  <path d="M286 29 H190" stroke="#c25a35" stroke-width="1.2"/><path d="M190 29 l7 -4 v8 z" fill="#c25a35"/>
  <text x="200" y="24" font-family="Consolas,monospace" font-size="8" fill="#c25a35">only what you retrieve</text>
  <text x="4" y="68" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">the arrow is the whole design — everything not on it is invisible this turn</text>
</svg>

Working systems summarise older turns on the left and store facts rather than
transcripts on the right. Keeping every message and injecting all of it overflows
the window and crowds out what mattered.

**What to remember is a product question.** An assistant confidently applying
something the user said once, months ago, in another context, lands worse than one
that forgot.

## Metadata Filtering

Restricting a vector search by structured attributes stored beside each vector —
tenant, date, document type. Embeddings capture meaning, not facts, so these
constraints have to live outside them.

There are two ways to combine a filter with the search, and the difference is not
cosmetic. Post-filtering searches first and drops non-matching hits: fast, and it
returns nothing at all when the top results happen to belong to other tenants.
Pre-filtering restricts the candidate set up front: always correct, and it can
wreck HNSW performance, since the graph was built over every vector and traversal
now wanders past disallowed nodes to reach each permitted one.

**For one tenant among thousands, stop filtering.** Use a separate collection or
namespace. The constraint stops being a filter and becomes which index you
searched, which is both correct and fast.

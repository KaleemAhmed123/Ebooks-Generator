## Parent-Child / Small-to-Big Retrieval

Embed small chunks for precise matching, but feed the model the larger parent
section for context.

A 200-token chunk matches precisely, and the model receives the full 2,000-token
section around it — so it has the definitions the chunk was referring to.

### How it works

Chunk size faces two opposing pressures at once, and most systems just pick a
compromise that serves neither.

**Small chunks are precise for matching.** One vector representing a single
focused idea gives a clean, unambiguous signal.

**Large chunks are better for reading.** They carry the surrounding context —
the heading, the definitions, the sentence establishing what "the rate" refers
to — that the model needs in order to answer.

<svg viewBox="0 0 460 66" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A small child chunk is matched by the search, and its larger parent section is what gets sent to the model">
  <rect x="4" y="10" width="150" height="42" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="79" y="24" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">parent section</text>
  <rect x="16" y="30" width="60" height="14" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.2"/>
  <text x="46" y="41" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#c25a35">child</text>
  <text x="176" y="24" font-family="Georgia,serif" font-size="9.5" fill="#c25a35">search matches the child — precise</text>
  <text x="176" y="42" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">the parent is what the model reads</text>
</svg>

Small-to-big refuses the trade-off. Embed and search over small chunks; when one
matches, return its parent section instead. The only cost is storing the
relationship and one extra lookup.

### In practice

It is especially effective on structured documents — contracts, policies,
technical manuals — where a clause is meaningless without its section. "This
shall not apply in such cases" is useless alone and clear in place.

**Watch total context size.** Several expanded parents consume a window quickly,
so cap how many you expand. Expanding all ten matches turns a precision
technique into the context-stuffing problem it was meant to avoid.

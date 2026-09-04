## Hybrid Search

Running dense vector retrieval and sparse keyword retrieval over one query and
merging the two result lists. Dense matches meaning — it connects "can't log in"
to "authentication failure" with no shared words. Sparse matches literal tokens
weighted by rarity, which is the only thing that reliably finds `ERR_4471`.

Real queries carry both kinds of content in a single sentence, so each retriever
covers the other's blind spot.

<svg viewBox="0 0 460 82" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One query fans out to a dense retriever and a sparse retriever, whose ranked lists are combined by reciprocal rank fusion into a single merged list">
  <rect x="4" y="30" width="66" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="37" y="45" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">query</text>
  <path d="M70 38 L104 18" stroke="#1a1a1a" stroke-width="1.2"/><path d="M106 17 l-8 1 4 5 z" fill="#1a1a1a"/>
  <path d="M70 46 L104 66" stroke="#1a1a1a" stroke-width="1.2"/><path d="M106 67 l-4 -7 -4 5 z" fill="#1a1a1a"/>
  <rect x="110" y="6" width="118" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="169" y="20" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">dense — meaning</text>
  <rect x="110" y="56" width="118" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="169" y="70" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">sparse — ERR_4471</text>
  <path d="M228 17 L262 36" stroke="#1a1a1a" stroke-width="1.2"/><path d="M264 37 l-4 -7 -4 5 z" fill="#1a1a1a"/>
  <path d="M228 67 L262 48" stroke="#1a1a1a" stroke-width="1.2"/><path d="M264 47 l-8 1 4 5 z" fill="#1a1a1a"/>
  <rect x="268" y="30" width="126" height="24" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="331" y="45" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">rank fusion, not scores</text>
  <path d="M394 42 H428" stroke="#c25a35" stroke-width="1.2"/><path d="M428 42 l-7 -4 v8 z" fill="#c25a35"/>
</svg>

**The merge is where the design actually lives.** The two score scales are
incompatible, so adding them lets one dominate. Reciprocal rank fusion avoids
normalising anything by scoring positions: each list contributes `1 / (k + rank)`,
summed, with `k` defaulting to 60 in Elasticsearch.

## Idempotent Tool Design

Building a tool so that calling it twice for one intent has the effect of one
call. Agents retry: the model may not see a result, may judge the first attempt
failed, or may call the same thing twice. Normal behaviour, not a bug to
eliminate.

So any tool with a side effect will eventually run twice for one intent. If
`send_email` is not idempotent that is two emails; if `create_refund` is not, that
is finance calling. Fix it the way a distributed consumer does: accept a key
identifying the intent, store it with the result, return that result on a repeat.
Prefer a natural key — the order ID, the message ID.

**A key generated fresh per attempt defeats the whole thing.** Every retry gets a
new key and executes again, while the tool passes review looking idempotent.

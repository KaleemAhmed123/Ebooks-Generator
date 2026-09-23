## Purging and cache keys

- A purge is a broadcast to every point of presence, and it is neither instant nor free. The design question is how to avoid needing one

| Strategy | How a change takes effect | Cost |
|---|---|---|
| Versioned URL | the HTML points at a new filename; the old one is simply abandoned | none — nothing is ever purged |
| Purge by URL | one key is dropped at every PoP | a broadcast, and propagation lag |
| Purge by tag | every object carrying a tag is dropped | a broadcast over a set nobody enumerated |
| Purge everything | the whole cache is emptied | the origin takes 100 % of traffic |

- Versioned URLs are the default for anything built by a pipeline. A content hash in the filename means the URL changes exactly when the bytes change, so the old copy can stay cached forever and the new one is fetched because it is a different key — no invalidation problem exists to solve
- The **cache key** decides what "the same response" means, and `Vary` extends it. `Vary: Accept-Encoding` is routine. `Vary: Cookie` is close to fatal, because every distinct cookie value becomes its own cache entry and the hit rate collapses to nothing while the CDN bill does not

### The failure

- Purge-everything on deploy. It is one button and it empties every PoP at once, so the next second the entire live traffic of the site misses at the edge and arrives at an origin that has been protected by a 95 % hit rate for months and is sized accordingly
- It is the cold start of Module 8, page 7, with the whole internet on the other side. The origin was never capacity-tested for this, and the deploy that triggered it looks unrelated
- Versioned URLs avoid it by construction: new assets are fetched gradually as users pick up the new HTML, so the shift in origin load is spread over however long it takes the HTML's own short TTL to turn over

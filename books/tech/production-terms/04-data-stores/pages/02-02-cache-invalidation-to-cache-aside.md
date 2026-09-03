## Cache Invalidation

Removing or updating stale entries. It is hard because correctness depends on
knowing every key derived from a piece of data — and nothing tracks that for
you.

A user changes their name. You invalidate `user:42` and forget `feed:99`, which
embedded the old name three weeks ago.

| Strategy | Trade |
|---|---|
| TTL only | simple, staleness is bounded but real |
| Explicit delete | precise, and you will miss a key |
| Version in the key — `user:42:v7` | no invalidation at all; old keys age out |
| Tag-based purge | correct, needs a tag index you now maintain |

## Cache-Aside

*lazy loading*

The default pattern: read the cache, and on a miss read the database and
populate it. Simple, and every miss pays the full latency.

The first request for a product takes 120ms and warms the cache. The next ten
thousand take 2ms.

<svg viewBox="0 0 460 66" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A read checks the cache; a hit returns immediately, a miss queries the database, writes the value back with a TTL and then returns">
  <text x="4" y="34" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">GET key</text>
  <path d="M56 30 H84 M84 14 V50 M84 14 H108 M84 50 H108" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M108 14 l-6 -3.5 v7 z M108 50 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="112" y="4" width="86" height="20" fill="#e2fcf3" stroke="#2a5673" stroke-width="1.3"/>
  <text x="155" y="18" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#2a5673">hit — return</text>
  <rect x="112" y="40" width="86" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="155" y="54" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">miss</text>
  <path d="M200 50 H224" stroke="#1a1a1a" stroke-width="1.2"/><path d="M224 50 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="228" y="40" width="80" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="268" y="54" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">query DB</text>
  <path d="M310 50 H334" stroke="#1a1a1a" stroke-width="1.2"/><path d="M334 50 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="338" y="40" width="118" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="397" y="54" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">SET key ttl</text>
</svg>

The application owns the cache logic, which is why this is the pattern people
reach for first. Pair it with a lock on hot keys, or a popular miss becomes a
stampede.

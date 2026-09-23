# Module 8 - Caching

## Why and where to cache

- A cache trades memory and staleness for latency and load. The second half of that trade is the part that gets designed last and hurts most, because every layer that holds a copy is a layer that must be persuaded to let go

<svg viewBox="0 0 460 98" role="img" aria-label="Five layers that can hold a cached copy, from the browser nearest the user to the database buffer pool furthest away. The browser cannot be reached once a response has been sent. A CDN is purged through an API in seconds. A gateway is purged or left to expire. The application cache is deleted on write. The database buffer pool manages itself. Closer to the user means faster and cheaper, and further from any ability to invalidate. An orange cross marks caching the same object at all five layers: the profile photo changes in the database and the user keeps seeing the old one for a day." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="6" y="14" font-size="7.5">closer to the user: faster and cheaper, and further out of reach when it has to change</text>
  <rect x="6" y="26" width="80" height="28" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="46" y="38" text-anchor="middle" font-size="7.5">browser</text><text x="46" y="48" text-anchor="middle" font-size="6">cannot be reached</text>
  <rect x="98" y="26" width="80" height="28" rx="3" fill="#fff" stroke="#1d4e89"/><text x="138" y="38" text-anchor="middle" font-size="7.5">CDN</text><text x="138" y="48" text-anchor="middle" font-size="6">purge API, seconds</text>
  <rect x="190" y="26" width="80" height="28" rx="3" fill="#fff" stroke="#1d4e89"/><text x="230" y="38" text-anchor="middle" font-size="7.5">gateway</text><text x="230" y="48" text-anchor="middle" font-size="6">purge or wait for TTL</text>
  <rect x="282" y="26" width="80" height="28" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="322" y="38" text-anchor="middle" font-size="7.5">app cache</text><text x="322" y="48" text-anchor="middle" font-size="6">delete on write</text>
  <rect x="374" y="26" width="80" height="28" rx="3" fill="#f3f3f3" stroke="#666"/><text x="414" y="38" text-anchor="middle" font-size="7.5">DB buffer pool</text><text x="414" y="48" text-anchor="middle" font-size="6">manages itself</text>
  <text x="6" y="76" font-size="7">each layer is a separate copy with its own lifetime; a change is visible only once every layer holding it has let go</text>
  <text x="6" y="92" font-size="7.5" fill="#bf4c28">✕ the same object cached at all five: the photo changes in the database and the user sees the old one all day</text>
</svg>

- The browser is the one worth staring at. Once a response carries a long `max-age` it is gone — no purge, no API, no way to reach it short of changing the URL. Anything that might need to change urgently is either not cached there or cached under a URL that changes with the content
- Pick one or two layers and mean it. Caching at every layer feels thorough and produces five independent staleness windows that compound: worst-case staleness is the sum, and the incident is a user seeing old data through a path nobody drew

### The failure

- Five copies, five invalidation mechanisms, no single owner. Changing a value now means a database write, a Redis delete, a CDN purge, a gateway reload and a browser that ignores all of it — and each is a separate system that can silently fail
- Nobody designed this. It accreted, one reasonable optimisation at a time, and the cost only appears the first time something has to change quickly

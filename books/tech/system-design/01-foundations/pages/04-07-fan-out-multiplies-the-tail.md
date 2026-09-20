## 1% slow × 100 servers = 63% slow

- A request that fans out to N backends waits for the slowest one. Even if each backend is fine at p99, the fan-out amplifies the tail
- **The math:** if each server has a 1% chance of being slow, the probability that at least one of 100 is slow is 1 − 0.99¹⁰⁰ ≈ **63%**
- At 1-in-10,000 per server across 2,000 servers, "almost one in five" requests hits the tail

<svg viewBox="0 0 460 82" role="img" aria-label="A root request fans out to 100 leaf servers; one leaf is slow (red), making the entire request slow because it waits for the last" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="4" y="28" width="56" height="24" rx="3" fill="none" stroke="#1a1a1a"/><text x="32" y="44" text-anchor="middle">root</text>
  <path d="M60 34 L100 14" stroke="#1a1a1a" fill="none"/><path d="M100 14 l-7 -1 v6 z" fill="#1a1a1a"/>
  <path d="M60 40 L100 40" stroke="#1a1a1a" fill="none"/><path d="M100 40 l-7 -4 v8 z" fill="#1a1a1a"/>
  <path d="M60 46 L100 66" stroke="#1a1a1a" fill="none"/><path d="M100 66 l-7 -5 v6 z" fill="#1a1a1a"/>
  <g font-size="8">
    <rect x="104" y="4" width="40" height="16" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="124" y="15" text-anchor="middle">1 ms</text>
    <rect x="150" y="4" width="40" height="16" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="170" y="15" text-anchor="middle">1 ms</text>
    <rect x="196" y="4" width="40" height="16" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="216" y="15" text-anchor="middle">1 ms</text>
    <text x="250" y="15" fill="#6b6b6b">… × 100</text>
    <rect x="104" y="30" width="40" height="16" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="124" y="41" text-anchor="middle">1 ms</text>
    <rect x="150" y="30" width="180" height="16" rx="2" fill="none" stroke="#b8541a"/><text x="240" y="41" text-anchor="middle" fill="#b8541a">800 ms (the slow one)</text>
    <rect x="104" y="56" width="40" height="16" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="124" y="67" text-anchor="middle">1 ms</text>
    <rect x="150" y="56" width="40" height="16" rx="2" fill="#e2fcf3" stroke="#1d4e89"/><text x="170" y="67" text-anchor="middle">1 ms</text>
  </g>
  <text x="370" y="44" fill="#6b6b6b" font-size="8.5">user sees 800 ms</text>
</svg>

- This is why a per-server p99 of 5 ms can produce a user-facing p50 of 800 ms. The backend looks fine; the user does not

### The failure

- Monitoring per-server p99 and reporting "all systems nominal" while the user-facing p50 has tripled. The dashboard is right; the user's experience is the product of a hundred dashboards

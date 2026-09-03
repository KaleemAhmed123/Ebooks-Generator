## Token Bucket

The rate-limit algorithm that allows bursts. Tokens refill at a steady rate,
each request spends one, an empty bucket is a rejection.

A bucket holds 100 tokens and refills at 10 a second. A client that has been
idle can fire 100 requests instantly, then is held to 10/sec. Generous to normal
traffic, and the long-run average is still capped.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tokens refill into a bucket at ten per second and each request spends one, so a request is served while tokens remain and rejected with a 429 when the bucket is empty">
  <text x="4" y="14" font-family="Consolas,monospace" font-size="8.5" fill="#d0212f">refill +10/sec</text>
  <path d="M56 18 V32" stroke="#d0212f" stroke-width="1.2"/><path d="M56 34 l-4 -7 h8 z" fill="#d0212f"/>
  <rect x="4" y="38" width="230" height="26" fill="#e2fcf3" stroke="#d0212f" stroke-width="1.6"/>
  <rect x="12" y="45" width="14" height="12" fill="#1a1a1a"/><rect x="34" y="45" width="14" height="12" fill="#1a1a1a"/>
  <rect x="56" y="45" width="14" height="12" fill="#1a1a1a"/><rect x="78" y="45" width="14" height="12" fill="#1a1a1a"/>
  <rect x="100" y="45" width="14" height="12" fill="#1a1a1a"/><rect x="122" y="45" width="14" height="12" fill="#1a1a1a"/>
  <rect x="144" y="45" width="14" height="12" fill="#1a1a1a"/><rect x="166" y="45" width="14" height="12" fill="#1a1a1a"/>
  <rect x="188" y="45" width="14" height="12" fill="#1a1a1a"/><rect x="210" y="45" width="14" height="12" fill="#1a1a1a"/>
  <text x="119" y="78" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">capacity 100 — the burst you agreed to absorb</text>
  <path d="M234 51 H262 M262 37 V65 M262 37 H272 M262 65 H272" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M274 37 l-7 -4 v8 z" fill="#1a1a1a"/><path d="M274 65 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="248" y="47" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">−1</text>
  <rect x="278" y="26" width="178" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="367" y="41" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">token available → served</text>
  <rect x="278" y="54" width="178" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="367" y="69" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">bucket empty → 429</text>
</svg>

Capacity is the burst, and it is usually set by whoever liked the number. A cap
of 1,000 lets one idle client put a thousand concurrent queries into your
database inside a second — within the limit, and indistinguishable from an
attack.

## USE Method

For every resource: Utilisation, Saturation, Errors. The counterpart to RED,
applied to CPU, memory, disk, network and connection pools.

| Metric | What it holds |
|---|---|
| Utilisation | proportion of time busy |
| Saturation | work queued and waiting |
| Errors | failed operations |

CPU utilisation at 60% reads as spare capacity until you check saturation: a run
queue twelve deep means processes are waiting while the CPU is "only" 60% busy.
Utilisation on its own is the number that makes an overloaded box look healthy.

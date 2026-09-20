## Serial vs parallel — Dean's thumbnail example

- Jeff Dean's 2010 worked example: read 30 thumbnails, each requiring a disk seek and a transfer

```
Serial
  30 seeks × 10 ms  +  30 × 256 KB / 30 MB/s  =  300 ms + 256 ms  ≈  560 ms

Parallel (all 30 at once)
  1 seek × 10 ms  +  256 KB / 30 MB/s  ≈  18 ms
```

- Dean's own note: "really more like 30–60 ms" because the slowest of 30 parallel requests is not the median — it is the tail

<svg viewBox="0 0 460 68" role="img" aria-label="Serial: 30 blocks in sequence totalling 560 ms. Parallel: 30 blocks start together, finish around 30-60 ms because of tail variance" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <text x="8" y="16" font-size="8.5" fill="#6b6b6b">serial</text>
  <rect x="54" y="6" width="350" height="14" rx="2" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="229" y="17" text-anchor="middle" font-size="8">30 seeks + 30 reads → 560 ms</text>
  <text x="8" y="44" font-size="8.5" fill="#6b6b6b">parallel</text>
  <rect x="54" y="34" width="30" height="14" rx="2" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="69" y="45" text-anchor="middle" font-size="8">18 ms</text>
  <rect x="84" y="34" width="30" height="14" rx="2" fill="none" stroke="#6b6b6b" stroke-dasharray="2 2"/>
  <text x="99" y="45" text-anchor="middle" font-size="8" fill="#6b6b6b">+tail</text>
  <text x="130" y="45" font-size="8" fill="#6b6b6b">30–60 ms (Dean's "really more like")</text>
  <text x="8" y="64" font-size="8" fill="#6b6b6b">speedup: 10–30× from parallelism alone</text>
</svg>

### The tail, again

- The arithmetic said 18 ms. The tail said 30–60 ms. That gap is Module 4's fan-out lesson: the slowest of N parallel calls sets the latency
- In an interview, do the parallel estimate, then add: "the tail of 30 requests will push this to 2–3× the single-request time"

### The failure

- Presenting the 18 ms number as the answer. The interviewer knows the tail. Showing that you know it too is the point

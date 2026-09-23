## Fixed and sliding windows

- A fixed window is a counter that resets on the clock. It is the cheapest correct-looking limiter and it permits twice the limit across any boundary, because the reset is a moment both bursts are allowed to straddle

<svg viewBox="0 0 460 124" role="img" aria-label="Two ways to count. A fixed window with a limit of 100 per minute: 100 requests arrive at the end of the 12:00 window and 100 more at the start of the 12:01 window, which is 200 requests in about two seconds while neither window exceeded its limit. Below, the weighted sliding window: the rate is the previous window's count multiplied by the fraction of it still inside the window, plus the current count. With 42 in the previous minute, 18 so far in this one and 75 per cent of the previous minute still overlapping, 42 times 0.75 plus 18 is 49.5, under a 50 per minute limit, so the request is allowed. It needs two counters per key and no timestamps. Cloudflare measured 0.003 per cent wrongly allowed or blocked over 400 million requests, with no false positives." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="13" font-size="7.5" fill="#bf4c28">fixed window, limit 100 per minute</text>
  <rect x="4" y="20" width="210" height="28" rx="3" fill="#fff" stroke="#999"/><text x="60" y="37" font-size="6.5" fill="#666">12:00 window</text>
  <rect x="224" y="20" width="210" height="28" rx="3" fill="#fff" stroke="#999"/><text x="330" y="37" font-size="6.5" fill="#666">12:01 window</text>
  <rect x="176" y="24" width="34" height="20" rx="2" fill="#fbe9e2" stroke="#bf4c28"/><text x="193" y="38" text-anchor="middle" font-size="7">100</text>
  <rect x="228" y="24" width="34" height="20" rx="2" fill="#fbe9e2" stroke="#bf4c28"/><text x="245" y="38" text-anchor="middle" font-size="7">100</text>
  <text x="219" y="60" text-anchor="middle" font-size="6.5" fill="#bf4c28">200 requests in about 2 seconds, and neither window ever exceeded 100</text>
  <text x="4" y="78" font-size="7" fill="#1d4e89">weighted sliding window: rate = previous × overlap + current</text>
  <rect x="4" y="84" width="446" height="26" rx="3" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="10" y="95" font-size="6.5">42 in the previous minute, 18 so far in this one, 75 % of the previous minute still inside the window:</text>
  <text x="10" y="106" font-size="6.5">42 × 0.75 + 18 = 49.5 → under a 50/min limit, so it is allowed. Two counters per key, no timestamps</text>
  <text x="4" y="121" font-size="6.5">over 400 M requests Cloudflare measured 0.003 % wrongly allowed or blocked, and no false positives</text>
</svg>

- A **sliding log** stores every timestamp and is exact, which is why nobody runs it at scale: a million an hour means a million timestamps per key, pruned and counted on every request
- The weighted approximation assumes the previous window's requests were spread evenly through it — wrong for any single key, and almost never wrong enough to matter, which is what the measured error rate says

:::interview
"Fixed window or sliding window?" — Fixed is one counter per key, and it lets a caller spend the whole limit at the end of one window and again at the start of the next, so the real limit is double the stated one across a boundary. A sliding log fixes that exactly and costs a stored timestamp per request, unaffordable at any serious rate. The weighted sliding window is what production runs: two counters per key, the previous one weighted by how much of it still overlaps, so the error is a rounding difference rather than a doubling. Use the log only where being exactly right beats the memory — rare for a limit, common for a billing quota.
:::

### The failure

- Publishing "100 per minute", enforcing a fixed window, and finding a client sustaining 200 — by spending its allowance at each boundary, which is what a client retrying on the reset time does naturally

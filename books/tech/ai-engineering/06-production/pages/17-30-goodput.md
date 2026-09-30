## Goodput: the metric that matters

- Raw throughput lies. A server bragging 30,000 tokens/second may be delivering most of them *too slowly to meet the SLO* — batched so deep that every user's TTFT and TPOT blew past the target. Those tokens are produced but useless.
- **Goodput** fixes this: tokens/second **that meet the latency SLO**. It counts only the requests served within your TTFT and TPOT targets. It is the honest capacity number.

<svg viewBox="0 0 340 86" role="img" aria-label="As batch size grows throughput keeps rising but goodput peaks then falls once the SLO is violated" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="30" y1="70" x2="320" y2="70" stroke="#888"/><line x1="30" y1="10" x2="30" y2="70" stroke="#888"/>
  <text x="175" y="82" text-anchor="middle" font-size="6" fill="#6b6b6b">batch size / concurrency →</text>
  <path d="M30 68 Q150 30 320 18" fill="none" stroke="#888" stroke-width="1.3"/><text x="300" y="14" font-size="6" fill="#6b6b6b">throughput</text>
  <path d="M30 68 Q120 26 175 26 Q230 30 320 62" fill="none" stroke="#24405e" stroke-width="1.6"/><text x="196" y="22" font-size="6" fill="#24405e">goodput</text>
  <circle cx="175" cy="26" r="2.5" fill="#a03050"/><text x="175" y="40" text-anchor="middle" font-size="5.5" fill="#a03050">SLO knee</text>
</svg>

- **The shape is the whole point.** Push concurrency up and throughput keeps climbing — but past a knee, so many requests miss the SLO that *goodput falls even as throughput rises*. You are producing more tokens that no longer count. The operating point you want is the goodput peak, not the throughput peak.
- To measure it you must first *define the SLO*: e.g. "TTFT ≤ 500 ms P95 **and** TPOT ≤ 50 ms P95." Only then can a token be classified as good or wasted.

:::interview
**"A vendor quotes 30k tokens/sec. What do you ask?"** At what **SLO**, and what is the **goodput**? Throughput without a latency bound is meaningless — I can hit any throughput number by batching deeper and making every user wait. I want tokens/second that meet a stated TTFT and TPOT at P95, plus the concurrency at which goodput peaks. That peak, not the headline throughput, is the real capacity I would size against.
:::

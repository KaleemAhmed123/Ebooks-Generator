## Reading serving benchmarks critically

- Every serving engine and platform publishes benchmarks showing it wins. They are almost all *true* and almost all *misleading*, because the result depends entirely on a setup that rarely matches yours. Benchmark literacy is a senior skill.

<svg viewBox="0 0 360 82" role="img" aria-label="A benchmark result depends on model, hardware, precision, input/output lengths, batch size, and prefix-share ratio" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="90" y="14" width="180" height="18" rx="3" fill="#24405e"/><text x="180" y="26" text-anchor="middle" fill="#fff" font-size="6">"3× faster!"</text>
  <g font-size="5.5" fill="#a03050"><text x="30" y="48">…on which model?</text><text x="140" y="48">…what precision?</text><text x="250" y="48">…what batch size?</text>
   <text x="30" y="62">…input/output lengths?</text><text x="150" y="62">…prefix-share ratio?</text><text x="260" y="62">…which GPU?</text></g>
  <text x="180" y="76" text-anchor="middle" font-size="6" fill="#6b6b6b">change any one and the winner can flip</text>
</svg>

- **The variables that flip a result.** Model and size, GPU generation, precision (FP16 vs FP8), the **input/output token distribution**, the **batch size / concurrency**, and — for prefix-caching engines — the **prefix-share ratio** (17-21). SGLang wins big on high-prefix-share traffic and ties elsewhere; a benchmark chosen to show its win uses high-prefix-share traffic.
- **What to ask of any benchmark:** at what SLO (or is it raw throughput, 17-30)? At what percentile? On what token distribution vs mine? At what batch size? Reproducible? A throughput number with no SLO, no percentile, and an undisclosed token mix is marketing.

:::interview
"A vendor benchmark says their engine is 3× faster. Do you believe it?"

I believe the *number* and distrust its *relevance*, until I know the setup. The result swings on model, GPU, precision, the input/output token distribution, batch size, and — for prefix-caching engines — the prefix-share ratio, so a benchmark is usually chosen where that engine wins. I'd ask: at what SLO and percentile (or is it raw throughput?), on what token mix versus my traffic, at what concurrency, and is it reproducible? Then I'd **reproduce it on my own workload** — my token distribution, my SLO, my hardware — because the only benchmark that matters is the one on your traffic. Treating vendor benchmarks as hypotheses to reproduce, not facts, is the signal.
:::

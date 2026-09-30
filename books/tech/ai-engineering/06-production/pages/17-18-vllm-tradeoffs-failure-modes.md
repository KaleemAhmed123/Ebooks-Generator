## vLLM in production: what breaks

- vLLM is the default, not a free lunch. The failures below are the ones that page you at 3am, and interviewers ask about the first two by name.

:::warn
**Preemption thrashing.** When the KV pool fills, the scheduler preempts running requests (evict or recompute their cache) to admit or continue others. Under sustained overload it preempts and restores the *same* requests repeatedly — throughput collapses while the GPU busies itself moving cache around. Symptom: throughput falls as load *rises*. Fix: cap admission (`--max-num-seqs`), add replicas, or shed load at the gateway before the pool saturates.
:::

- **OOM at startup vs under load.** Startup OOM is a `--gpu-memory-utilization` set too high for the box. Load OOM is the KV cache growing past what is left after weights — it shows only when context and concurrency peak, so it survives every light test and dies on launch day. Load-test at *peak* context × concurrency, never at idle.
- **Long-context tail latency.** One 100k-token request runs a huge prefill; without chunked prefill it stalls every other user. Cap `--max-model-len` to what the product needs, and keep chunked prefill on.
- **Quantised-model quality drift.** An INT4 model that benchmarks fine can degrade on your specific prompts. Always eval the quantised model on *your* data before shipping it (cluster 17-39).

<svg viewBox="0 0 300 74" role="img" aria-label="Throughput rises with load then collapses past the preemption knee" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="30" y1="60" x2="280" y2="60" stroke="#888"/><line x1="30" y1="10" x2="30" y2="60" stroke="#888"/>
  <text x="150" y="72" text-anchor="middle" font-size="6" fill="#6b6b6b">offered load →</text>
  <text x="16" y="35" font-size="6" fill="#6b6b6b" transform="rotate(-90 16 35)">throughput</text>
  <path d="M30 58 Q120 14 175 16 Q220 18 275 46" fill="none" stroke="#24405e" stroke-width="1.5"/>
  <circle cx="175" cy="16" r="2.5" fill="#a03050"/><text x="175" y="12" text-anchor="middle" font-size="5.5" fill="#a03050">preemption knee</text>
</svg>

:::note
Every one of these is a *capacity* failure, not a bug. vLLM does exactly what you told it; the operator's job is to admit only the load the KV pool can hold and shed the rest cleanly. This is why the gateway (17-47), load testing (17-50), and SRE error budgets (17-51) are not optional add-ons — they are what keep the engine on the healthy side of that knee.
:::

## The estimation cheat-sheet

- Capacity and cost math (17-63) only flows if the base numbers are in your head. Memorise this short table; every back-of-envelope in the interview is built from it. **[VERIFY — these drift; confirm on build day]**

| Quantity | Rule of thumb (2026) |
|---|---|
| bytes/param | FP16 = 2 · FP8 = 1 · INT4 = 0.5 |
| weights | params × bytes/param (70B FP8 = 70 GB) |
| KV/token | 2 × layers × kv_heads × head_dim × bytes (GQA shrinks it) |
| per-GPU decode | ~1–3k output tok/s at the goodput knee (H100, 70B FP8) |
| H100 rent | ~$2–4/hr · owned amortised ~$1/hr if busy |
| API blended | ~$1–15 /1M tokens depending on tier |
| cached input | ~10% of input rate |
| batch tier | ~50% of interactive |
| network RTT | same region ~1–10 ms · cross-continent ~100–250 ms |
| cold start | 40–120 s to load a large model |
| seconds/day | 86,400 |

- **How to use it in flight:** DAU × msgs → ÷ 86,400 → QPS → × output tokens → tok/s → ÷ per-GPU decode → GPUs → × GPU-hour rate → cost; cross-check against tokens × API rate for build-vs-buy.
- **State the assumption, flag the shaky one.** The per-GPU throughput is the number most sensitive to model, hardware, and traffic — always say "I'd verify ~2k tok/s/GPU with a load test." Interviewers reward the caveat; it shows you know which number is soft.

:::note
These are order-of-magnitude anchors, not precise figures, and they move every few months as hardware and prices change — hence the `[VERIFY]`. Their value is that they let you turn "it depends" into a *number* on the whiteboard in seconds. A staff candidate produces a GPU count and a dollar figure with stated assumptions; a junior says "we'd need to benchmark." Both are true, but only one answered the question.
:::

## Time constants

- **86,400 seconds in a day.** Round it to **10⁵** — the error is 14%, which is well within estimation range

| Daily volume | Per-second (÷ 10⁵) |
|---|---|
| 1 M/day | ~10/s |
| 10 M/day | ~100/s |
| 100 M/day | ~1,000/s |
| 1 B/day | ~10,000/s |

- **DAU × actions per user = daily volume.** 100M DAU × 10 requests each ≈ 10⁹/day ≈ 12,000/s average
- **Peak is 2–3× average.** This is an assumption you must state, not a fact. Real peak ratios vary by product: a social feed peaks at evening; a B2B tool peaks at 10 a.m. State the ratio you assume and why

### The failure

- Designing for the average (12,000/s) and meeting the peak (30,000/s) on launch day. The system falls over at 2.5× the average because nobody stated the peak assumption
- In an interview, always convert daily to per-second, then say "peak is about 2–3× this, so I'll size for 30,000/s." That sentence is worth more than the arithmetic

## The numbers to memorise

- **2¹⁰ ≈ 10³.** So KiB, MiB, GiB, TiB are a thousand, a million, a billion, a trillion bytes, near enough

### A day ≈ 10⁵ seconds

| Daily volume | Per second |
|---|---|
| 1 M/day | ~10/s |
| 10 M/day | ~100/s |
| 100 M/day | ~1,000/s |
| 1 B/day | ~10,000/s |

- **Peak is not average.** State the ratio you assume, usually 2–3×, and why: a social feed peaks in the evening, a B2B tool at 10 a.m.

### Sizes of things

| Thing | Size |
|---|---|
| 64-bit integer, timestamp · UUID | 8 B · 16 B |
| A short text row with IDs and timestamps | ~1 KB |
| A thumbnail · a phone photo | ~100 KB · ~3 MB |

### The failure

- Designing for the average, 12,000/s, and meeting the peak, 30,000/s, on launch day. Convert daily to per-second, then say "peak is 2–3× this, so I size for 30,000/s." That sentence is worth more than the arithmetic

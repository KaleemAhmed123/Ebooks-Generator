## A latency budget, worked

- Interviewers hand you an SLO and ask if a design meets it. You answer with a **budget** — decompose the target, assign each stage a slice, and check the sum. Worked example: *"a chat feature must feel instant — 800 ms to first token, P95."*

:::mint
```text
SLO: TTFT ≤ 800 ms P95, end-to-end ≤ 4 s for a 300-token answer

TTFT budget (800 ms):
  client → gateway            20 ms
  gateway auth + routing      15 ms
  network to GPU pod          10 ms
  queue wait (at target load) 120 ms   <- the variable one
  prefill (2k-token prompt)   180 ms
  safety input check          40 ms
  slack / P95 tail            415 ms
  ------------------------------------
  total budgeted              385 ms  ✓ fits with margin

End-to-end (4 s): TTFT 800 + 300 tokens × TPOT
  need TPOT ≤ (4000 − 800) / 300 = 10.7 ms/token  -> feasible on 1 GPU?
  if not, the lever is fewer concurrent seqs (faster TPOT) or spec-decode.
```
:::

- **The budget exposes the real constraint.** Here, TTFT fits easily, but the end-to-end target forces TPOT ≤ 10.7 ms/token — which caps how deep you can batch, which caps concurrency, which sets how many GPUs you need. The SLO drove the capacity plan, not the other way around.
- **Queue wait is the stage that explodes under load.** At 50% utilisation it is tiny; near the goodput knee it dominates. That is why the budget must be computed *at target load*, not at idle.

:::note
This is the move that separates a senior answer from a junior one: given an SLO, you do not say "it should be fast enough" — you *decompose the budget, assign slices, find the binding constraint, and let it size the hardware.* Every mock design in Module 19 runs this exact calculation.
:::

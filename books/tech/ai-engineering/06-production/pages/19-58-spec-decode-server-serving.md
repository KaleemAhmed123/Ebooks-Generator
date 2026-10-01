## Speculative decoding server: serving

- The single-request logic (19-57) is the easy part. Making it a *server* means measuring acceptance on real traffic and deciding when speculation helps — because it can also hurt.

:::mint
```python
class SpecDecodeServer:
    def __init__(self, target, draft, k=4):
        self.target, self.draft, self.k = target, draft, k
        self.accepted, self.proposed = 0, 0        # running acceptance stats
    def generate(self, ids, n):
        while ids.size(1) < n:
            ids, acc = speculative_step(self.target, self.draft, ids, self.k)
            self.accepted += acc; self.proposed += self.k
        return ids
    def acceptance_rate(self):
        return self.accepted / max(self.proposed, 1)   # the number that matters
```
:::

- **Instrument acceptance and adapt.** Track the live acceptance rate; if it drops (creative/unpredictable traffic), the speedup shrinks and the drafting overhead may not pay — so you can shrink `k` or disable speculation for that workload. This is the workload-sensitivity of 17-37 made operational.
- **The load caveat is the production trap.** Speculation spends *extra compute* (drafting + verifying rejected tokens) to save *memory-bound passes* — a good trade at low-to-medium load with spare compute, a *bad* one at max batch where the target is already compute-saturated. A real server enables speculation for interactive/low-batch traffic and backs off under saturation.

:::interview
"You added speculative decoding and throughput got *worse*. Why?"

Almost certainly **load**. Speculation trades extra compute (the draft's passes plus verifying tokens that get rejected) for fewer memory-bound target passes — which wins only when there's *spare compute*. At high batch the target is already compute-saturated, so the extra drafting work competes with real requests and net throughput drops. The other cause is **low acceptance** — on unpredictable text few proposals survive, so you paid to draft tokens you threw away. The fix is to enable speculation for low-to-medium-load interactive traffic, measure acceptance on real inputs, and back off under saturation. Knowing it *inverts* under load is the sign you've run it, not just read about it.
:::

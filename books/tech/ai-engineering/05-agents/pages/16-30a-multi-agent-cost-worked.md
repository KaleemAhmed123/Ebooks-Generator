## Worked: multi-agent cost math

- Put real numbers on the multi-agent cost tax (16-30), because the blowup is bigger than intuition suggests, and this is the calculation that justifies — or kills — a multi-agent design. **[VERIFY — illustrative]**

:::mint
```text
Task: answer a question. Baseline single agent: 3 model calls, ~$0.01.

Design A — group chat, 4 agents, 3 rounds:
   each round, every agent re-reads the whole growing conversation.
   round 1: 4 calls over ~2k ctx   round 2: 4 calls over ~5k ctx
   round 3: 4 calls over ~9k ctx  + 1 synthesis
   ≈ 13 calls, ctx growing each turn → ~$0.18   (18× baseline)

Design B — supervisor + 3 parallel workers (map-reduce):
   1 decompose + 3 workers (own context, concurrent) + 1 synthesize
   ≈ 5 calls, no shared-context blowup → ~$0.04   (4× baseline)
   and ~3× faster (workers run in parallel)
```
:::

- **Read the difference:** both are "multi-agent," yet Design A (group chat) costs **18×** baseline and Design B (supervisor + parallel) only **4×** — a 4.5× gap for the same task. A's killer is **repeated context**: every agent re-reads the whole growing conversation each round, so cost scales super-linearly with agents × rounds.
- **The levers:** parallel/isolated contexts over shared-growing ones (biggest win, 16-15); fewer rounds; prune each agent's context to its slice (16-10).
- **The decision:** compare *both* against the single-agent baseline. B at 4× may be worth it; A at 18× rarely is. Run this math *before* building (16-38).

:::interview
"How much more does a multi-agent system cost, and what drives it?"

Often 4×–20×, and the *design* decides where you land. A 4-agent, 3-round group chat hits ~18× because every agent re-reads the whole growing conversation each round — repeated context scales cost super-linearly with agents × rounds. The same task as a supervisor with parallel isolated workers might be only ~4× and faster. Levers: parallel/isolated over shared-growing context, fewer rounds, prune each agent's context. Always measure against a single-agent baseline — an 18× design for a marginal gain shouldn't ship.
:::

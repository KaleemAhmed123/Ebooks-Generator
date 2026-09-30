## A spend breakdown, worked

- Make FinOps concrete. A support-chat product, 500k conversations/month, ~8 turns each, on a frontier API. Where does the money go, and what does each lever save?

:::mint
```text
Baseline (all frontier, no caching):
  per conversation: 8 turns × (2,000 in + 300 out) tokens
    = 16,000 in + 2,400 out
  in  @ $3/1M:  16,000 × $3/1e6  = $0.048
  out @ $15/1M:  2,400 × $15/1e6 = $0.036
  per conversation                = $0.084
  500k/mo                         = $42,000 / month

Apply levers:
  prompt-cache the 1,500-tok system prefix (reads @10%)  -> −$0.030
  route 70% of turns to a small model ($0.20/$0.60)      -> −$0.028
  move nightly eval + summaries to batch tier (−50%)     -> −$0.004
  ------------------------------------------------------
  optimised per conversation      ≈ $0.022
  500k/mo                         ≈ $11,000 / month   (~74% cut)
```
:::

- **The two biggest levers are structural, not a cheaper model.** Prompt-caching the fixed prefix (it repeats every turn) and routing easy turns down together do most of the work — because the waste was *paying frontier prices to re-read the same system prompt on every one of 4 million turns*.
- **Output tokens dominate the rate but not always the bill.** Output is 5× the price of input here, yet input volume is larger, so caching input beats trimming output. Always compute the breakdown before choosing a lever — intuition about "expensive output" sends you to the wrong fix.

:::note
This is the FinOps loop end to end: attribute the $42k to turns and tokens, identify that the repeated prefix and uniform frontier routing are the waste, apply caching + routing + batch, land at ~$11k. Every number traces to a lever from cluster G. In a system-design interview, a cost estimate that ends in a *per-1M-token* figure and names the levers that move it is worth more than any architecture diagram.
:::

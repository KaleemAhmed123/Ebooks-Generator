## PagedAttention: mechanics, worked

- Walk one request through the block machinery. Block size 16 tokens; a 40-token prompt that generates 25 tokens.

:::mint
```text
Block size = 16 tokens

Prefill 40 prompt tokens:
  ceil(40 / 16) = 3 blocks allocated  [B0:0-15][B1:16-31][B2:32-39+pad]
  block_table = [B0, B1, B2]          B2 is 8/16 full

Decode: emit tokens 40, 41, ... 64
  tokens 40-47 fill B2                 (no new block)
  token 48 -> allocate B3              block_table = [B0,B1,B2,B3]
  ... token 64 lands in B4
  final: 5 blocks for 65 tokens = 80 slots -> 15 wasted (< 1 block)

Waste = at most (block_size - 1) tokens per sequence, EVER.
Contrast contiguous max_seq_len=8192: would reserve 8192 slots for 65.
```
:::

- **Prefix sharing falls out for free.** Ten requests that begin with the same 500-token system prompt share the physical blocks for that prefix — one copy in memory, ten block tables pointing at it. On divergence, vLLM copies the affected block (copy-on-write) and the requests split.
- **Preemption uses the same table.** Under memory pressure the scheduler can evict a request's blocks (swap to CPU or recompute later) and restore them by rewriting the block table — no data moves that does not have to.

:::interview
**"How does PagedAttention save memory, concretely?"** Two ways. **Fragmentation:** blocks are allocated to actual sequence length, so waste is bounded by one partial block instead of a full `max_seq_len` reservation — recovering the 60–80% that contiguous allocation threw away. **Sharing:** identical prefixes (system prompts, few-shot examples, a shared document) map to the same physical blocks across requests, so a 500-token system prompt served to 100 users costs one copy, not one hundred. Both come from the same block-table indirection.
:::

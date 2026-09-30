## RadixAttention: the win, worked

- Put numbers on it. An agent serving 1,000 requests/minute, each with a fixed 1,800-token system prompt + tools, then a short 200-token task.

:::mint
```text
Without prefix reuse — every request re-prefills the whole prompt:
  prefill tokens/request = 1,800 + 200 = 2,000
  prefill work/min       = 1,000 × 2,000 = 2,000,000 tokens

With RadixAttention — the 1,800-token prefix is cached after req #1:
  prefill tokens/request = 200 (only the divergent task tail)
  prefill work/min       = 1,000 × 200 = 200,000 tokens

Prefill compute cut ~90%.  Prefill is compute-bound (page 17-09),
so TTFT drops sharply and the freed FLOPs serve more users.
```
:::

- The win scales with **prefix share**: the longer and more-reused the common prefix, the bigger the cut. Agent and RAG traffic — long fixed system prompts, repeated documents — is the ideal case, which is why SGLang is the common pick there.
- It is close to free when prefixes *don't* repeat: the tree just never gets a hit, and you pay only a small bookkeeping cost. So the downside is bounded; the upside is large on the right workload.

:::warn
Prefix reuse is only valid when the shared span is **byte-identical**. A system prompt that interpolates the current timestamp, a per-user name, or a random request ID **near the front** breaks the shared prefix — every request diverges at token 3 and the cache never hits. Put volatile fields at the *end* of the prompt, after everything reusable, or you silently lose the entire benefit and wonder why SGLang is no faster than vLLM.
:::

## SGLang vs vLLM: when

- Both are mature, open, OpenAI-compatible, and fast. The choice is workload-shaped, not "which is better."

| Reach for | When | Because |
|---|---|---|
| **vLLM** | general chat/API, mixed traffic, broadest model + feature support | largest ecosystem, safe default, biggest community |
| **SGLang** | heavy shared prefixes: agents, RAG, few-shot, tree search; structured multi-step programs | RadixAttention + frontend DSL are built for prefix reuse |

- **The deciding question is prefix share.** If most requests re-send a long common context (a fixed system prompt, the same retrieved documents, a shared conversation head), SGLang's automatic longest-prefix reuse is a real, measurable win. If traffic is diverse short prompts with little overlap, the two perform similarly and vLLM's ecosystem breadth usually decides it.
- **Do not pick on benchmarks alone.** Published throughput numbers use a specific model, hardware, and traffic mix that rarely matches yours — most importantly the prefix-share ratio. Reproduce the comparison on *your* traffic before committing.

:::interview
**"vLLM or SGLang for a customer-support agent?"** Lead with the workload: a support agent re-sends a large fixed system prompt, tool definitions, and often the same knowledge-base passages every turn — a high prefix-share ratio. That is exactly RadixAttention's sweet spot, so **SGLang** is the stronger default here, and I would quantify the prefix share and A/B the two on real traffic before locking it in. For a general-purpose chat API with diverse prompts, I would start on **vLLM** for the ecosystem and revisit only if profiling shows heavy prefix reuse.
:::

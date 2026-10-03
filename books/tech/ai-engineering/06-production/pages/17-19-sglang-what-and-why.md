## SGLang: what and why

- **SGLang** is a serving framework built around one bet: **workloads reuse prefixes far more than people optimise for**, and if you cache those prefixes aggressively you win big. Its signature is **RadixAttention** — a KV-cache scheme that shares prefix state across requests automatically, using a radix tree.
- It also ships a **frontend language** — a Python DSL for multi-step, branching, structured LLM programs — so the same system expresses complex control flow *and* serves it fast.

<svg viewBox="0 0 360 88" role="img" aria-label="SGLang has a frontend DSL for structured programs and a backend runtime with RadixAttention prefix sharing" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="24" width="120" height="40" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="74" y="20" text-anchor="middle" font-size="6.5" fill="#24405e">frontend language</text>
  <text x="74" y="42" text-anchor="middle" font-size="6">gen · fork · select</text><text x="74" y="54" text-anchor="middle" font-size="6">branch / parallel</text>
  <rect x="184" y="24" width="162" height="40" rx="4" fill="#24405e"/><text x="265" y="20" text-anchor="middle" font-size="6.5" fill="#24405e">backend runtime</text>
  <text x="265" y="42" text-anchor="middle" font-size="6" fill="#fff">RadixAttention prefix tree</text><text x="265" y="54" text-anchor="middle" font-size="6" fill="#cdd">continuous batch · spec-decode</text>
  <path d="M134 44 L182 44" stroke="#888" marker-end="url(#sg)"/>
  <defs><marker id="sg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Where it shines:** heavy shared prefixes. Agent loops re-sending a long system prompt and tool history; RAG re-sending the same retrieved document; few-shot prompts with a fixed example block; tree-of-thought fanning many branches off one context. On these, published numbers show meaningful throughput gains over engines without automatic prefix reuse.
- Like vLLM it exposes an OpenAI-compatible server, does tensor parallelism, quantisation, and speculative decoding — the prefix story is the differentiator, not a missing-feature tradeoff.

:::note
vLLM has prefix caching too, but SGLang made prefix reuse the *organising principle* — the radix tree tracks every prefix ever seen and matches new requests against all of them, not just an exact system-prompt match. On prefix-heavy traffic that difference is the reason to reach for SGLang; on everything else, the two are close and vLLM's larger ecosystem usually wins.
:::

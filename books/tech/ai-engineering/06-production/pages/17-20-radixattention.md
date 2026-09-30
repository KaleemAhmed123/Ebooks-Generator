## RadixAttention

- Prefix caching in most engines is coarse: match a request's exact system prompt, reuse its KV. RadixAttention is finer — it stores **every** cached prefix in a **radix tree** (a tree where each edge is a run of tokens and shared prefixes share a path), and matches a new request against the longest path it can.
- A new request walks the tree from the root, following edges that match its tokens. Every token it matches is a KV block it does **not** recompute — the prefill for that span is free.

<svg viewBox="0 0 360 116" role="img" aria-label="A radix tree of cached prefixes; a new request matches the shared system-prompt path then branches" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="150" y="10" width="60" height="16" rx="3" fill="#24405e"/><text x="180" y="21" text-anchor="middle" font-size="6" fill="#fff">"You are…" (sys)</text>
  <rect x="70" y="44" width="80" height="16" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="110" y="55" text-anchor="middle" font-size="6">+ user A docs</text>
  <rect x="210" y="44" width="80" height="16" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="250" y="55" text-anchor="middle" font-size="6">+ user B docs</text>
  <rect x="40" y="78" width="70" height="16" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="75" y="89" text-anchor="middle" font-size="6">A: "summarise"</text>
  <rect x="118" y="78" width="70" height="16" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="153" y="89" text-anchor="middle" font-size="6">A: "translate"</text>
  <path d="M180 26 L110 44" stroke="#888" marker-end="url(#rx)"/><path d="M180 26 L250 44" stroke="#888" marker-end="url(#rx)"/>
  <path d="M110 60 L75 78" stroke="#888" marker-end="url(#rx)"/><path d="M110 60 L153 78" stroke="#888" marker-end="url(#rx)"/>
  <text x="180" y="110" text-anchor="middle" font-size="6" fill="#6b6b6b">shared path = shared KV · only the divergent tail is recomputed</text>
  <defs><marker id="rx" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Eviction is LRU on the tree.** When the cache fills, least-recently-used leaves are pruned first, keeping hot shared prefixes (the system prompt near the root) resident longest — exactly the blocks most requests reuse.
- This generalises prefix sharing from "same system prompt" to "any shared span": two agents mid-conversation that share the first 5 turns share that KV even though their latest turns differ.

:::interview
**"How is RadixAttention different from ordinary prefix caching?"** Ordinary prefix caching reuses KV for an exact prefix match (usually the system prompt). RadixAttention keeps *all* cached prefixes in a radix tree and matches the **longest shared path**, so partial and nested prefixes are reused too — multi-turn conversations, branching agent trees, and shared-document RAG all hit the cache without any exact match. Eviction is tree-LRU, so hot near-root prefixes stay resident.
:::

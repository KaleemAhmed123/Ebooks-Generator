## PagedAttention: the idea

- The KV-cache waste on page 17-11 comes from **contiguous allocation**: reserve one unbroken block of `max_seq_len` per request, and most of it sits empty. This is exactly the fragmentation problem operating systems solved decades ago — with **paging**.
- **PagedAttention** applies the same trick: split the KV cache into fixed-size **blocks** (e.g. 16 tokens each), hand blocks out on demand as a sequence grows, and track which blocks belong to which request in a **block table**. Physical memory need not be contiguous.

<svg viewBox="0 0 360 108" role="img" aria-label="A request's logical token sequence maps through a block table to scattered physical KV blocks, like virtual memory pages" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="60" y="12" text-anchor="middle" font-size="6.5" fill="#6b6b6b">logical (per request)</text>
  <g fill="#e8f4fd" stroke="#24405e"><rect x="14" y="18" width="92" height="14"/></g><text x="60" y="28" text-anchor="middle" font-size="6">tokens 0..47</text>
  <rect x="150" y="44" width="60" height="20" rx="3" fill="#24405e"/><text x="180" y="57" text-anchor="middle" font-size="6" fill="#fff">block table</text>
  <text x="300" y="12" text-anchor="middle" font-size="6.5" fill="#6b6b6b">physical KV blocks</text>
  <g fill="#eaf6ea" stroke="#1a3a2a"><rect x="250" y="18" width="26" height="14"/><rect x="286" y="18" width="26" height="14"/><rect x="322" y="18" width="26" height="14"/><rect x="268" y="40" width="26" height="14"/><rect x="304" y="40" width="26" height="14"/><rect x="250" y="62" width="26" height="14"/></g>
  <path d="M106 25 L148 50" stroke="#888" marker-end="url(#pa)"/>
  <path d="M210 50 L248 25" stroke="#888" marker-end="url(#pa)"/><path d="M210 52 L266 47" stroke="#888" marker-end="url(#pa)"/><path d="M210 56 L302 47" stroke="#888" marker-end="url(#pa)"/><path d="M210 58 L248 66" stroke="#888" marker-end="url(#pa)"/>
  <text x="180" y="96" text-anchor="middle" font-size="6" fill="#1a1a1a">grow a sequence = allocate one more block · no giant reservation</text>
  <defs><marker id="pa" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **The payoff is threefold.** Near-zero internal fragmentation (a sequence wastes at most one partial block). Memory allocated to actual length, not max length — so many more requests fit. And blocks can be **shared**: two requests with the same prompt prefix point their block tables at the *same* physical blocks (copy-on-write on divergence).
- The attention kernel is rewritten to gather keys and values across scattered blocks via the block table — hence "PagedAttention."

:::note
The analogy is exact and worth keeping: **logical tokens ↔ virtual addresses, blocks ↔ pages, block table ↔ page table.** vLLM did not invent a new math trick; it imported thirty years of OS memory management into the attention kernel. That is why the idea generalises to prefix sharing, swapping, and offload with no new theory.
:::

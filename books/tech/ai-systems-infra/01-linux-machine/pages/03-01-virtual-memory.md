# Memory and Why Pods Die

## Virtual memory

- Every process sees its own large, **contiguous virtual address space** — as if it owned all of memory. It doesn't. The CPU's **MMU** (memory management unit) translates each virtual address to a physical RAM address using **page tables** the kernel maintains, in fixed-size **pages** (usually 4 KiB).
- This indirection buys three things at once: **isolation** (a process cannot name another's memory), a **simple contiguous view** (the fragmentation is hidden in the mapping), and **overcommit** (the kernel can promise more memory than physically exists).

<svg viewBox="0 0 360 122" role="img" aria-label="A process's virtual pages map through a page table to physical RAM frames; some pages are unmapped until touched, and cold pages may live on disk" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="12" y="13" font-size="6.3" fill="#3a3f58">virtual pages</text>
  <rect x="12" y="18" width="70" height="15" fill="#eef0f5" stroke="#3a3f58"/><text x="47" y="29" text-anchor="middle" font-size="6">page 0</text>
  <rect x="12" y="35" width="70" height="15" fill="#eef0f5" stroke="#3a3f58"/><text x="47" y="46" text-anchor="middle" font-size="6">page 1</text>
  <rect x="12" y="52" width="70" height="15" fill="#fff" stroke="#aab" stroke-dasharray="2 2"/><text x="47" y="63" text-anchor="middle" font-size="5.6" fill="#999">page 2 (unmapped)</text>
  <rect x="12" y="69" width="70" height="15" fill="#eef0f5" stroke="#3a3f58"/><text x="47" y="80" text-anchor="middle" font-size="6">page 3</text>
  <rect x="150" y="30" width="60" height="44" rx="3" fill="#f7f8fb" stroke="#3a3f58"/><text x="180" y="47" text-anchor="middle" font-size="6.3">page table</text><text x="180" y="59" text-anchor="middle" font-size="5.5" fill="#777">(MMU uses it)</text>
  <text x="270" y="13" font-size="6.3" fill="#3a3f58">physical RAM</text>
  <rect x="270" y="18" width="70" height="15" fill="#dfe6f2" stroke="#3a3f58"/><text x="305" y="29" text-anchor="middle" font-size="6">frame</text>
  <rect x="270" y="35" width="70" height="15" fill="#dfe6f2" stroke="#3a3f58"/><text x="305" y="46" text-anchor="middle" font-size="6">frame</text>
  <rect x="270" y="69" width="70" height="15" fill="#dfe6f2" stroke="#3a3f58"/><text x="305" y="80" text-anchor="middle" font-size="6">frame</text>
  <path d="M82 26 L150 40" stroke="#1a1a1a" marker-end="url(#v1)"/>
  <path d="M82 43 L150 48" stroke="#1a1a1a" marker-end="url(#v1)"/>
  <path d="M82 76 L150 60" stroke="#1a1a1a" marker-end="url(#v1)"/>
  <path d="M210 42 L270 26" stroke="#1a1a1a" marker-end="url(#v1)"/>
  <path d="M210 50 L270 43" stroke="#1a1a1a" marker-end="url(#v1)"/>
  <path d="M210 58 L270 76" stroke="#1a1a1a" marker-end="url(#v1)"/>
  <text x="96" y="104" font-size="5.8" fill="#777">touching page 2 → page fault → kernel maps a frame (or kills you if none)</text>
  <defs><marker id="v1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **Demand paging** makes overcommit safe most of the time. A page isn't backed by RAM until first touched; the first access to an unbacked page triggers a **page fault**, and the kernel maps a real frame then. So `malloc` of 1 GB costs almost nothing up front — it reserves address space; physical RAM arrives page by page as you **write**.
- That gap between *reserved* and *resident* is the root of the next three pages: it's why "memory used" is ambiguous, and why a process can be killed for memory it was only promised.

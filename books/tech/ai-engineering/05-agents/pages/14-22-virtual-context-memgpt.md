## Virtual context and MemGPT

- **MemGPT** (Packer et al., 2023; now the **Letta** project) gave agent memory its most influential idea: treat the context window like a computer's **RAM** and external storage like its **disk**, and let the agent **page information between them** — "virtual context," borrowed straight from operating-system virtual memory. **[VERIFY project status]**

<svg viewBox="0 0 360 100" role="img" aria-label="The agent pages memory between a small in-context main memory and a large external store" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="20" y="20" width="120" height="60" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="80" y="34" text-anchor="middle" font-size="6.5">main context (RAM)</text><text x="80" y="48" text-anchor="middle" font-size="5.5" fill="#6b6b6b">small, in the prompt</text><text x="80" y="62" text-anchor="middle" font-size="5.5" fill="#6b6b6b">system + recent + core facts</text>
  <rect x="220" y="20" width="120" height="60" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="280" y="34" text-anchor="middle" font-size="6.5">external store (disk)</text><text x="280" y="48" text-anchor="middle" font-size="5.5" fill="#6b6b6b">large, out of context</text><text x="280" y="62" text-anchor="middle" font-size="5.5" fill="#6b6b6b">full history, archives</text>
  <path d="M140 42 L218 42" stroke="#888" marker-end="url(#mg)"/><text x="180" y="38" text-anchor="middle" font-size="5.5">page out</text>
  <path d="M218 62 L140 62" stroke="#888" marker-end="url(#mg)"/><text x="180" y="74" text-anchor="middle" font-size="5.5">page in (retrieve)</text>
  <defs><marker id="mg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The mechanism:** the agent is given **memory-management tools** — functions to *write* to long-term storage, *search* it, and *edit* what is currently in context. When the context fills, the agent itself decides what to page out to disk and, when it needs something, searches disk to page it back in. The LLM manages its own memory via tool calls.
- **Why it was a breakthrough:** it made memory *agent-driven*. Rather than you writing rules for what to keep, the model reasons about its own memory — "this fact matters long-term, save it; I need that earlier detail, retrieve it." An agent can hold an effectively unbounded, self-curated memory.
- MemGPT/Letta also introduced **memory tiers** — a small always-in-context core (who the user is, current task) plus searchable archival memory — the structure the next page (memory blocks) formalizes.

:::interview
"Explain the MemGPT / virtual-context idea."

It applies OS virtual memory to LLMs: the context window is RAM (small, fast, in-prompt), an external store is disk (large, out-of-context), and the agent pages information between them using memory-management *tools* it calls itself. When context fills, the model writes less-needed info to storage; when it needs something, it searches storage to bring it back. The key move is making memory management the model's own responsibility, giving it unbounded, self-curated recall.
:::

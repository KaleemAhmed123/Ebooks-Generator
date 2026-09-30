## Claude Agent SDK

- The **Claude Agent SDK** (2025, formerly the "Claude Code SDK") exposes the **harness that powers Claude Code** — the agent loop, tools, context management, and permission system that make a coding agent work — as a library for building your own agents. Its distinguishing bet: give agents a **computer**, not just an API. **[VERIFY name/status]**

<svg viewBox="0 0 360 96" role="img" aria-label="The Claude Agent SDK wraps a model with file, terminal, and search tools plus context and permission management" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="130" y="10" width="100" height="22" rx="4" fill="#24405e"/><text x="180" y="24" text-anchor="middle" fill="#fff" font-size="6.5">Claude + agent loop</text>
  <rect x="20" y="44" width="70" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="55" y="57" text-anchor="middle" font-size="6">file ops</text>
  <rect x="98" y="44" width="70" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="133" y="57" text-anchor="middle" font-size="6">terminal</text>
  <rect x="176" y="44" width="70" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="211" y="57" text-anchor="middle" font-size="6">search</text>
  <rect x="254" y="44" width="86" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="297" y="57" text-anchor="middle" font-size="6">web / MCP</text>
  <rect x="60" y="72" width="240" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="180" y="84" text-anchor="middle" font-size="6">context management · permissions · subagents</text>
  <path d="M160 32 L55 42" stroke="#888" marker-end="url(#cs)"/><path d="M172 32 L133 42" stroke="#888" marker-end="url(#cs)"/><path d="M188 32 L211 42" stroke="#888" marker-end="url(#cs)"/><path d="M200 32 L297 42" stroke="#888" marker-end="url(#cs)"/>
  <defs><marker id="cs" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **What "give it a computer" means:** the SDK ships an agent that can read and write **files**, run **terminal commands**, search a codebase, browse the web, and call MCP servers — the toolset of a developer at a machine. This is why it excels at **coding and long-horizon operational tasks**: the agent operates a real environment, not a sandbox of hand-picked functions.
- **It is production-hardened by provenance.** Because it is the same harness running Claude Code at scale, it comes with battle-tested context management, permissioning, and error handling — the operational concerns most home-grown agents get wrong.

:::note
The Claude Agent SDK sits at a different point than the others: it is opinionated toward **autonomous, tool-rich, long-running agents that operate a real environment** (a filesystem, a shell), rather than being a general orchestration toolkit. If your agent's job is to *do work on a computer* — write code, run commands, manage files, execute multi-step operations — this harness gives you the hard-won infrastructure for that specific, high-value shape.
:::

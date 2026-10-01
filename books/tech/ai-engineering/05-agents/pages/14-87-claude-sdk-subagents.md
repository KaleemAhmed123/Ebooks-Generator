## Claude Agent SDK: subagents

- The SDK supports **subagents** — spawning a separate agent, with its own fresh context, to handle a sub-task and return only its result. This is a context-management *and* organization tool at once. **[VERIFY current API]**

<svg viewBox="0 0 360 96" role="img" aria-label="A main agent spawns subagents with isolated contexts that each return a compact result" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="130" y="10" width="100" height="22" rx="4" fill="#24405e"/><text x="180" y="24" text-anchor="middle" fill="#fff" font-size="6.5">main agent</text>
  <rect x="30" y="52" width="86" height="30" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="73" y="65" text-anchor="middle" font-size="6">subagent</text><text x="73" y="75" text-anchor="middle" font-size="5.5" fill="#6b6b6b">own context</text>
  <rect x="244" y="52" width="86" height="30" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="287" y="65" text-anchor="middle" font-size="6">subagent</text><text x="287" y="75" text-anchor="middle" font-size="5.5" fill="#6b6b6b">own context</text>
  <path d="M160 32 L80 50" stroke="#888" marker-end="url(#cu2)"/><path d="M200 32 L280 50" stroke="#888" marker-end="url(#cu2)"/>
  <path d="M80 52 Q130 40 168 33" stroke="#1a3a2a" fill="none" stroke-dasharray="3,2" marker-end="url(#cu2)"/><text x="120" y="46" font-size="5" fill="#1a3a2a">result only ↑</text>
  <defs><marker id="cu2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **How it helps context:** a sub-task that would flood the main agent's context — "search these 40 files and report the 3 relevant ones" — runs in a **subagent with its own window**. It does the noisy work (reading 40 files) in *its* context and returns only the distilled answer (3 files). The main agent's context stays clean; the exploration cost is isolated (the isolation of 14-06, at the agent level).
- **How it helps organization:** subagents can be **specialized** — a "reviewer" subagent, a "test-runner" subagent — each with focused instructions and tools. The main agent orchestrates; subagents do bounded jobs. This is the orchestrator-workers pattern (14-39) and LangGraph subgraphs (14-54), realized as spawned agents.
- **Parallelism.** Independent subagents can run concurrently, so a task splittable into parts (the dispatching-parallel-agents idea) finishes faster.

:::interview
"Why spawn a subagent instead of doing the work in the main agent?"

Context isolation and focus. A noisy sub-task — reading many files, a deep search, an exploratory dig — would flood the main agent's context with intermediate junk. Run it in a subagent with its own window; it absorbs the noise and returns only the distilled result, keeping the main context clean and the main agent on-goal. Subagents also let you specialize (a reviewer, a tester) and parallelize independent work. It's orchestrator-workers at the agent level, and a key technique for long-horizon reliability.
:::

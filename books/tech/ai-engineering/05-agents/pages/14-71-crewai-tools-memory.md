## CrewAI: tools and memory

- CrewAI agents use tools and can be given memory, so a crew is not just talk — it acts and remembers across a run. **[VERIFY current API]**

- **Tools** attach per-agent. You give the researcher a `search_tool`, the analyst a `code_tool`. CrewAI ships a library of prebuilt tools (web search, file I/O, scraping) and accepts custom ones — a Python function with a description, the schema-design rules of 13-12 unchanged. An agent only sees the tools you gave *it*, which naturally scopes tools per role (13-15).

<svg viewBox="0 0 360 84" role="img" aria-label="CrewAI memory layers: short-term within a run, long-term across runs, and entity memory" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="24" width="106" height="36" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="63" y="40" text-anchor="middle" font-size="6.5">short-term</text><text x="63" y="51" text-anchor="middle" font-size="5.5" fill="#6b6b6b">within this run</text>
  <rect x="126" y="24" width="106" height="36" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="179" y="40" text-anchor="middle" font-size="6.5">long-term</text><text x="179" y="51" text-anchor="middle" font-size="5.5" fill="#6b6b6b">across runs (DB)</text>
  <rect x="242" y="24" width="106" height="36" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="295" y="40" text-anchor="middle" font-size="6.5">entity</text><text x="295" y="51" text-anchor="middle" font-size="5.5" fill="#6b6b6b">people/things</text>
</svg>

- **Memory** maps onto the memory cluster (14-19+). CrewAI exposes memory types as a built-in feature you enable on a crew: **short-term** (context within a run), **long-term** (persisted across runs, so a crew improves over time), and **entity** memory (facts about people/things, 14-28). Turning it on lets a crew recall past runs and accumulated facts without you building the store.
- **The convenience vs control tradeoff again:** you get working memory with a flag, but less control over exactly what is stored and retrieved than hand-building it in LangGraph's Store. For many apps the built-in memory is enough; for precise memory behavior you may want more.

:::note
CrewAI's tools and memory show its whole philosophy: **batteries included.** Prebuilt tools, built-in memory types, sensible defaults — you assemble a capable crew fast. The flip side is less visibility into the machinery, which matters when something goes wrong or when you need behavior the defaults do not cover. It is the classic high-level-framework bargain: speed and simplicity now, potential control limits later.
:::

## HTN and classical planning

- Not all planning should be left to the LLM. **HTN (Hierarchical Task Network) planning** is a classical-AI technique that decomposes a goal into subtasks recursively, using **hand-written decomposition rules**, until every piece is a directly-executable action.

<svg viewBox="0 0 360 100" role="img" aria-label="A high-level task decomposes hierarchically into subtasks and then primitive actions" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="130" y="12" width="100" height="18" rx="3" fill="#24405e"/><text x="180" y="24" text-anchor="middle" fill="#fff" font-size="6.5">plan a trip</text>
  <rect x="40" y="44" width="90" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="85" y="56" text-anchor="middle" font-size="6">book travel</text>
  <rect x="230" y="44" width="90" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="275" y="56" text-anchor="middle" font-size="6">book lodging</text>
  <g fill="#eaf6ea" stroke="#1a3a2a"><rect x="14" y="76" width="60" height="16" rx="2"/><rect x="82" y="76" width="60" height="16" rx="2"/><rect x="230" y="76" width="90" height="16" rx="2"/></g>
  <g font-size="5.5"><text x="44" y="87" text-anchor="middle">search flights</text><text x="112" y="87" text-anchor="middle">buy ticket</text><text x="275" y="87" text-anchor="middle">reserve hotel</text></g>
  <g stroke="#888"><line x1="160" y1="30" x2="90" y2="42"/><line x1="200" y1="30" x2="270" y2="42"/><line x1="70" y1="62" x2="46" y2="74"/><line x1="100" y1="62" x2="110" y2="74"/><line x1="275" y1="62" x2="275" y2="74"/></g>
</svg>

- **How it differs from LLM planning:** HTN uses *predefined* rules ("to plan a trip, book travel and book lodging; to book travel, search then purchase"). It is deterministic, verifiable, and cannot hallucinate a step — but it only handles what the rules cover. LLM planning is flexible and open-ended but can produce invalid or made-up steps.
- **The hybrid is the sweet spot:** use HTN-style structure for the parts of a task with *known* decomposition (your business workflow), and let the LLM handle the open-ended leaves (drafting text, deciding a query). You get the reliability of fixed structure where you have it and the flexibility of the model where you need it.
- This is the deep reason "workflow vs agent" (14-02) is a spectrum, not a binary — HTN is how you encode the workflow skeleton while keeping agentic flexibility at the tips.

:::interview
**"Why use classical HTN planning when LLMs can plan?"** Reliability and verifiability. HTN decomposes a goal via hand-written rules, so its plans are deterministic, valid by construction, and auditable — the LLM can't invent a nonexistent step. LLM planning is flexible for open-ended tasks but can hallucinate or produce invalid plans. The strong pattern is hybrid: encode the known workflow structure as HTN-style decomposition and let the LLM fill the genuinely open-ended leaves.
:::

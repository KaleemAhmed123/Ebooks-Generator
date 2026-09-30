## The AI-system-design interview

- The AI-system-design round asks you to design a real LLM system out loud in ~45 minutes — "design ChatGPT," "design a production RAG assistant," "design an autonomous coding agent." It is the round that decides senior and staff AI-engineering offers, and it rewards *structure and tradeoffs*, not trivia.
- It is classic system design **plus** the LLM-specific concerns this whole module built: serving economics, goodput, eval, hallucination, safety, and token cost.

<svg viewBox="0 0 360 92" role="img" aria-label="The interview tests breadth across requirements, architecture, serving, eval, cost, and failure, at increasing depth for senior and staff" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="24" y1="70" x2="336" y2="70" stroke="#888"/>
  <text x="24" y="82" font-size="6" fill="#6b6b6b">breadth (cover it all) →</text>
  <text x="16" y="45" font-size="6" fill="#6b6b6b" transform="rotate(-90 16 45)">depth →</text>
  <g text-anchor="middle" font-size="6">
   <rect x="30" y="52" width="46" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="53" y="62">requirements</text>
   <rect x="82" y="42" width="46" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="105" y="52">architecture</text>
   <rect x="134" y="32" width="46" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="157" y="42">serving</text>
   <rect x="186" y="42" width="46" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="209" y="52">eval</text>
   <rect x="238" y="32" width="46" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="261" y="42">cost</text>
   <rect x="290" y="22" width="46" height="14" rx="2" fill="#24405e"/><text x="313" y="32" fill="#fff">failure</text>
  </g>
</svg>

- **What the levels test.** *Senior* is expected to produce a correct, complete design and reason about the main tradeoffs. *Staff* is expected to drive the ambiguity — set the requirements, pick the binding constraint, quantify capacity and cost, and defend the design against the failure modes the interviewer probes. This booklet aims you at the staff bar; clearing it clears senior.
- **The failure most candidates make** is diving into an architecture before pinning requirements and scale. The next pages give a framework that stops that.

:::note
The interview is not looking for the "right" architecture — there rarely is one. It is looking for a *process*: clarify → estimate → design → justify → stress-test. A candidate who narrates that process, quantifies as they go, and names what they are trading off reads as senior even on an unfamiliar prompt. A candidate who draws the perfect diagram in silence does not.
:::

## The interview-day playbook

- One page to carry into the room. The AI-system-design round rewards a *process*, and this is it — the moves from cluster 17-J and this whole module, compressed to what you'll actually do in 45 minutes.

<svg viewBox="0 0 360 72" role="img" aria-label="The interview arc: clarify, estimate, design the spine, deep-dive, then eval-cost-failure, with tradeoffs throughout" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <g text-anchor="middle">
   <rect x="8" y="26" width="56" height="18" rx="2" fill="#24405e"/><text x="36" y="37" fill="#fff">clarify 5–8m</text>
   <rect x="70" y="26" width="56" height="18" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="98" y="37">estimate</text>
   <rect x="132" y="26" width="56" height="18" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="160" y="37">spine</text>
   <rect x="194" y="26" width="56" height="18" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="222" y="37">deep-dive</text>
   <rect x="256" y="26" width="96" height="18" rx="2" fill="#24405e"/><text x="304" y="37" fill="#fff">eval · cost · failure</text>
  </g>
  <path d="M64 35 L68 35 M126 35 L130 35 M188 35 L190 35 M250 35 L254 35" stroke="#888" marker-end="url(#ip)"/>
  <text x="180" y="58" text-anchor="middle" font-size="6" fill="#a03050">talk out loud · quantify · name the tradeoff — the whole way through</text>
  <defs><marker id="ip" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Open with the frame** (17-65): *"Let me clarify requirements and scale, sketch the design, deep-dive the hardest part, then cover eval, cost, and failure — stop me anywhere."* It sets the agenda and shows you have a process.
- **The non-negotiables:** clarify *before* architecting (17-59); put real *numbers* on scale and cost (17-63); draw the *minimal* spine, not every box (17-62); *never skip eval* — "how do you know it works and stays working" (19-16); *bound* hallucination and failure, don't claim zero (17-64).
- **The five that cap a level** (17-65): architecting before requirements, no numbers, skipping eval, ignoring cost, claiming perfect reliability. Avoid these and you clear the bar on an unfamiliar prompt.

:::interview
The single highest-leverage habit:

narrate the *process*, not just the answer. Say what you're doing and why — "requirements first, so I'll assume these numbers… here's the spine… the binding constraint is X… now let me make sure I cover eval, cost, and failure." The interviewer is scoring your *reasoning*, and an unfamiliar prompt is fine if your process is visible: clarify → estimate → design → justify → stress-test. Every mock in this cluster is that arc executed once. You don't need to have seen the exact system — you need the arc, the building blocks (19-01a), and the discipline to run them out loud with numbers and named tradeoffs. That is what "clears the AI system design interview" actually means, and it's what this series built.
:::

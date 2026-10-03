## Self-play and emergent communication

- Two striking MARL phenomena (16-24) worth knowing, because they show what *learned* multi-agent systems can do that orchestrated LLM systems cannot: agents that **train against copies of themselves** and agents that **invent their own communication.**

<svg viewBox="0 0 360 84" role="img" aria-label="Self-play: an agent improves by playing copies of itself; emergent communication: agents invent signals" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <text x="90" y="12" text-anchor="middle" font-size="6.5" fill="#24405e">self-play</text>
  <circle cx="55" cy="44" r="15" fill="#24405e"/><text x="55" y="47" text-anchor="middle" fill="#fff" font-size="5.5">agent</text>
  <circle cx="125" cy="44" r="15" fill="#6a9bd0"/><text x="125" y="47" text-anchor="middle" fill="#fff" font-size="5.5">its copy</text>
  <path d="M71 40 L109 40" stroke="#888" marker-end="url(#sp2)"/><path d="M109 48 L71 48" stroke="#888" marker-end="url(#sp2)"/>
  <line x1="185" y1="8" x2="185" y2="76" stroke="#eee"/>
  <text x="275" y="12" text-anchor="middle" font-size="6.5" fill="#24405e">emergent comms</text>
  <circle cx="240" cy="44" r="14" fill="#24405e"/><circle cx="315" cy="44" r="14" fill="#24405e"/>
  <path d="M254 44 L301 44" stroke="#a03050" marker-end="url(#sp2)"/><text x="277" y="38" text-anchor="middle" font-size="5.5" fill="#a03050">invented signal</text>
  <defs><marker id="sp2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Self-play** — an agent improves by competing against *copies of itself*, each version training the next. As the agent gets better, its opponent (itself) gets better, creating an *automatic curriculum* that ratchets skill upward with no human-designed opponents. It is how game-playing agents reached superhuman play (AlphaGo, and the RL-for-reasoning lineage, Booklet 4) — the opponent is always exactly as strong as you, so you are always challenged.
- **Emergent communication** — when cooperative agents have a *communication channel* but no predefined language, MARL can make them **invent their own signals** to coordinate — a learned protocol optimized for their task, sometimes efficient in ways human-designed messages are not (and sometimes uninterpretable to us). It shows communication itself can be *learned*, not just designed (contrast the hand-designed ACL, 16-03).
- **Why LLM systems differ:** LLM agents come pre-loaded with *human language* — they communicate in English out of the box, no learning needed (16-27). Self-play and emergent communication are *training-time* phenomena of MARL; LLM multi-agent systems inherit language and skill from pretraining instead of discovering them. Knowing both clarifies the LLM-vs-MARL divide (16-27).

:::note
Self-play and emergent communication are among the most remarkable results in multi-agent learning: agents bootstrapping superhuman skill against themselves, and inventing language to cooperate. They belong to the *trained* (MARL) branch, not the *orchestrated* (LLM) branch — a useful reminder that "multi-agent AI" spans two quite different disciplines. LLM agents give you human language and broad competence for free but learn no new protocols on their own; MARL agents can discover skill and communication from scratch but need a simulator and massive training. The frontier — RL-training LLM agents, possibly in self-play — may eventually merge the two.
:::

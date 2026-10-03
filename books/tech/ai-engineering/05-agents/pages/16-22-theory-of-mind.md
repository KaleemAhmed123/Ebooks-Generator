## Theory of mind

- Effective coordination often needs an agent to model *what other agents know, want, or intend* — a **theory of mind** (ToM), the ability to attribute mental states to others. For multi-agent systems, ToM is what lets agents cooperate, negotiate, and communicate *efficiently* rather than blindly.

<svg viewBox="0 0 360 84" role="img" aria-label="Agent A models what agent B knows and wants, and acts accordingly" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <circle cx="70" cy="44" r="22" fill="#24405e"/><text x="70" y="41" text-anchor="middle" fill="#fff" font-size="6">agent A</text><text x="70" y="51" text-anchor="middle" fill="#cdd" font-size="5">models B</text>
  <rect x="150" y="24" width="110" height="40" rx="5" fill="#e8f4fd" stroke="#24405e" stroke-dasharray="3,2"/><text x="205" y="38" text-anchor="middle" font-size="5.5" fill="#6b6b6b">A's model of B:</text><text x="205" y="49" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"B knows X, wants Y,</text><text x="205" y="58" text-anchor="middle" font-size="5.5" fill="#6b6b6b">doesn't know Z yet"</text>
  <circle cx="315" cy="44" r="18" fill="#6a9bd0"/><text x="315" y="47" text-anchor="middle" fill="#fff" font-size="6">agent B</text>
  <path d="M92 44 L148 44" stroke="#888" marker-end="url(#tm)"/>
  <defs><marker id="tm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **What ToM enables in coordination:**
  - **Efficient communication** — if A knows B already knows X, A does not waste words explaining X; it says only what B *lacks*. Modeling the other's knowledge is what makes communication concise (the ACL intent idea, 16-03, taken further).
  - **Anticipation** — predicting what another agent will do lets you plan around it (avoid conflicting actions, hand off at the right time), rather than only reacting.
  - **Negotiation** — inferring the counterparty's goals and limits (their ZOPA, 16-20) is theory of mind applied to bargaining.
  - **Helping and teaching** — recognizing that another agent is *stuck* or *mistaken* (has a false belief) lets an agent correct or assist it.
- **LLMs and ToM:** large models show *some* theory-of-mind ability — they can reason about what a person or agent believes and intends, though imperfectly and inconsistently, and can be prompted to model a counterpart explicitly. For multi-agent design, you can *give* an agent a ToM by prompting it to maintain and reason over a model of each other agent's knowledge and goals — the entity-memory idea (14-28) pointed at other agents.

:::note
Theory of mind is the difference between agents that *coordinate* and agents that merely *co-exist*. Without it, agents talk past each other (re-explaining what the other knows), collide (acting without anticipating each other), and negotiate blindly. With it — even the imperfect, promptable version LLMs offer — agents communicate concisely, anticipate, and genuinely cooperate. As multi-agent systems grow more sophisticated, explicitly modeling *what each agent knows and wants* becomes a core design element, not an emergent nicety — the social intelligence layer on top of the task intelligence.
:::

## CrewAI: role-based crews

- **CrewAI** models a multi-agent system as a **crew** — a team of role-playing agents, each with a job title, a goal, and a backstory, collaborating on tasks. Its bet is **intuition**: describe agents the way you would describe people on a team, and let them work. **[VERIFY current API]**

<svg viewBox="0 0 360 96" role="img" aria-label="A crew of role-based agents (researcher, writer, editor) each with a goal, working tasks together" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="16" y="24" width="96" height="48" rx="5" fill="#e8f4fd" stroke="#24405e"/><text x="64" y="40" text-anchor="middle" font-size="6.5">researcher</text><text x="64" y="52" text-anchor="middle" font-size="5.5" fill="#6b6b6b">goal: find facts</text><text x="64" y="62" text-anchor="middle" font-size="5.5" fill="#6b6b6b">tools: search</text>
  <rect x="132" y="24" width="96" height="48" rx="5" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="40" text-anchor="middle" font-size="6.5">writer</text><text x="180" y="52" text-anchor="middle" font-size="5.5" fill="#6b6b6b">goal: draft post</text><text x="180" y="62" text-anchor="middle" font-size="5.5" fill="#6b6b6b">uses research</text>
  <rect x="248" y="24" width="96" height="48" rx="5" fill="#e8f4fd" stroke="#24405e"/><text x="296" y="40" text-anchor="middle" font-size="6.5">editor</text><text x="296" y="52" text-anchor="middle" font-size="5.5" fill="#6b6b6b">goal: polish</text><text x="296" y="62" text-anchor="middle" font-size="5.5" fill="#6b6b6b">final output</text>
  <path d="M112 48 L130 48" stroke="#888" marker-end="url(#cr)"/><path d="M228 48 L246 48" stroke="#888" marker-end="url(#cr)"/>
  <defs><marker id="cr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The mental model is a human team.** You define a researcher, a writer, an editor — each with a **role** (title), a **goal** (what it optimizes), and a **backstory** (context shaping its behavior). They pass work down the line: the researcher gathers facts, the writer drafts from them, the editor polishes. It reads like an org chart, which is exactly the point.
- **Why the framing wins adopters:** it is the most *approachable* multi-agent framework. You do not think in graphs (LangGraph) or actor messages (AutoGen) — you think in people and jobs, which non-experts grasp instantly. For quickly standing up a plausible multi-agent workflow, nothing is faster.
- **The role prompts do real work.** The role/goal/backstory become the agent's system prompt, and CrewAI's opinion is that richly-described personas produce better collaboration — a bet on prompt-as-persona.

:::note
CrewAI sits at the **high-convenience** end of the framework spectrum (14-43): least control, fastest to a working demo, most intuitive abstraction. That is a genuine strength for prototyping and for teams without deep agent expertise — and a genuine limitation when you need the tight control and reliability that a graph gives. Know it as the "describe a team and go" framework.
:::

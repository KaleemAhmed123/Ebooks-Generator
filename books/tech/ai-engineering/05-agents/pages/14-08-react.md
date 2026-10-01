## ReAct: reason and act

- **ReAct** (Reason + Act, Yao et al., 2022) is the pattern behind most agents. Its idea: make the model **write its reasoning out loud before each action**, interleaving *thought* and *action* instead of jumping straight to a tool call.
- Each turn produces a **Thought** (what to do and why), an **Action** (a tool call), and then an **Observation** (the result) — then it thinks again.

<svg viewBox="0 0 360 96" role="img" aria-label="ReAct alternates thought, action, and observation in a repeating cycle" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="20" y="36" width="70" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="55" y="51" text-anchor="middle" font-size="7">Thought</text>
  <rect x="140" y="36" width="70" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="175" y="51" text-anchor="middle" font-size="7">Action</text>
  <rect x="260" y="36" width="80" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="300" y="51" text-anchor="middle" font-size="7">Observation</text>
  <path d="M90 48 L138 48" stroke="#888" marker-end="url(#re)"/><path d="M210 48 L258 48" stroke="#888" marker-end="url(#re)"/><path d="M300 60 Q300 82 55 78 L55 62" stroke="#888" fill="none" marker-end="url(#re)"/>
  <text x="180" y="90" text-anchor="middle" font-size="6" fill="#6b6b6b">repeat until a Thought concludes the answer</text>
  <defs><marker id="re" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Why the explicit Thought helps.** Forcing the model to reason in words before acting is chain-of-thought (Booklet 4) applied to tool use. It plans the next step, catches its own mistakes ("I don't actually have the population yet"), and grounds each action in stated reasoning — which raises accuracy and makes the agent's behavior *legible* to you.
- **Reason + Act beats either alone.** Pure reasoning (chain-of-thought with no tools) hallucinates facts it cannot check. Pure acting (tool calls with no reasoning) fumbles the sequence. ReAct's interleaving lets the model *think about* what it *observes* — reasoning corrects action, action grounds reasoning.
- In modern APIs, ReAct is often implicit: native tool calling already lets the model emit reasoning text alongside a tool call. "Building a ReAct agent" today usually means the basic loop (14-03) with a prompt that encourages thinking before acting.

:::interview
"What is ReAct and why does it work?"

ReAct interleaves reasoning and acting: before each tool call the model writes a Thought explaining its plan, then takes an Action, then reads the Observation, and repeats. It works because reasoning and acting fix each other's weaknesses — chain-of-thought alone hallucinates unverifiable facts, tool calls alone lack a plan, and interleaving lets the model reason *about real observations*. It is the default agent pattern and the basis most frameworks build on.
:::

## Agent Skills

- Tools give an agent *capabilities*. **Skills** give it *know-how* — packaged instructions, and optionally scripts and resources, that teach an agent how to do a specific task well. A skill is a folder the agent loads on demand.
- Where MCP standardizes *access* to tools, skills standardize *procedural knowledge*: "here is how to review a PR," "here is our deploy checklist," "here is how to format a report." The agent reads the skill when the task calls for it and follows it.

<svg viewBox="0 0 360 92" role="img" aria-label="A skill folder bundles instructions, optional scripts, and resources the agent loads on demand" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="20" y="18" width="120" height="60" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="80" y="32" text-anchor="middle" font-size="6.5">skill/</text><text x="30" y="46" font-size="6">SKILL.md (instructions)</text><text x="30" y="58" font-size="6">scripts/ (optional code)</text><text x="30" y="70" font-size="6">resources/ (templates)</text>
  <rect x="220" y="34" width="120" height="28" rx="4" fill="#24405e"/><text x="280" y="52" text-anchor="middle" fill="#fff" font-size="6.5">agent loads on demand</text>
  <path d="M140 48 L218 48" stroke="#888" marker-end="url(#sk)"/>
  <defs><marker id="sk" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Why a skill and not just a longer system prompt?** Two reasons: skills are **modular and reusable** (write once, share across agents and teams, version them), and they are loaded **only when relevant** (next page), so an agent can "know" hundreds of procedures without carrying them all in context at once.
- **Why a skill and not an MCP tool?** A tool is a function to call; a skill is guidance to follow, often *about how to use tools*. A skill can say "use the `search` tool first, then the `summarize` tool, formatting results like this." Skills orchestrate tools with expertise.

:::note
The trio now maps cleanly: **MCP** = how the agent reaches tools; **A2A** = how it reaches other agents; **Skills** = how it knows procedures. Together they let you extend an agent along three axes — capability, collaboration, and know-how — without retraining the model. This is the modern "agent extensibility stack."
:::

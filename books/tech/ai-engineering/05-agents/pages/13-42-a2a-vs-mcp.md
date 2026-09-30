## A2A vs MCP: when each

- They are asked about together because they look similar and are not. Here is the clean separation. **[VERIFY]**

| | **MCP** | **A2A** |
|---|---|---|
| Connects | agent → tools/data | agent → agent |
| Other side is | a tool you invoke | a peer you delegate to |
| Other side's state | none of yours to see | its own, opaque |
| Interaction | call → result | task → status/artifacts |
| Duration | usually short | may be long, async |
| Direction | vertical (down to tools) | horizontal (across peers) |

<svg viewBox="0 0 360 84" role="img" aria-label="An orchestrator agent uses MCP for tools and A2A for peer agents at once" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <circle cx="180" cy="26" r="16" fill="#24405e"/><text x="180" y="29" text-anchor="middle" fill="#fff" font-size="6">agent</text>
  <g fill="#fdeef2" stroke="#a03050"><rect x="60" y="60" width="44" height="16" rx="2"/><rect x="112" y="60" width="44" height="16" rx="2"/></g><text x="108" y="52" text-anchor="middle" font-size="5.5" fill="#a03050">MCP: tools</text>
  <g fill="#eaf6ea" stroke="#1a3a2a"><rect x="210" y="60" width="44" height="16" rx="2"/><rect x="262" y="60" width="44" height="16" rx="2"/></g><text x="258" y="52" text-anchor="middle" font-size="5.5" fill="#1a3a2a">A2A: agents</text>
  <path d="M170 40 L100 58" stroke="#888" marker-end="url(#av)"/><path d="M175 40 L134 58" stroke="#888" marker-end="url(#av)"/><path d="M188 40 L232 58" stroke="#888" marker-end="url(#av)"/><path d="M192 40 L280 58" stroke="#888" marker-end="url(#av)"/>
  <defs><marker id="av" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **They compose.** A production system uses both: MCP to give each agent its tools, A2A to let agents delegate to each other. Choosing "MCP or A2A" is usually a false choice — the question is *which for this connection*.
- **Rule of thumb:** if the other side is a stateless function you invoke and await → MCP. If it is an autonomous system that owns a goal, keeps state, and reports back over time → A2A.

:::note
A2A is younger and less settled than MCP as of 2026 — governance, adoption, and the spec are still moving, so treat specifics as version-sensitive. The *concept* is stable and interview-relevant: a horizontal, task-based protocol for inter-agent delegation, complementary to MCP's vertical tool access. Know the split even as the details churn.
:::

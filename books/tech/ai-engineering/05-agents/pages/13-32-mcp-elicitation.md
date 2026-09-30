## MCP elicitation

- **Elicitation** lets a server ask the *user* for input mid-task, through the client — a structured "I need more information" request. Added in a 2025 spec revision, it fills the gap between "the server has everything" and "the server must guess." **[VERIFY capability status]**

<svg viewBox="0 0 360 90" role="img" aria-label="A server requests structured input, the client shows the user a form and returns their answer" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="260" y="28" width="90" height="34" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="305" y="42" text-anchor="middle" font-size="6.5">server</text><text x="305" y="53" text-anchor="middle" font-size="5.5" fill="#6b6b6b">needs a value</text>
  <rect x="130" y="28" width="90" height="34" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="175" y="42" text-anchor="middle" font-size="6.5">client</text><text x="175" y="53" text-anchor="middle" font-size="5.5" fill="#6b6b6b">shows a form</text>
  <rect x="14" y="28" width="70" height="34" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="49" y="48" text-anchor="middle" font-size="6.5">user</text>
  <path d="M258 38 L222 38" stroke="#888" marker-end="url(#el)"/><text x="240" y="26" text-anchor="middle" font-size="5">elicitation/</text><text x="240" y="20" text-anchor="middle" font-size="5">create</text>
  <path d="M128 40 L86 40" stroke="#888" marker-end="url(#el)"/><path d="M86 54 L128 54" stroke="#888" marker-end="url(#el)"/><path d="M220 56 L258 56" stroke="#888" marker-end="url(#el)"/><text x="240" y="70" text-anchor="middle" font-size="5">answer</text>
  <defs><marker id="el" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The flow:** the server sends `elicitation/create` with a message and a **JSON schema** for the answer it needs ("which repository?", "confirm delete?", "enter the date range"). The client renders it as a form or prompt, the user responds, and the client returns the structured answer — which the client validates against the schema.
- **Why it matters:** it turns servers into genuine **interactive workflows** instead of one-shot calls. A booking server can ask for missing dates; a deploy server can ask for confirmation; a query server can ask which environment. Before elicitation, servers had to fail or guess.
- **Contrast with sampling:** sampling asks the *model*; elicitation asks the *human*. Both flow server→client→up, both are mediated by the client, both keep the server from acting unilaterally.

:::note
Sampling and elicitation together make MCP servers first-class participants: a server can consult the model (sampling) and consult the user (elicitation), all through the client that stays in control. This is why MCP is more than a tool-calling shim — it is a bidirectional protocol where servers run real workflows, not just answer single requests.
:::

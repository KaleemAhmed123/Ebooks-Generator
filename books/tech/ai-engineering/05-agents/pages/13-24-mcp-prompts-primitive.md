## MCP primitive: prompts

- **Prompts are user-controlled.** They are pre-written prompt **templates** a server offers, which the user explicitly invokes — think the slash-commands in a chat app. `/summarize`, `/review-pr`, `/explain-code` can each be a prompt the server supplies.

<svg viewBox="0 0 360 90" role="img" aria-label="A server offers prompt templates the user selects, which expand into messages" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="24" width="70" height="44" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="45" y="42" text-anchor="middle" font-size="6.5">user</text><text x="45" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">picks /review-pr</text>
  <rect x="150" y="24" width="80" height="44" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="190" y="42" text-anchor="middle" font-size="6.5">server prompt</text><text x="190" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">template + args</text>
  <rect x="290" y="24" width="62" height="44" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="321" y="42" text-anchor="middle" font-size="6.5">messages</text><text x="321" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">→ to the model</text>
  <path d="M80 46 L148 46" stroke="#888" marker-end="url(#mp)"/><path d="M230 46 L288 46" stroke="#888" marker-end="url(#mp)"/>
  <defs><marker id="mp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The flow:** the client calls `prompts/list` to discover templates and their arguments, surfaces them to the user (as slash commands or menu items), and on selection calls `prompts/get` with the user's arguments. The server returns a fully-formed list of **messages** ready to send to the model.
- **User-controlled** completes the authority split: the *user* deliberately triggers a prompt, unlike tools (model-chosen) and resources (app-chosen). A server cannot make the model run a prompt on its own; a human picks it.
- Prompts let a server ship *expertise*, not just access — a well-crafted `/review-pr` template encodes how to review a pull request, reusable across every host that connects.

:::note
The three primitives form a clean authority triangle: **tools = model decides** (actions), **resources = app decides** (data), **prompts = user decides** (workflows). This split is a security design, not bureaucracy — it ensures the party with the right to take an action is the one who triggers it, so a server can offer capability without seizing control of the conversation.
:::

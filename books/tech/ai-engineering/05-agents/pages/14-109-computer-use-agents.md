## Computer-use agents

- A **computer-use agent** operates a graphical computer the way a person does — it sees the **screen**, moves the **mouse**, and types on the **keyboard**. It is the most general tool of all: anything a human can do on a screen, it can attempt, no API required. **[VERIFY current models/status]**

<svg viewBox="0 0 360 100" role="img" aria-label="The loop: screenshot, model decides an action, execute click or type, new screenshot, repeat" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="20" y="40" width="66" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="53" y="52" text-anchor="middle" font-size="6">screenshot</text><text x="53" y="61" text-anchor="middle" font-size="5.5" fill="#6b6b6b">the "eyes"</text>
  <rect x="146" y="38" width="66" height="28" rx="4" fill="#24405e"/><text x="179" y="55" text-anchor="middle" fill="#fff" font-size="6.5">model</text>
  <rect x="272" y="40" width="70" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="307" y="52" text-anchor="middle" font-size="6">click(x,y)/type</text><text x="307" y="61" text-anchor="middle" font-size="5.5" fill="#6b6b6b">the "hands"</text>
  <path d="M86 52 L144 52" stroke="#888" marker-end="url(#cua)"/><path d="M212 52 L270 52" stroke="#888" marker-end="url(#cua)"/><path d="M307 64 Q307 90 53 86 L53 66" stroke="#888" fill="none" marker-end="url(#cua)"/>
  <text x="180" y="94" text-anchor="middle" font-size="5.5" fill="#6b6b6b">act changes the screen → new screenshot → repeat</text>
  <defs><marker id="cua" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The loop** is the agent loop (14-03) with vision: take a screenshot → the VLM decides an action (click at coordinates, type text, scroll) → execute it → take a new screenshot → repeat. The perception half is the computer-use grounding of 12-44; this is the *acting* half.
- **Why it matters:** most enterprise software has no API. A computer-use agent can operate legacy apps, fill web forms, navigate SaaS UIs, and bridge systems that were never meant to talk — automation where integration was impossible. Frontier models (Claude, others) ship computer-use capabilities. **[VERIFY]**
- **Why it is hard:** grounding must be pixel-accurate (12-44), screens change under the agent (a popup, a slow load), and one wrong click can compound. It is slower and less reliable than an API call — use an API when one exists, computer-use when none does.

:::note
Computer-use is the universal fallback tool: when there is no API, no MCP server, no integration, there is still a screen a human could operate — and now an agent can too. That generality is powerful and dangerous: an agent with mouse and keyboard on a real machine can do anything a user can, including harm. The permission, sandbox, and human-approval discipline of Module 13 and 15 is not optional here — it is the whole safety story.
:::

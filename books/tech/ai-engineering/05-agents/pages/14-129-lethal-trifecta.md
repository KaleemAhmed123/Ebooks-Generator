## The lethal trifecta

- Simon Willison's **"lethal trifecta"** names exactly when prompt injection turns dangerous. An agent is at serious risk only when it combines **all three** of these — remove any one and the attack cannot complete. **[VERIFY]**

<svg viewBox="0 0 360 118" role="img" aria-label="Three overlapping capabilities — private data access, untrusted content, external communication — whose intersection is the danger zone" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <circle cx="130" cy="46" r="40" fill="#24405e" fill-opacity="0.18" stroke="#24405e"/><circle cx="230" cy="46" r="40" fill="#a03050" fill-opacity="0.18" stroke="#a03050"/><circle cx="180" cy="82" r="40" fill="#1a3a2a" fill-opacity="0.18" stroke="#1a3a2a"/>
  <text x="108" y="40" text-anchor="middle" font-size="6" fill="#24405e">private</text><text x="108" y="49" text-anchor="middle" font-size="6" fill="#24405e">data</text>
  <text x="252" y="40" text-anchor="middle" font-size="6" fill="#a03050">untrusted</text><text x="252" y="49" text-anchor="middle" font-size="6" fill="#a03050">content</text>
  <text x="180" y="98" text-anchor="middle" font-size="6" fill="#1a3a2a">can send</text><text x="180" y="107" text-anchor="middle" font-size="6" fill="#1a3a2a">externally</text>
  <text x="180" y="56" text-anchor="middle" font-size="6" fill="#a03050" font-weight="bold">☠ danger</text>
</svg>

- **The three ingredients:**
  1. **Access to private data** — the agent can read secrets, user files, internal systems.
  2. **Exposure to untrusted content** — the agent processes attacker-controllable input (web pages, emails, documents, tool outputs).
  3. **Ability to communicate externally** — the agent can send data out (email, HTTP request, posting, a tool that reaches the internet).
- **Why all three are needed:** injection (2) plants the malicious instruction; private access (1) gives it something valuable to steal; external comms (3) is the exfiltration channel. An agent with private data and untrusted input but **no way to send anything out** cannot leak — the attacker's instruction has nowhere to send the loot.
- **The design lever:** you often cannot remove untrusted content (it is the agent's job to read the web/email), so **break the trifecta by removing one of the other two** for any given flow — no private data *and* external comms together in the same agent context.

:::interview
"When is prompt injection actually dangerous, and how do you design around it?"

When the agent has all three of the lethal trifecta: access to private data, exposure to untrusted content, and the ability to send data externally. Injection needs untrusted content to carry the attack, private data to be worth stealing, and an outbound channel to exfiltrate. The defense is to break the trifecta per flow — since you usually can't stop the agent reading untrusted content, ensure an agent that touches private data can't also send externally, or vice versa. Never combine all three in one context handling attacker-controllable input.
:::

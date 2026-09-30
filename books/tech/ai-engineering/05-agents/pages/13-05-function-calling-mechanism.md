## Function calling: the mechanism

- **Function calling** (also "tool calling") is how the model requests a tool. The mechanism is trained, not bolted on: during post-training the model learned to emit a special, structured block when it decides a tool is needed, instead of plain prose.
- You pass the tool definitions with your request. The model, generating token by token, can produce either **text** (a normal answer) or a **tool-call block** (a request to run a function). A field on the response — `stop_reason: "tool_use"` (Anthropic) / `finish_reason: "tool_calls"` (OpenAI) — tells you which happened. **[VERIFY field names per provider]**

<svg viewBox="0 0 360 100" role="img" aria-label="With tools attached the model branches into either a text answer or a structured tool call" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="8" y="40" width="70" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="43" y="55" text-anchor="middle" font-size="6">request + tools</text>
  <rect x="118" y="38" width="60" height="28" rx="4" fill="#24405e"/><text x="148" y="55" text-anchor="middle" fill="#fff" font-size="6.5">model</text>
  <rect x="240" y="14" width="112" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="296" y="29" text-anchor="middle" font-size="6">text → done</text>
  <rect x="240" y="62" width="112" height="28" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="296" y="74" text-anchor="middle" font-size="6">tool_use block →</text><text x="296" y="84" text-anchor="middle" font-size="6">run + loop</text>
  <path d="M78 52 L116 52" stroke="#888" marker-end="url(#fc)"/><path d="M178 46 L238 30" stroke="#888" marker-end="url(#fc)"/><path d="M178 58 L238 74" stroke="#888" marker-end="url(#fc)"/>
  <defs><marker id="fc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- Under the hood the tool call is just **structured text the model was trained to emit** — often JSON — that the API parses into a typed object for you. The "magic" is entirely in post-training: the model learned when and how to produce it.
- Because it is generated text, it can be **malformed** — invalid JSON, a hallucinated tool name, a missing required field, a wrong type. Robust tool handling always validates before executing (13-10).

:::note
Function calling is the same next-token prediction you have seen all along, aimed at a structured target. Nothing new happens in the model at inference; it just sometimes predicts a tool-call block instead of prose. Everything you know about sampling, temperature, and prompting still applies — lower temperature, for instance, makes tool arguments more reliable.
:::

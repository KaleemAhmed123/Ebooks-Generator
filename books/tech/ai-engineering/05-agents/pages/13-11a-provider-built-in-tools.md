## Provider built-in tools

- Beyond the tools *you* define, model providers increasingly ship **built-in (server-side) tools** the model can use directly — web search, code execution, file handling — run by the provider, not your code. Knowing they exist saves you building what you can just enable. **[VERIFY per provider]**

<svg viewBox="0 0 360 84" role="img" aria-label="Provider-hosted tools run on the provider side; custom tools run in your code" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="165" height="56" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="92" y="30" text-anchor="middle" font-size="6.5">provider-hosted</text><text x="92" y="44" text-anchor="middle" font-size="6">web search · code · files</text><text x="92" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">runs on their side, you enable it</text><text x="92" y="66" text-anchor="middle" font-size="5.5" fill="#6b6b6b">no infra to build</text>
  <rect x="185" y="16" width="165" height="56" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="267" y="30" text-anchor="middle" font-size="6.5">your custom tools</text><text x="267" y="44" text-anchor="middle" font-size="6">your APIs · your DB · MCP</text><text x="267" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">runs in your code, you control it</text><text x="267" y="66" text-anchor="middle" font-size="5.5" fill="#6b6b6b">full control + responsibility</text>
</svg>

- **The two flavors:**
  - **Provider-hosted tools** — you set a flag and the model can call, e.g., web search or a code interpreter that the *provider* executes. No infrastructure for you to build or secure (they sandbox the code, run the search). Fast to adopt, but you get *their* implementation and less control.
  - **Custom tools** (13-02) — functions *you* implement and run, for anything provider tools do not cover: your database, your internal APIs, your business logic. Full control, full responsibility (you sandbox, you secure).
- **How to choose:** use provider-hosted tools for **generic capabilities** (web search, code execution) — do not rebuild what you can enable, and they come pre-secured. Build custom tools for **your specific systems** — provider tools cannot reach your database or call your API. A real agent mixes both: provider web-search plus your custom `lookup_order` tool.
- **The caveats:** provider tools are less portable (tied to that provider), less controllable (you cannot change their behavior), and their cost/latency/privacy are the provider's (a provider-run search sends the query to them). Weigh those against the convenience.

:::note
The practical takeaway: **do not build infrastructure a provider already offers.** Web search and code execution are commodity capabilities most providers now host, pre-sandboxed — enabling one is a flag, building one is a project. Reserve your engineering for the tools *only you can build* — access to your systems, your data, your logic (via custom functions or MCP, 13-27). The lazy-in-the-good-sense agent engineer enables the generic, builds the specific, and mixes both in one agent.
:::

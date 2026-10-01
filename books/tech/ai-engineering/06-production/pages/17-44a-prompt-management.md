## Prompt management and versioning

- The prompt is code — it changes behavior as much as a model swap — yet teams routinely hard-code prompts in source, edit them live, and have no idea which version produced last week's outputs. **Prompt management** treats prompts as versioned, testable, deployable artifacts.

<svg viewBox="0 0 360 84" role="img" aria-label="A prompt registry versions prompts, runs them through eval in CI, and deploys with canary and rollback, decoupled from code" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="12" y="34" width="70" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="47" y="44" text-anchor="middle" font-size="6">prompt registry</text><text x="47" y="52" text-anchor="middle" font-size="5" fill="#6b6b6b">versioned</text>
  <rect x="100" y="34" width="60" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="130" y="47" text-anchor="middle" font-size="6">eval in CI</text>
  <rect x="178" y="34" width="60" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="208" y="47" text-anchor="middle" font-size="6">canary</text>
  <rect x="256" y="34" width="60" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="286" y="47" text-anchor="middle" font-size="6">deploy</text>
  <rect x="256" y="10" width="90" height="16" rx="3" fill="#f3ede8" stroke="#8a6d3b"/><text x="301" y="21" text-anchor="middle" font-size="5.5">rollback (1 command)</text>
  <path d="M82 44 L98 44 M160 44 L176 44 M238 44 L254 44" stroke="#888" marker-end="url(#pm)"/><path d="M286 34 L296 26" stroke="#888" stroke-dasharray="2 2"/>
  <defs><marker id="pm" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **A prompt registry** stores prompts by name and version, decoupled from application code — so you can change a prompt without a code deploy, A/B two versions, and know exactly which version served any request (stamped in the trace, 17-45). Tools like LangSmith and PromptLayer provide this; a Git-backed store works too.
- **Prompts go through the same pipeline as code:** eval in CI (gate the change on the eval suite, 17-46a / 19-70), canary the new version (17-48), and — the payoff — **one-command rollback** when a prompt change regresses quality. This is what makes prompt changes safe to ship frequently.

:::interview
"A prompt change shipped last night and quality dropped. How is your setup supposed to handle this?"

Prompts are versioned artifacts, not hard-coded strings, so three things save me. **Attribution** — the trace records which prompt version served each request, so I confirm the regression correlates with the deploy in seconds. **Rollback** — the prompt is decoupled from code, so I revert to the last-known-good version with one command, no code deploy, mitigating immediately (17-52a). **Prevention** — the change should have been gated by the eval suite in CI and canaried before full rollout, which would've caught it. If prompts live hard-coded in source with no versioning or eval gate, none of that is possible — which is exactly why prompt management is infrastructure, not a nicety.
:::

## Security, secrets, and audit

- An LLM service handles two dangerous things at once: **credentials** (provider API keys, database access, tool permissions) and **untrusted text** (user prompts, retrieved documents, tool outputs) that flows straight into a model empowered to act. Both need locking down.
- **Secrets** never live in prompts, code, or logs. Provider keys sit in a secret manager (Vault, cloud KMS), are injected at runtime, scoped per service, and rotated. The gateway (17-47) holds the provider keys so apps never see them.

<svg viewBox="0 0 360 92" role="img" aria-label="Secrets flow from a vault to the gateway at runtime; prompts and outputs are redacted before logging; every action is audit-logged" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="38" width="46" height="20" rx="3" fill="#f3ede8" stroke="#8a6d3b"/><text x="35" y="51" text-anchor="middle" font-size="6">vault</text>
  <rect x="84" y="38" width="56" height="20" rx="3" fill="#24405e"/><text x="112" y="51" text-anchor="middle" font-size="6" fill="#fff">gateway</text>
  <rect x="168" y="38" width="52" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="194" y="51" text-anchor="middle" font-size="6">model</text>
  <rect x="248" y="16" width="100" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="298" y="28" text-anchor="middle" font-size="6">redact → logs</text>
  <rect x="248" y="62" width="100" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="298" y="74" text-anchor="middle" font-size="6">audit trail (who/what/when)</text>
  <path d="M58 48 L82 48" stroke="#888" marker-end="url(#se)"/><path d="M140 48 L166 48" stroke="#888" marker-end="url(#se)"/><path d="M220 44 L246 30" stroke="#a03050" marker-end="url(#se)"/><path d="M220 52 L246 68" stroke="#888" marker-end="url(#se)"/>
  <defs><marker id="se" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **PII in prompts and logs is a real exposure.** Prompts and outputs are the most useful thing to log for debugging *and* the most sensitive — they contain whatever the user typed. Redact or tokenise PII before it hits storage, set retention limits, and encrypt at rest. Many providers also offer a zero-retention / abuse-monitoring opt-out for regulated data.
- **Audit trail:** an append-only log of who invoked what model, with which tools, on whose behalf. Compliance requires it, incident response depends on it, and for agents that take actions it is the only record of what the system *did*.

:::warn
The LLM-specific breach class is **prompt injection reaching a privileged tool** — untrusted retrieved text tells the model to call a tool with the user's credentials (Booklet 5's lethal trifecta; Module 18 covers it in depth). Secrets management does not stop this: the model has legitimate access. The defence is *least privilege on tools* and *human confirmation on consequential actions*, enforced at the gateway — a secure key store around an over-permissioned agent is a vault with the door propped open.
:::

## EchoLeak and CVEs for AI

- Prompt injection stopped being theoretical when it started getting **CVE** numbers — Common Vulnerabilities and Exposures, the industry registry of real, catalogued security flaws. **EchoLeak** (2025) is the emblematic case: an indirect-prompt-injection data-exfiltration flaw in a production AI assistant, assigned a CVE like any other vulnerability.
- The pattern: an attacker sends the victim ordinary-looking content (an email, a shared document) containing a hidden instruction; the AI assistant processes it in the background; the instruction causes it to leak the user's private data through a channel the attacker controls — **zero clicks** from the victim.

<svg viewBox="0 0 360 88" role="img" aria-label="Attacker sends crafted content; the AI assistant auto-processes it and exfiltrates private context with no user action" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="34" width="60" height="22" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="40" y="44" text-anchor="middle" font-size="6">attacker</text><text x="40" y="53" text-anchor="middle" font-size="5" fill="#6b6b6b">crafted email</text>
  <rect x="96" y="34" width="74" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="133" y="44" text-anchor="middle" font-size="6">AI assistant</text><text x="133" y="53" text-anchor="middle" font-size="5" fill="#6b6b6b">auto-reads context</text>
  <rect x="196" y="34" width="74" height="22" rx="3" fill="#24405e"/><text x="233" y="44" text-anchor="middle" font-size="6" fill="#fff">hidden instr.</text><text x="233" y="53" text-anchor="middle" font-size="5" fill="#cdd">fires silently</text>
  <rect x="296" y="34" width="54" height="22" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="323" y="47" text-anchor="middle" font-size="5.5">data leaked</text>
  <path d="M70 45 L94 45" stroke="#888" marker-end="url(#el)"/><path d="M170 45 L194 45" stroke="#888" marker-end="url(#el)"/><path d="M270 45 L294 45" stroke="#a03050" marker-end="url(#el2)"/>
  <text x="180" y="80" text-anchor="middle" font-size="6" fill="#a03050">zero-click: victim did nothing</text>
  <defs><marker id="el" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker><marker id="el2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a03050"/></marker></defs>
</svg>

- **Why it matters for engineers.** This is the lethal trifecta (18-18) exploited in a shipped product: the assistant had access to private data, ingested untrusted content automatically, and had a channel to leak it. AI features are now in scope for the same vulnerability-disclosure, CVE-tracking, and patching processes as any other software.
- **The consequence:** LLM security is a *security* discipline, not a content-moderation one. Threat modelling, CVEs, responsible disclosure, and a patch pipeline apply to your AI features, and "the model was jailbroken" is now sometimes a reportable breach.

:::interview
"Is prompt injection a real security risk or a research curiosity?"

Real — it has production CVEs (EchoLeak-class zero-click exfiltration in shipped AI assistants). The right framing is that an AI feature is attack surface: an assistant that auto-processes untrusted content and holds private data with an outbound channel is the lethal trifecta in a real product, exploitable with no user action. So it belongs in your threat model, your disclosure process, and your patch cadence — and the mitigation is architectural (break the trifecta, least privilege), because there is no input-sanitisation patch that closes it.
:::

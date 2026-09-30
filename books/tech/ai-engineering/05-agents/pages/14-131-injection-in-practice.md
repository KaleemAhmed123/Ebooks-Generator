## Injection defense in practice

- Concrete patterns for common agent shapes, so the principles (14-129, 14-130) become design decisions.

<svg viewBox="0 0 360 84" role="img" aria-label="Three agent shapes and the defense that breaks their trifecta" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="8" y="14" width="112" height="60" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="64" y="28" text-anchor="middle" font-size="6.5">email agent</text><text x="64" y="42" text-anchor="middle" font-size="5.5" fill="#6b6b6b">reads untrusted email</text><text x="64" y="56" text-anchor="middle" font-size="5.5" fill="#1a3a2a">→ no auto-send +</text><text x="64" y="65" text-anchor="middle" font-size="5.5" fill="#1a3a2a">approval to send</text>
  <rect x="124" y="14" width="112" height="60" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="180" y="28" text-anchor="middle" font-size="6.5">browser agent</text><text x="180" y="42" text-anchor="middle" font-size="5.5" fill="#6b6b6b">reads untrusted web</text><text x="180" y="56" text-anchor="middle" font-size="5.5" fill="#1a3a2a">→ no access to secrets</text><text x="180" y="65" text-anchor="middle" font-size="5.5" fill="#1a3a2a">in browsing context</text>
  <rect x="240" y="14" width="112" height="60" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="296" y="28" text-anchor="middle" font-size="6.5">coding agent</text><text x="296" y="42" text-anchor="middle" font-size="5.5" fill="#6b6b6b">runs untrusted code</text><text x="296" y="56" text-anchor="middle" font-size="5.5" fill="#1a3a2a">→ sandbox, no creds,</text><text x="296" y="65" text-anchor="middle" font-size="5.5" fill="#1a3a2a">no network</text>
</svg>

- **Email/assistant agent** (reads untrusted email, has your data): never let it **auto-send**; require approval for any outbound message, and consider a read-only mode that drafts but cannot send. Breaks the trifecta at "external comms."
- **Browser agent** (reads untrusted web pages): run browsing in a context with **no access to credentials or private data**, and no tools that reach your internal systems. Breaks the trifecta at "private data."
- **Coding agent** (runs untrusted code, from a repo or a package): execute in a **sandbox** with no real credentials and no network (14-63), so injected code cannot exfiltrate or reach production. Breaks the trifecta at both "private data" and "external comms."
- **MCP-using agent** (untrusted server tool descriptions, 13-35): pin and review tool definitions, namespace servers, and gate tools that act — treat server-supplied text as untrusted input.
- **General rules:** treat all tool outputs and fetched content as untrusted, separate high-privilege and untrusted-content flows into different agents/contexts, and default to human approval for anything irreversible.

:::interview
**"Design a browser agent that reads arbitrary web pages safely."** Break the lethal trifecta at "private data": run the browsing agent in a context with no access to the user's credentials, secrets, or internal systems, and no tools that can send data to attacker-chosen destinations. It can read and summarize the web, but even if a page injects it, there's nothing sensitive to steal and no channel to exfiltrate. Add human approval for any consequential action, sandbox any code execution with no network, and monitor for anomalies. You assume injection succeeds and ensure the blast radius is nil.
:::

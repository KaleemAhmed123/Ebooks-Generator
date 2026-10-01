## AI control and subversion

- Alignment tries to make the model *want* the right thing. **AI control** (Redwood Research) takes the pessimistic complement: assume the model *may* be misaligned and deceptive, and design a deployment protocol that stays safe **anyway** — catching or containing bad actions even if the model is actively trying to subvert you. **[VERIFY]**
- It reframes safety as a security problem against an untrusted insider: you do not trust the powerful model, so you wrap it in controls a weaker, trusted model and humans can enforce.

<svg viewBox="0 0 360 92" role="img" aria-label="An untrusted strong model's actions pass through a trusted weak monitor that escalates suspicious actions to a human before execution" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="34" width="80" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="52" y="44" text-anchor="middle" font-size="6">untrusted strong</text><text x="52" y="53" text-anchor="middle" font-size="5.5" fill="#6b6b6b">does the work</text>
  <rect x="128" y="34" width="80" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="168" y="44" text-anchor="middle" font-size="6">trusted weak</text><text x="168" y="53" text-anchor="middle" font-size="5.5" fill="#6b6b6b">monitors / audits</text>
  <rect x="244" y="20" width="104" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="296" y="32" text-anchor="middle" font-size="6">execute (looks safe)</text>
  <rect x="244" y="52" width="104" height="18" rx="3" fill="#f3ede8" stroke="#8a6d3b"/><text x="296" y="64" text-anchor="middle" font-size="6">escalate to human</text>
  <path d="M92 46 L126 46" stroke="#888" marker-end="url(#ac)"/><path d="M208 42 L242 31" stroke="#1a3a2a" marker-end="url(#ac)"/><path d="M208 50 L242 60" stroke="#a03050" marker-end="url(#ac)"/>
  <defs><marker id="ac" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The core protocol** uses a *trusted weaker model* to monitor a *powerful untrusted model*: the strong model does the useful work, the weak model (which we trust because it is not capable enough to scheme) audits its actions and escalates anything suspicious to a human for review before it executes. Control research studies whether such protocols survive a strong model *deliberately trying* to slip a harmful action past the monitor.
- **Why it is valuable in practice.** Control does not require solving alignment — it degrades gracefully. Even if you cannot prove the model is aligned, a good control protocol bounds how much damage a misaligned one can do. That is deployable *today*, which is why it maps directly onto agent architectures.

:::note
AI control is the research-grade version of the agent guardrails from Booklet 5 and Module 17: least-privilege tools, human confirmation on consequential actions, tamper-proof monitoring, propose-then-commit. The framing is what makes it rigorous — *assume the model is adversarial and ask how much damage it can do before a trusted monitor catches it.* Designing to that assumption, rather than to "the model is probably fine," is the mindset a staff-level safety answer demonstrates.
:::

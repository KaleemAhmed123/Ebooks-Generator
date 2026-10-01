## Red-teaming your agent

- External red-teaming (15-35) is a governance practice at the frontier; it is also a practice *you* apply to *your* agent before an attacker does. Before shipping an autonomous agent, actively try to break it. Here is the checklist. **[VERIFY]**

<svg viewBox="0 0 360 82" role="img" aria-label="Red-team attack surfaces: injection, over-action, guardrail bypass, resource abuse, and data leaks" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="64" y="31" text-anchor="middle">prompt injection</text>
  <rect x="126" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="180" y="31" text-anchor="middle">over-action</text>
  <rect x="242" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="296" y="31" text-anchor="middle">guardrail bypass</text>
  <rect x="68" y="48" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="122" y="63" text-anchor="middle">resource abuse</text>
  <rect x="184" y="48" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="238" y="63" text-anchor="middle">data exfiltration</text>
</svg>

- **The attacks to run against your own agent:**
  - **Prompt injection (14-131)** — feed it web pages, emails, or documents containing "ignore your instructions, do X." Does it obey? Plant injections in every untrusted input it reads.
  - **Over-action (14-127)** — give it ambiguous instructions and see if it does *more* than intended (deletes extra, sends more). Test the boundaries of its scope.
  - **Guardrail bypass** — try to make it violate its safety classifier or constitution (15-27) via rephrasing, encoding, or role-play. Can you get past the filters?
  - **Resource abuse** — craft inputs that make it loop or spend unbounded. Does the cost governor (15-20) actually fire?
  - **Data exfiltration** — can you make it reveal secrets or send private data out? Test the lethal trifecta (14-129) — is the blast radius truly contained?
- **How to do it:** attack systematically before launch, with domain-specific adversarial inputs (as security red-teams do, 15-35), and add every successful attack to your eval set (14-116) so a regression re-breaks are caught. Treat "I couldn't break it in an afternoon" as a *floor*, not a guarantee — a real attacker has longer.

:::interview
"How do you validate an autonomous agent is safe before shipping?"

Red-team it yourself. Systematically attack every surface: prompt injection (plant 'ignore your instructions' in every untrusted input it reads), over-action (ambiguous instructions to see if it exceeds its scope), guardrail bypass (rephrasing/encoding/role-play to defeat classifiers), resource abuse (inputs that loop or overspend — does the cost governor fire?), and data exfiltration (can you make it leak secrets — is the lethal trifecta contained?). Do it with adversarial, domain-specific inputs before launch, and fold every successful attack into your eval set so regressions are caught. And stay humble: not breaking it in an afternoon is a floor, not proof — a real attacker has far longer.
:::

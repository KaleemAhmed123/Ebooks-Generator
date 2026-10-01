## AI incident response and disclosure

- When an AI system causes harm — a jailbreak that produced dangerous content, an injection that exfiltrated data (EchoLeak, 18-24), a biased decision that hurt users — it is a **security/safety incident** with the same lifecycle as any other, plus AI-specific twists.
- The lifecycle: detect → contain → investigate → remediate → disclose → learn.

<svg viewBox="0 0 360 66" role="img" aria-label="AI incident lifecycle: detect, contain, investigate, remediate, disclose, learn" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <g text-anchor="middle">
   <rect x="6" y="24" width="52" height="16" rx="2" fill="#24405e"/><text x="32" y="35" fill="#fff">detect</text>
   <rect x="64" y="24" width="52" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="90" y="35">contain</text>
   <rect x="122" y="24" width="58" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="151" y="35">investigate</text>
   <rect x="186" y="24" width="58" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="215" y="35">remediate</text>
   <rect x="250" y="24" width="52" height="16" rx="2" fill="#f3ede8" stroke="#8a6d3b"/><text x="276" y="35">disclose</text>
   <rect x="308" y="24" width="46" height="16" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="331" y="35">learn</text>
  </g>
  <path d="M58 32 L62 32 M116 32 L120 32 M180 32 L184 32 M244 32 L248 32 M302 32 L306 32" stroke="#888" marker-end="url(#ir2)"/>
  <defs><marker id="ir2" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Containment is a model/prompt rollback** (17-52a), not a code patch — often the fastest mitigation is reverting to a last-known-good prompt or model version, or tightening a guardrail, while you investigate. This is why versioning prompts and models is an incident-response prerequisite.
- **Disclosure has AI-specific channels.** Report to affected users and regulators as law requires (breach-notification rules apply if data leaked); file CVEs for exploitable vulnerabilities (18-24); and there is a growing norm of **responsible disclosure** for model vulnerabilities to the model provider before public release, plus AI-incident databases that track harms industry-wide.

:::note
The maturity signal is treating AI harms with the *same rigor* as security incidents — a defined process, a blameless postmortem, the failing case added to the eval and red-team suites (the "learn" step closes the loop back to Module 17's online eval and CI gates). The AI-specific parts are: containment via version rollback rather than deploy, disclosure obligations when the incident involved data leakage or a regulated decision, and feeding the incident back into evals so the *same* jailbreak or injection can't recur. Safety isn't just prevention; it's a response capability you build before you need it.
:::

## The LLM routing layer

- Not every request needs your biggest model. A **router** sits in front of your models and sends each request to the cheapest one that can handle it — a load balancer for intelligence.

<svg viewBox="0 0 360 100" role="img" aria-label="A router sends easy requests to a small model and hard ones to a large model" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="40" width="60" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="40" y="55" text-anchor="middle" font-size="6">request</text>
  <rect x="100" y="36" width="60" height="30" rx="4" fill="#24405e"/><text x="130" y="55" text-anchor="middle" fill="#fff" font-size="6.5">router</text>
  <rect x="220" y="12" width="130" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="285" y="26" text-anchor="middle" font-size="6">small/cheap model (easy)</text>
  <rect x="220" y="40" width="130" height="20" rx="3" fill="#d5e8fb" stroke="#24405e"/><text x="285" y="54" text-anchor="middle" font-size="6">large model (hard)</text>
  <rect x="220" y="68" width="130" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="285" y="82" text-anchor="middle" font-size="6">specialist (code, vision)</text>
  <path d="M70 51 L98 51" stroke="#888" marker-end="url(#rr)"/><path d="M160 46 L218 24" stroke="#888" marker-end="url(#rr)"/><path d="M160 51 L218 50" stroke="#888" marker-end="url(#rr)"/><path d="M160 56 L218 76" stroke="#888" marker-end="url(#rr)"/>
  <defs><marker id="rr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Why route:** a large model can cost 10–50× a small one per token and is slower. If half your traffic is simple ("summarize this", "classify that"), sending it to the flagship wastes money and latency. Route the easy half to a small model and keep the flagship for the hard half.
- **How to decide, cheapest first:**
  - **Rules** — by task type, prompt length, or which tool is needed. Simple, transparent, no extra model call.
  - **A classifier** — a tiny model scores difficulty and routes. More adaptive, small overhead.
  - **Cascade / escalation** — try the small model; if its answer fails a check (low confidence, failed validation), retry on the big one. Pays the big-model cost only when needed.
- **Specialist routing:** send code to a code model, images to a VLM, long context to a long-context model — route by *capability*, not just size.

:::interview
**"How would you cut the cost of a high-traffic LLM feature by half without hurting quality?"** Model routing. Profile the traffic: a large share is usually easy. Route those to a small/cheap model by rule or a lightweight classifier, and reserve the flagship for genuinely hard requests — optionally with a cascade that escalates only when the small model's output fails a check. You keep quality where it matters and stop paying flagship prices for trivial requests. Measure with the routing/quality trace before and after.
:::

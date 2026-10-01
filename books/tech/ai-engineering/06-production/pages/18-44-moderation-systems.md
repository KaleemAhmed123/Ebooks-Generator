## Moderation systems

- A **moderation system** is the production pipeline that screens content — user inputs and model outputs — against a policy and acts (block, flag, redact, escalate). It is where all the runtime safety pieces of this module assemble into one service, the safety counterpart to the AI gateway (17-47).

<svg viewBox="0 0 360 92" role="img" aria-label="A moderation pipeline runs classifiers on input and output, routes borderline cases to human review, and logs everything" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="38" width="44" height="18" rx="3" fill="#f4f4f4" stroke="#888"/><text x="34" y="50" text-anchor="middle" font-size="5.5">content</text>
  <rect x="72" y="34" width="70" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="107" y="44" text-anchor="middle" font-size="5.5">classifiers</text><text x="107" y="53" text-anchor="middle" font-size="5" fill="#6b6b6b">policy categories</text>
  <rect x="160" y="18" width="70" height="16" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="195" y="29" text-anchor="middle" font-size="5.5">allow</text>
  <rect x="160" y="38" width="70" height="16" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="195" y="49" text-anchor="middle" font-size="5.5">block / redact</text>
  <rect x="160" y="58" width="70" height="16" rx="3" fill="#f3ede8" stroke="#8a6d3b"/><text x="195" y="69" text-anchor="middle" font-size="5.5">borderline → human</text>
  <rect x="248" y="38" width="100" height="18" rx="3" fill="#24405e"/><text x="298" y="50" text-anchor="middle" font-size="5.5" fill="#fff">log + metrics + appeal</text>
  <path d="M56 47 L70 47" stroke="#888" marker-end="url(#mo)"/><path d="M142 44 L158 28" stroke="#888" marker-end="url(#mo)"/><path d="M142 47 L158 46" stroke="#888" marker-end="url(#mo)"/><path d="M142 50 L158 64" stroke="#888" marker-end="url(#mo)"/><path d="M230 46 L246 46" stroke="#888" marker-end="url(#mo)"/>
  <defs><marker id="mo" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **The building blocks** are the moderation APIs and classifiers: OpenAI's Moderation endpoint, Google's Perspective API (toxicity), and Llama Guard (18-22) for open self-hosting. You run them on inputs *and* outputs, map results to your policy categories, and pick an action per category and confidence.
- **Human-in-the-loop for the borderline.** A classifier alone forces a false-positive/false-negative tradeoff (18-22); a real system routes *uncertain* cases to human reviewers, uses their decisions to improve the classifier, and gives users an *appeal* path — because automated moderation at scale gets individual cases wrong and needs a correction channel.

:::note
Moderation is where safety stops being research and becomes an operated service with SLOs, dashboards, and on-call — the same discipline as Module 17. It has its own metrics (block rate, false-positive rate, appeal-overturn rate), its own failure modes (over-blocking frustrates users, under-blocking ships harm), and its own tuning per policy category and jurisdiction. The mature framing is that moderation is not a model you drop in but a *pipeline you operate and continuously calibrate* against a written policy.
:::

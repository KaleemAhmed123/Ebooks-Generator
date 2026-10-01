## Rapid mock: on-device assistant

- **Prompt:** "Design an AI assistant that runs on-device (phone/laptop) for privacy." **Clarify:** sensitive data must not leave the device, works offline, limited hardware (a few GB RAM, no datacenter GPU), but can use the cloud for hard queries if the user allows.
- This is the **edge inference** design (17-36), and the key pattern is **hybrid**: a small on-device model for the common/private cases, escalating to the cloud only when needed and permitted.

<svg viewBox="0 0 360 62" role="img" aria-label="On-device small model handles most queries locally; hard queries optionally escalate to a cloud model with consent" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="10" y="22" width="70" height="18" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="45" y="30" text-anchor="middle" font-size="5.5">on-device model</text><text x="45" y="37" text-anchor="middle" font-size="5" fill="#6b6b6b">1–4B, INT4</text>
  <rect x="110" y="22" width="60" height="18" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="140" y="33" text-anchor="middle" font-size="5.5">hard + consent?</text>
  <rect x="200" y="12" width="80" height="14" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="240" y="22" text-anchor="middle" font-size="5.5">local answer (default)</text>
  <rect x="200" y="34" width="80" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="240" y="44" text-anchor="middle" font-size="5.5">cloud model (opt-in)</text>
  <path d="M80 31 L108 31 M170 28 L198 20 M170 34 L198 40" stroke="#888" marker-end="url(#od)"/>
  <defs><marker id="od" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **On-device constraints drive the model choice** (17-36): a small (1–4B) heavily-quantized (INT4) model via llama.cpp/MLC/Core ML, because a few GB of RAM and no datacenter GPU is the ceiling. It handles the common, latency-sensitive, private cases instantly and offline.
- **The hybrid escalation** is the design's cleverness: most queries never leave the device (privacy + offline + free), and only *hard* queries — with explicit user consent — escalate to a capable cloud model. This is model routing (17-44) across the device/cloud boundary, with **privacy as the routing constraint** (sensitive queries never escalate).

:::interview
"Design a private, on-device AI assistant."

Edge inference with a hybrid fallback. On-device: a small (1–4B) INT4-quantized model via llama.cpp/MLC/Core ML — that's the hardware ceiling — handling the common, private, offline cases instantly with data never leaving the device. Then **hybrid escalation**: hard queries can route to a capable cloud model, but only with **explicit consent**, and sensitive queries are pinned on-device by policy (privacy as a routing constraint). This gives privacy and offline capability for the majority while retaining frontier quality for the few queries that need it and are allowed to escalate. The tradeoff to name: on-device means a far weaker model, so the design is really about *routing* — maximize what the small local model handles, escalate the rest with consent — which is model routing (17-44) drawn across the device/cloud line.
:::

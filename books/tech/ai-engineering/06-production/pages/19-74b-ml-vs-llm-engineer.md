## The AI engineer's job

- This series trained a specific role — **AI engineer** — distinct from both the classic ML engineer and the app developer who calls an API. Naming the distinction clarifies what you now are.

<svg viewBox="0 0 360 92" role="img" aria-label="Three roles on a spectrum: ML engineer trains models, AI engineer builds systems around models, app developer consumes an API" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="24" width="104" height="48" rx="4" fill="#eef3ee" stroke="#3b7a57"/><text x="62" y="38" text-anchor="middle" font-size="6.5" fill="#3b7a57">ML engineer</text><text x="62" y="52" text-anchor="middle" font-size="5.5">trains/researches</text><text x="62" y="62" text-anchor="middle" font-size="5.5">models, data, math</text>
  <rect x="128" y="24" width="104" height="48" rx="4" fill="#24405e"/><text x="180" y="38" text-anchor="middle" font-size="6.5" fill="#fff">AI engineer</text><text x="180" y="52" text-anchor="middle" font-size="5.5" fill="#cdd">builds SYSTEMS</text><text x="180" y="62" text-anchor="middle" font-size="5.5" fill="#cdd">around models</text>
  <rect x="246" y="24" width="104" height="48" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="298" y="38" text-anchor="middle" font-size="6.5" fill="#24405e">app developer</text><text x="298" y="52" text-anchor="middle" font-size="5.5">calls an API,</text><text x="298" y="62" text-anchor="middle" font-size="5.5">ships a feature</text>
</svg>

- **The AI engineer sits in the middle and spans both.** You don't (usually) train frontier models from scratch like an ML researcher, nor do you treat the model as an opaque API like an app developer. You *build the system around the model*: serving, retrieval, agents, evaluation, safety, cost — the whole production layer this booklet is about.
- **What defines the role.** Down: enough understanding of the model (you built GPT, Flagship 1) to reason about its behavior, memory, and cost, not treat it as magic. Up: the systems skill to serve it at scale, ground it, secure it, evaluate it, and control its cost. The unique middle: fluency with *both* the model's internals and the production system, which is exactly what lets you make the tradeoffs neither pure role can.

:::note
The role exists because LLMs created a gap: models became capable enough that the hard problem shifted from *training them* (ML research) to *building reliable, safe, affordable systems with them* (AI engineering). That's a distinct discipline with its own body of knowledge — serving economics, RAG, agents, eval, LLM security, AI system design — most of which didn't exist as a coherent field five years ago. Completing this series means you hold that body of knowledge end to end: you can go down to the tensors and up to the system, which is precisely the span that defines an AI engineer and what the senior/staff interview is testing for.
:::

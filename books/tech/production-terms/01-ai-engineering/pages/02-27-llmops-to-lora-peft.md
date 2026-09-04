## LLMOps

Operational practice for systems whose output is a distribution rather than a
value. Ordinary software is deterministic; here the same input varies between
calls, quality is a rate, and the model underneath can change without you
deploying anything.

Four practices carry most of it. Version prompt, model, retrieval configuration and
tool definitions as one bundle, because changing any of them changes behaviour.
Evaluate against a fixed dataset, not a few examples and an impression. Monitor
quality, not only latency and error rate — a system can be
fast, error-free and getting steadily worse. Be able to roll the whole bundle back.

**Treat a prompt change as a deployment.** Teams let prompts be edited in a
database by whoever noticed the problem, while the code around them goes through
review and CI. The prompt moves output further than that code does.

## LoRA & PEFT

*parameter-efficient fine-tuning*

Freeze the original weights and train small matrices alongside them whose product
stands in for the update. It rests on one observation: the *change* fine-tuning
makes is close to low-rank, so a far smaller structure captures it.

The LoRA paper reports 10,000× fewer trainable parameters and 3× lower GPU memory
than fine-tuning GPT-3 175B with Adam, at equal or better quality on their
benchmarks. What comes out is an adapter measured in megabytes, not a second copy
of the model.

<svg viewBox="0 0 460 78" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One frozen base model held in memory, with three small swappable adapters attached to it, each giving a different task-specific behaviour">
  <rect x="4" y="14" width="180" height="44" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="94" y="34" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">base weights — frozen</text>
  <text x="94" y="47" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">loaded once</text>
  <path d="M184 36 H222" stroke="#1a1a1a" stroke-width="1.2"/>
  <path d="M222 36 V12 M222 36 V60" stroke="#1a1a1a" stroke-width="1.2"/>
  <g stroke="#c25a35" stroke-width="1.2" fill="#1a1a1a">
    <path d="M222 12 H252"/><path d="M252 12 l-7 -4 v8 z" fill="#c25a35"/>
    <path d="M222 36 H252"/><path d="M252 36 l-7 -4 v8 z" fill="#c25a35"/>
    <path d="M222 60 H252"/><path d="M252 60 l-7 -4 v8 z" fill="#c25a35"/>
  </g>
  <rect x="254" y="2" width="128" height="20" fill="#fdece5" stroke="#c25a35" stroke-width="1.3"/>
  <text x="318" y="16" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">adapter — tenant A</text>
  <rect x="254" y="26" width="128" height="20" fill="#fdece5" stroke="#c25a35" stroke-width="1.3"/>
  <text x="318" y="40" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">adapter — tenant B</text>
  <rect x="254" y="50" width="128" height="20" fill="#fdece5" stroke="#c25a35" stroke-width="1.3"/>
  <text x="318" y="64" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">adapter — tenant C</text>
  <text x="390" y="40" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">chosen per</text>
  <text x="390" y="51" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">request</text>
</svg>

**The serving pattern matters more than the training economics.** Because the base
is untouched, adapters swap at request time. A full fine-tune per tenant is
unaffordable at any scale; an adapter per tenant is routine.

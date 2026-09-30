## Multi-LoRA serving

- LoRA (Booklet 4) fine-tunes a model by adding tiny low-rank **adapter** weights on top of a frozen base — a few megabytes, not gigabytes. **Multi-LoRA serving** exploits that: host *one* base model in GPU memory and swap thousands of small adapters in and out, so every tenant gets their own fine-tune without their own GPU.

<svg viewBox="0 0 360 92" role="img" aria-label="One base model in GPU memory serves many requests, each applying its own small LoRA adapter" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="120" y="34" width="120" height="26" rx="4" fill="#24405e"/><text x="180" y="50" text-anchor="middle" font-size="7" fill="#fff">base model (70B, in VRAM once)</text>
  <g fill="#e8f4fd" stroke="#24405e"><rect x="20" y="14" width="52" height="16" rx="3"/><rect x="20" y="38" width="52" height="16" rx="3"/><rect x="20" y="62" width="52" height="16" rx="3"/></g>
  <text x="46" y="25" text-anchor="middle" font-size="5.5">req: LoRA-A</text><text x="46" y="49" text-anchor="middle" font-size="5.5">req: LoRA-B</text><text x="46" y="73" text-anchor="middle" font-size="5.5">req: LoRA-C</text>
  <g fill="#eaf6ea" stroke="#1a3a2a"><rect x="288" y="14" width="52" height="16" rx="3"/><rect x="288" y="38" width="52" height="16" rx="3"/><rect x="288" y="62" width="52" height="16" rx="3"/></g>
  <text x="314" y="25" text-anchor="middle" font-size="5.5">adapter A (8MB)</text><text x="314" y="49" text-anchor="middle" font-size="5.5">adapter B</text><text x="314" y="73" text-anchor="middle" font-size="5.5">adapter C</text>
  <path d="M72 22 L118 40" stroke="#888" marker-end="url(#ml)"/><path d="M72 46 L118 47" stroke="#888" marker-end="url(#ml)"/><path d="M72 70 L118 54" stroke="#888" marker-end="url(#ml)"/>
  <path d="M240 42 L286 22" stroke="#888" marker-end="url(#ml)"/><path d="M240 47 L286 46" stroke="#888" marker-end="url(#ml)"/><path d="M240 52 L286 70" stroke="#888" marker-end="url(#ml)"/>
  <defs><marker id="ml" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- The engine (vLLM supports this) keeps the base weights resident and applies the request's adapter on the fly — and can even batch requests using *different* adapters in the same forward pass. The economics are decisive: 1,000 customer-specific fine-tunes cost ~one base model's worth of GPU, not 1,000.
- This is the standard answer to *"multi-tenant, each tenant wants their own model"* — the pattern behind fine-tuning-as-a-service platforms (and a Module 19 mock design).

:::interview
**"A thousand customers each want a model fine-tuned on their data. How do you serve that affordably?"** Not a thousand models — one base model with **per-customer LoRA adapters**, multi-LoRA served. The base sits in VRAM once; each adapter is a few megabytes loaded on demand, and requests with different adapters batch together. You store adapters cheaply (object storage), page hot ones into GPU, and fall back to the base for un-fine-tuned tenants. It turns a per-tenant-GPU cost into a per-tenant-few-megabytes cost — the whole reason fine-tuning-as-a-service is viable.
:::

## The complete LLM pipeline

- Every stage of this module, end to end. This is the map from raw text to a served, aligned assistant — and where your money and time actually go.

<svg viewBox="0 0 340 108" role="img" aria-label="Full pipeline: data to tokenizer to pretrain to base, then SFT to align to eval, then quantize to serve, with cost annotations" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="10" width="60" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="38" y="22" text-anchor="middle">data + tokenizer</text>
  <rect x="88" y="10" width="60" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="118" y="22" text-anchor="middle">pretrain</text>
  <rect x="168" y="10" width="60" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="198" y="22" text-anchor="middle">base model</text>
  <path d="M68 19 L86 19" stroke="#1a1a1a" marker-end="url(#f)"/><path d="M148 19 L166 19" stroke="#1a1a1a" marker-end="url(#f)"/>
  <rect x="8" y="46" width="60" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="38" y="58" text-anchor="middle">SFT</text>
  <rect x="88" y="46" width="60" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="118" y="58" text-anchor="middle">align DPO/RLHF</text>
  <rect x="168" y="46" width="60" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="198" y="58" text-anchor="middle">evaluate</text>
  <path d="M198 28 L38 44" stroke="#bbb" marker-end="url(#f)"/><path d="M68 55 L86 55" stroke="#1a1a1a" marker-end="url(#f)"/><path d="M148 55 L166 55" stroke="#1a1a1a" marker-end="url(#f)"/>
  <rect x="252" y="46" width="36" height="18" rx="3" fill="#24405e"/><text x="270" y="58" text-anchor="middle" fill="#fff">quantize</text>
  <rect x="296" y="46" width="36" height="18" rx="3" fill="#24405e"/><text x="314" y="58" text-anchor="middle" fill="#fff">serve</text>
  <path d="M228 55 L250 55" stroke="#1a1a1a" marker-end="url(#f)"/><path d="M288 55 L294 55" stroke="#1a1a1a" marker-end="url(#f)"/>
  <text x="118" y="82" text-anchor="middle" fill="#c0392b" font-size="7">↑ few labs · $millions · months</text>
  <text x="118" y="94" text-anchor="middle" fill="#1a3a2a" font-size="7">↓ everyone else · cheap · days — where you work</text>
  <defs><marker id="f" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **The dividing line**: pretraining a base model is out of reach for almost everyone. The rest — SFT, alignment (DPO), evaluation, quantization, serving — is affordable, fast, and open. This is the applied AI engineer's actual toolkit.
- **The common real-world path**: start from an open base or instruct model → SFT or QLoRA on your data → optionally DPO on preference pairs → evaluate → quantize (AWQ/GGUF) → serve (vLLM/SGLang). No pretraining required.

:::note
Most products never train a model at all — they *prompt* one through an API (Module 11). Training your own is worth it only when prompting plus retrieval genuinely falls short: a specialised domain, a private style, strict latency/cost limits, or on-prem requirements.
:::

:::warn
The pipeline is only as strong as its weakest stage, and the failures cascade forward: dirty data poisons the base, thin SFT data narrows behaviour, biased preferences misalign, and over-aggressive quantization erases hard-won quality at the very last step. Cutting corners early is invisible until it surfaces in production.
:::

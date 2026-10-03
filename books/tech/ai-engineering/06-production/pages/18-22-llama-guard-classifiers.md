## Llama Guard and safety classifiers

- Red-team tools *find* weaknesses offline. In production you need a *runtime* guard: a fast classifier that screens every input and output and blocks the unsafe ones before they reach the user or the tools. **Llama Guard** (Meta) is the open standard — an LLM fine-tuned to classify content against a safety taxonomy.
- It runs as a cheap sidecar around the main model: classify the user prompt, and classify the model's response, each returning safe/unsafe plus the violated category.

<svg viewBox="0 0 360 90" role="img" aria-label="Llama Guard screens the input before the model and the output after, blocking unsafe content in either direction" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="38" width="42" height="18" rx="3" fill="#f4f4f4" stroke="#888"/><text x="31" y="50" text-anchor="middle" font-size="5.5">user</text>
  <rect x="66" y="34" width="52" height="26" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="92" y="45" text-anchor="middle" font-size="5.5">guard: in</text><text x="92" y="54" text-anchor="middle" font-size="5" fill="#6b6b6b">block/allow</text>
  <rect x="132" y="38" width="52" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="158" y="50" text-anchor="middle" font-size="6">model</text>
  <rect x="198" y="34" width="52" height="26" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="224" y="45" text-anchor="middle" font-size="5.5">guard: out</text><text x="224" y="54" text-anchor="middle" font-size="5" fill="#6b6b6b">block/allow</text>
  <rect x="264" y="38" width="52" height="18" rx="3" fill="#f4f4f4" stroke="#888"/><text x="290" y="50" text-anchor="middle" font-size="5.5">response</text>
  <path d="M52 47 L64 47" stroke="#888" marker-end="url(#lg)"/><path d="M118 47 L130 47" stroke="#888" marker-end="url(#lg)"/><path d="M184 47 L196 47" stroke="#888" marker-end="url(#lg)"/><path d="M250 47 L262 47" stroke="#888" marker-end="url(#lg)"/>
  <defs><marker id="lg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Input and output, both.** Screening the *input* catches the harmful request before it is answered; screening the *output* catches the harm the model produced anyway (jailbroken, or a benign prompt that led somewhere bad). Output screening is what defeats the encoding-gap jailbreaks (18-17) — the harmful *result* is plain even when the input was obfuscated.
- **The taxonomy is configurable.** Llama Guard classifies against categories (violence, self-harm, illegal, sexual, etc.) you can extend for your product's specific policy. Its output feeds the safety metric (17-46) and the incident signal (17-52a).

:::warn
A classifier guard is a probabilistic filter, not a wall — it has false negatives (unsafe content it misses) and false positives (safe content it blocks, hurting UX). Tune the threshold to the stakes: strict where harm is severe, loose where over-blocking frustrates users. And never rely on it *alone* — it is one ring in the layered stack (aligned base model + guard classifier + least-privilege tools + human oversight). A single classifier between a jailbroken model and the user is a coin flip on the hard cases.
:::

## Vision-language-action models

- A **VLA** (Vision-Language-Action model) is a VLM with a third modality on the *output* side: **actions**. It looks at a camera image, reads an instruction ("put the red block in the bowl"), and emits **motor commands** for a robot.
- The bet is transfer: a model that already understands objects, language, and space from internet-scale VLM pretraining needs far less robot data to learn *acting* than a robot policy trained from scratch. Vision-language knowledge becomes a head start on control.

<svg viewBox="0 0 360 92" role="img" aria-label="A VLA takes a camera image and instruction and outputs robot actions in a loop with the world" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="8" y="20" width="58" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="37" y="33" text-anchor="middle" font-size="6">📷 camera</text>
  <rect x="8" y="46" width="58" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="37" y="59" text-anchor="middle" font-size="6">"pick red"</text>
  <rect x="96" y="30" width="70" height="30" rx="4" fill="#24405e"/><text x="131" y="48" text-anchor="middle" fill="#fff" font-size="6.5">VLA</text>
  <rect x="196" y="32" width="70" height="26" rx="3" fill="#a03050"/><text x="231" y="48" text-anchor="middle" fill="#fff" font-size="6">action tokens</text>
  <rect x="296" y="30" width="56" height="30" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="324" y="48" text-anchor="middle" font-size="6">🦾 robot</text>
  <path d="M66 30 L94 38" stroke="#888" marker-end="url(#va)"/><path d="M66 56 L94 50" stroke="#888" marker-end="url(#va)"/><path d="M166 45 L194 45" stroke="#888" marker-end="url(#va)"/><path d="M266 45 L294 45" stroke="#888" marker-end="url(#va)"/>
  <path d="M324 60 Q324 84 40 80 L40 68" stroke="#bbb" stroke-dasharray="3,2" fill="none" marker-end="url(#va)"/><text x="180" y="88" text-anchor="middle" font-size="5.5" fill="#6b6b6b">act changes the scene → new image → repeat</text>
  <defs><marker id="va" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- The loop is an **agent loop** (Module 14) grounded in the physical world: see → decide action → act → the world changes → see again. Unlike a software agent, a wrong action here knocks over a cup or crashes an arm — the stakes are physical.
- The lineage runs from Google's **RT-2** (2023, the first internet-scale VLA) to the open and frontier models on the next page.

:::note
VLAs are why "agents" and "multimodal" belong in one booklet. A robot policy *is* a multimodal agent: perception (this module), a decision loop (Module 14), and tools that happen to be motors. Everything you learn about agent loops, memory, and failure modes applies — with the added, unforgiving constraint that the environment is real and mistakes break things.
:::

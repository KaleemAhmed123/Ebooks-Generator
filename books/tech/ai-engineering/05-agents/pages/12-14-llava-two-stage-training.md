## LLaVA training: two stages

- You cannot train the projector and the LLM together from cold — the projector emits garbage at first, and letting that garbage update the LLM would damage its language ability. LLaVA splits training in two.

<svg viewBox="0 0 360 112" role="img" aria-label="Stage one trains only the projector, stage two trains projector and LLM together" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="90" y="14" text-anchor="middle" font-size="7" fill="#24405e">Stage 1 · align</text>
  <rect x="30" y="24" width="48" height="20" rx="2" fill="#dde" stroke="#888"/><text x="54" y="37" text-anchor="middle" font-size="5.5">CLIP ❄</text>
  <rect x="88" y="24" width="48" height="20" rx="2" fill="#a03050"/><text x="112" y="37" text-anchor="middle" fill="#fff" font-size="5.5">proj 🔥</text>
  <rect x="146" y="24" width="40" height="20" rx="2" fill="#dde" stroke="#888"/><text x="166" y="37" text-anchor="middle" font-size="5.5">LLM ❄</text>
  <text x="108" y="58" text-anchor="middle" font-size="5.5" fill="#6b6b6b">image-caption pairs · learn the map</text>
  <text x="270" y="14" text-anchor="middle" font-size="7" fill="#24405e">Stage 2 · instruct</text>
  <rect x="210" y="24" width="48" height="20" rx="2" fill="#dde" stroke="#888"/><text x="234" y="37" text-anchor="middle" font-size="5.5">CLIP ❄</text>
  <rect x="268" y="24" width="48" height="20" rx="2" fill="#a03050"/><text x="292" y="37" text-anchor="middle" fill="#fff" font-size="5.5">proj 🔥</text>
  <rect x="326" y="24" width="30" height="20" rx="2" fill="#24405e"/><text x="341" y="37" text-anchor="middle" fill="#fff" font-size="5.5">LLM🔥</text>
  <text x="283" y="58" text-anchor="middle" font-size="5.5" fill="#6b6b6b">instruction data · learn to answer</text>
  <line x1="20" y1="72" x2="340" y2="72" stroke="#eee"/>
  <text x="180" y="88" text-anchor="middle" font-size="6.5">Stage 1: only the projector moves — a cheap "translator warm-up".</text>
  <text x="180" y="102" text-anchor="middle" font-size="6.5">Stage 2: projector + LLM move — the model learns to follow visual instructions.</text>
</svg>

- **Stage 1 — feature alignment.** Freeze CLIP and the LLM. Train *only* the projector on ~600k image-caption pairs. Goal: make the projected visual tokens land where the LLM expects word tokens. Cheap, fast, low-risk.
- **Stage 2 — visual instruction tuning.** Unfreeze the LLM (keep CLIP frozen). Train projector + LLM on **instruction data** — image + question → answer (next page). Now the model learns to *use* the visual tokens to follow orders, not just caption.

:::warn
Skip stage 1 and you inject noisy visual tokens into an untrained projector directly into the LLM's gradient — the LLM's language ability degrades before the projector is any good. The staging is not bureaucracy; it is what protects the pretrained LLM. This "warm up the adapter, then co-train" order recurs across VLM and adapter training.
:::

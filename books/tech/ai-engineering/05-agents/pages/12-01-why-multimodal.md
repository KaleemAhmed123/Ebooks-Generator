# Multimodal AI & VLMs

## Why multimodal AI

- A text-only model reads and writes words. The world is not words. It is screenshots, invoices, X-rays, charts, camera frames, spoken voice. An agent that only reads text is blind in a world that is mostly pixels and sound.
- **Multimodal** means one model handles more than one *modality* — a modality being a kind of signal: text, image, audio, video, or robot action. A **vision-language model (VLM)** is the workhorse case: it takes images *and* text in, and writes text out.

<svg viewBox="0 0 360 118" role="img" aria-label="Text, image, and audio inputs flow into one model that outputs text or actions" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="8" y="14" width="70" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="43" y="26" text-anchor="middle">text</text>
  <rect x="8" y="48" width="70" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="43" y="60" text-anchor="middle">image</text>
  <rect x="8" y="82" width="70" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="43" y="94" text-anchor="middle">audio</text>
  <rect x="140" y="40" width="80" height="34" rx="4" fill="#24405e"/><text x="180" y="61" text-anchor="middle" fill="#fff" font-size="8">one model</text>
  <rect x="282" y="30" width="70" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="317" y="42" text-anchor="middle">text out</text>
  <rect x="282" y="64" width="70" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="317" y="76" text-anchor="middle">action</text>
  <path d="M78 23 L138 48" stroke="#888" marker-end="url(#mm)"/><path d="M78 57 L138 57" stroke="#888" marker-end="url(#mm)"/><path d="M78 91 L138 66" stroke="#888" marker-end="url(#mm)"/>
  <path d="M220 52 L280 40" stroke="#888" marker-end="url(#mm)"/><path d="M220 60 L280 72" stroke="#888" marker-end="url(#mm)"/>
  <defs><marker id="mm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Why an agent chapter opens here:** the highest-value agents in 2026 are multimodal. A coding agent reads a screenshot of a broken UI. A browser agent sees the page it clicks. A robot maps a camera to a motor command. Tools and orchestration (the rest of this booklet) sit *on top of* perception. If the model cannot see, no amount of orchestration saves it.
- The whole trick of a VLM is one idea repeated: **turn every modality into tokens the language model already understands**, then let the transformer you met in Booklet 3 do the rest. The modules ahead are variations on how to do that turning well.

:::note
The mental model for this entire module: a language model is a machine that predicts the next token over a sequence. "Multimodal" never changes that machine. It only changes what you are allowed to put *in* the sequence — a patch of an image, a slice of audio, a robot action — all cast as tokens the same transformer consumes.
:::

## LLaVA's instruction data trick

- Stage 2 needs data of the form *(image, instruction, good answer)*. Humans writing millions of these is slow and costly. LLaVA's real innovation is how it **generated** that data almost for free.

### Use a text-only model to write visual data
- Take an image that already has **text annotations** — COCO images come with captions and bounding boxes (object + coordinates).
- Feed *only that text* (captions + boxes, no pixels) to a strong text LLM (GPT-4, 2023). The boxes tell it what is where; it never sees the image.
- Prompt it to invent rich instruction-answer pairs: detailed descriptions, multi-turn Q&A, and reasoning ("why might this be dangerous?").

<svg viewBox="0 0 360 96" role="img" aria-label="Captions and boxes go to a text LLM which writes question-answer pairs used to train the VLM" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="8" y="22" width="86" height="48" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="51" y="40" text-anchor="middle" font-size="6">captions +</text><text x="51" y="52" text-anchor="middle" font-size="6">boxes (text)</text>
  <rect x="128" y="26" width="72" height="40" rx="4" fill="#24405e"/><text x="164" y="42" text-anchor="middle" fill="#fff" font-size="6.5">text LLM</text><text x="164" y="55" text-anchor="middle" fill="#cdd" font-size="5.5">no pixels</text>
  <rect x="234" y="22" width="118" height="48" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="293" y="40" text-anchor="middle" font-size="6">Q: what's unusual?</text><text x="293" y="52" text-anchor="middle" font-size="6">A: a man irons on a taxi</text>
  <path d="M94 46 L126 46" stroke="#888" marker-end="url(#id)"/><path d="M200 46 L232 46" stroke="#888" marker-end="url(#id)"/>
  <text x="180" y="88" text-anchor="middle" font-size="6" fill="#6b6b6b">the pairs pair back with the real image to train the VLM</text>
  <defs><marker id="id" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- The generated pairs are then matched with the **real image** and used to train the VLM. A text model bootstrapped a *visual* model's training set — ~150k samples at launch, for the cost of API calls.

:::interview
"Where does visual instruction-tuning data come from?"

Increasingly, from other models. LLaVA showed you can turn cheap text annotations (captions, boxes) into rich visual Q&A by prompting a text-only LLM, then pairing its output with the source image. This "model-generated training data" is now standard across VLMs — and its ceiling is the teacher model: errors and biases in the generator flow straight into the student.
:::

## VLM: training and evaluation

- Training a VLM is **two stages** (LLaVA, Booklet 5), and the split is the key design choice — it decides what learns what.

<svg viewBox="0 0 360 78" role="img" aria-label="Stage 1 trains only the projector on captions; stage 2 fine-tunes projector and LLM on instructions" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="14" y="16" width="150" height="48" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="89" y="30" text-anchor="middle" font-size="6.5" fill="#24405e">stage 1: align</text><text x="89" y="44" text-anchor="middle" font-size="5.5">freeze ViT + LLM</text><text x="89" y="54" text-anchor="middle" font-size="5.5">train ONLY projector · on captions</text>
  <rect x="184" y="16" width="162" height="48" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="265" y="30" text-anchor="middle" font-size="6.5" fill="#1a3a2a">stage 2: instruct</text><text x="265" y="44" text-anchor="middle" font-size="5.5">unfreeze LLM (+projector)</text><text x="265" y="54" text-anchor="middle" font-size="5.5">train on visual instructions</text>
</svg>

- **Stage 1 (alignment):** freeze both the vision encoder and the LLM, train *only the projector* on image-caption pairs. Cheap, and it teaches the bridge to place visual tokens where the LLM can read them, without disturbing the LLM's language ability.
- **Stage 2 (instruction tuning):** unfreeze the LLM and fine-tune projector + LLM together on *visual instruction* data (image + question → answer) — the SFT of Flagship 2, with images. This teaches the model to *reason* about images, not just caption them.
- **Evaluation** uses VLM benchmarks (Booklet 5): DocVQA and ChartQA for document/chart understanding, MMMU for multimodal reasoning, and POPE for **hallucination** (does the model claim to see objects that aren't there?) — the VLM-specific failure that a text metric can't catch.

:::interview
"How would you build and train a document-QA VLM?"

Architecture: a **ViT** patchifies the image, a **projector** (small MLP) maps patch features into the LLM's token space, and the projected tokens are **prepended** to the text so the LLM attends over both. Training in **two stages**: freeze ViT+LLM and train *only the projector* on captions to learn alignment cheaply, then unfreeze and instruction-tune on image-question-answer data to learn reasoning. For *documents* specifically, I'd raise the **patch/resolution budget** so small text is legible (the cost/quality knob, 17-28b), and evaluate with DocVQA/ChartQA plus **POPE for hallucination**. Naming the frozen-then-unfrozen two-stage split, and resolution as the document-QA lever, is the depth signal.
:::

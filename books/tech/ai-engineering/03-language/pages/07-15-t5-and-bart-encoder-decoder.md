## T5 and BART: encoder–decoder

- Keep **both** halves — encoder and decoder — and you get the full 2017 architecture, best for turning one sequence into another: translation, summarization, rephrasing.
- The encoder reads the whole input bidirectionally; the decoder generates the output causally, **cross-attending** to the encoder's output at every step (the seq2seq-with-attention idea of page 05-15, now all-transformer).

### Two influential examples

- **T5** (Google, 2019) — "Text-to-Text Transfer Transformer." Its big idea: cast **every** NLP task as text-in, text-out. Translation, classification, QA, summarization all become "read this string, write that string," so one model and one training recipe cover them all.
- **BART** (Facebook, 2019) — pretrained by corrupting text (deleting, shuffling, masking spans) and learning to reconstruct the original. Strong at summarization and generation.

<svg viewBox="0 0 360 72" role="img" aria-label="Encoder reads the source, decoder generates the target while cross-attending to the encoder" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="20" y="26" width="90" height="30" rx="4" fill="#24405e"/><text x="65" y="40" text-anchor="middle" fill="#fff">encoder</text><text x="65" y="50" text-anchor="middle" fill="#fff" font-size="7">(bidirectional)</text>
  <rect x="240" y="26" width="90" height="30" rx="4" fill="#1a3a2a"/><text x="285" y="40" text-anchor="middle" fill="#fff">decoder</text><text x="285" y="50" text-anchor="middle" fill="#fff" font-size="7">(causal)</text>
  <path d="M112 41 L238 41" stroke="#c0392b" stroke-width="2" marker-end="url(#td)"/><text x="175" y="34" text-anchor="middle" font-size="7" fill="#c0392b">cross-attention</text>
  <text x="65" y="18" text-anchor="middle" fill="#6b6b6b">source in</text><text x="285" y="18" text-anchor="middle" fill="#6b6b6b">target out</text>
  <defs><marker id="td" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker></defs>
</svg>

:::note
Three wirings, three jobs: **encoder-only** (BERT) understands, **decoder-only** (GPT) generates, **encoder–decoder** (T5, BART) transforms one text into another. As of September 2026 the decoder-only design dominates because it scales best and a big enough decoder can *also* do understanding and translation from a prompt — but encoder–decoder models remain strong and efficient for fixed input-to-output tasks like translation.
:::

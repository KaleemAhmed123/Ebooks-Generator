## Sequence to sequence

- Classification maps a sequence to one label. But translation, summarization, and chat map a sequence to *another sequence* of any length. The **encoder–decoder** (seq2seq, 2014) architecture does this.
- Two RNNs (or LSTMs). The **encoder** reads the whole input and squeezes it into one fixed vector — the **context vector**. The **decoder** starts from that vector and generates the output one token at a time, feeding each token back in to produce the next.

<svg viewBox="0 0 380 96" role="img" aria-label="Encoder reads the source into a context vector, decoder generates the target word by word" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <g fill="#24405e"><rect x="18" y="30" width="34" height="24" rx="3"/><rect x="58" y="30" width="34" height="24" rx="3"/><rect x="98" y="30" width="34" height="24" rx="3"/></g>
  <text x="75" y="70" text-anchor="middle" fill="#6b6b6b">encoder (read source)</text>
  <circle cx="170" cy="42" r="16" fill="#c0392b"/><text x="170" y="45" text-anchor="middle" fill="#fff" font-size="7">context</text>
  <path d="M132 42 L152 42" stroke="#1a1a1a" marker-end="url(#s)"/><path d="M186 42 L206 42" stroke="#1a1a1a" marker-end="url(#s)"/>
  <g fill="#1a3a2a"><rect x="208" y="30" width="34" height="24" rx="3"/><rect x="248" y="30" width="34" height="24" rx="3"/><rect x="288" y="30" width="34" height="24" rx="3"/></g>
  <text x="285" y="70" text-anchor="middle" fill="#6b6b6b">decoder (write target)</text>
  <defs><marker id="s" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The output length is free: the decoder keeps generating until it emits a special **end-of-sequence** token. That is how a 5-word English sentence becomes a 9-word German one.

:::warn
The whole input must fit through **one fixed-size context vector.** For a short sentence, fine. For a long paragraph, that single vector becomes an **information bottleneck** — the encoder cannot cram 80 words into 512 numbers without losing the early ones. Translation quality falls off sharply as sentences grow. The fix, on the next page, is the idea that everything else in this booklet is built on: attention.
:::

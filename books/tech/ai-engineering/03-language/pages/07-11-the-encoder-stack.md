## The encoder stack

- The original transformer has two halves: an **encoder** that reads the input, and a **decoder** that writes the output. This page is the encoder; the next is the decoder.
- The **encoder** turns a sequence of tokens into a sequence of context-rich vectors — one per input token, each aware of the whole sentence. It is a plain stack of the transformer blocks from page 07-10.

### The defining trait: bidirectional attention

- In the encoder, every token attends to **every other token — left and right.** When processing *"bank"*, it sees both *"river"* before and *"flooded"* after.
- This full, two-way view is ideal for **understanding** tasks: classification, NER, retrieval, anything where you have the whole input up front and want the richest possible representation of it.

<svg viewBox="0 0 340 74" role="img" aria-label="In the encoder every token attends to every other token in both directions" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <g fill="#24405e"><circle cx="60" cy="40" r="10"/><circle cx="140" cy="40" r="10"/><circle cx="220" cy="40" r="10"/><circle cx="300" cy="40" r="10"/></g>
  <g fill="#fff" font-size="7" text-anchor="middle"><text x="60" y="43">the</text><text x="140" y="43">bank</text><text x="220" y="43">was</text><text x="300" y="43">wet</text></g>
  <g stroke="#c0392b" stroke-width="0.7" fill="none"><path d="M60 30 Q100 4 140 30"/><path d="M140 30 Q180 4 220 30"/><path d="M220 30 Q260 4 300 30"/><path d="M60 50 Q160 78 300 50"/><path d="M140 50 Q180 74 220 50"/></g>
  <text x="170" y="70" text-anchor="middle" fill="#6b6b6b">attends both directions</text>
</svg>

:::note
**BERT** (next-but-one page) is an encoder-only model — it kept just this half. That is why BERT is a machine for *understanding* text, not generating it: bidirectional attention needs the whole input at once, so it cannot write a sentence left to right. For generation you need the decoder's one-directional attention, coming up.
:::

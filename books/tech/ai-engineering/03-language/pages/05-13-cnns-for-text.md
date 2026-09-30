## CNNs for text

- Convolutional networks (Booklet 2) were built for images, but they work on text too. A **1D convolution** slides a small window across the sequence of word vectors, scoring each window for a pattern.
- A width-3 filter looking at *"not very good"* can learn to fire on that three-word phrase wherever it appears — position-independent, like an **n-gram detector** that learns its own n-grams.

<svg viewBox="0 0 360 84" role="img" aria-label="A width-3 filter slides across word vectors producing a feature at each position, then max-pooling keeps the strongest" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <g fill="#e8f4fd" stroke="#24405e"><rect x="20" y="20" width="30" height="22"/><rect x="54" y="20" width="30" height="22"/><rect x="88" y="20" width="30" height="22"/><rect x="122" y="20" width="30" height="22"/><rect x="156" y="20" width="30" height="22"/></g>
  <g text-anchor="middle" font-size="7"><text x="35" y="34">the</text><text x="69" y="34">movie</text><text x="103" y="34">not</text><text x="137" y="34">very</text><text x="171" y="34">good</text></g>
  <rect x="86" y="16" width="102" height="30" fill="none" stroke="#c0392b" stroke-width="1.5"/><text x="137" y="58" text-anchor="middle" fill="#c0392b">filter (width 3)</text>
  <path d="M200 31 L240 31" stroke="#1a1a1a" marker-end="url(#c)"/>
  <rect x="244" y="20" width="96" height="22" rx="3" fill="#1a3a2a"/><text x="292" y="34" text-anchor="middle" fill="#fff">max-pool → feature</text>
  <defs><marker id="c" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- After convolving, **max-pooling** keeps the strongest activation for each filter — "did this pattern appear anywhere in the text?" — collapsing variable length to a fixed vector for a classifier.

:::note
Text CNNs (Kim, 2014) are fast, parallel, and strong at classification where **local phrases** carry the signal — sentiment, topic, intent. They read only a fixed window, so they miss long-range dependence; but for short texts they often beat an RNN and cost far less. Reach for them when the answer lives in short phrases, not sentence-wide structure.
:::

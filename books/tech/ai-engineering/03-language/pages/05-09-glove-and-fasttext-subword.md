## GloVe and fastText

- Two well-known follow-ups to word2vec. Same goal — a dense vector per word — different route.
- **GloVe** (Global Vectors, Stanford, 2014) trains on a **global co-occurrence count matrix** instead of streaming local windows. It factorizes "how often word *i* appears near word *j*" across the whole corpus at once. Result: vectors of similar quality, often faster to train.
- **fastText** (Facebook, 2016) fixes word2vec's biggest gap: **unknown and rare words.**

### fastText's key idea: subwords

- word2vec has no vector for a word it never saw in training. fastText represents each word as the sum of its **character n-grams** — overlapping letter chunks.
- *"playing"* → `<pl, pla, lay, ayi, yin, ing, ng>` plus the whole word. The word vector is the sum of these pieces.

<svg viewBox="0 0 360 78" role="img" aria-label="The word playing broken into overlapping character trigrams that sum to its vector" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="150" y="8" width="66" height="20" rx="3" fill="#24405e"/><text x="183" y="22" text-anchor="middle" fill="#fff">"playing"</text>
  <g fill="#e8f4fd" stroke="#24405e"><rect x="20" y="46" width="42" height="18"/><rect x="72" y="46" width="42" height="18"/><rect x="124" y="46" width="42" height="18"/><rect x="176" y="46" width="42" height="18"/><rect x="228" y="46" width="42" height="18"/><rect x="280" y="46" width="42" height="18"/></g>
  <g text-anchor="middle" font-size="8"><text x="41" y="58">pla</text><text x="93" y="58">lay</text><text x="145" y="58">ayi</text><text x="197" y="58">yin</text><text x="249" y="58">ing</text><text x="301" y="58">sum</text></g>
  <path d="M183 28 L171 44" stroke="#1a1a1a" marker-end="url(#f)"/>
  <defs><marker id="f" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::note
Because a word is built from its pieces, fastText can vector a word it never saw — *"playingg"*, a typo, or a rare inflection — by summing the subwords it *does* know. This "build words from pieces" idea is the direct ancestor of the **subword tokenization** (page 05-24) that every transformer uses today.
:::

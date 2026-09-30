## Why text is hard

- Numbers have a natural order and spacing. Language has neither. "good" and "great" are close in meaning but share no letters; "bank" means two unrelated things.
- Three properties make text harder than the tabular data classical ML expects.

### The three hard properties

- **Discrete, not continuous.** There is no value "between" *cat* and *dog*. You cannot average two words the way you average two prices. Models want smooth numbers; words are atoms.
- **Ambiguous.** Meaning depends on context. *"I saw her duck"* — animal, or the act of ducking? Same words, two parse trees.
- **Variable length and long-range.** A sentence can be 3 words or 300, and word 300 can depend on word 1 (*"The **keys** I left on the table this morning ... **were** gone"* — the verb agrees with a noun far behind it).

<svg viewBox="0 0 380 66" role="img" aria-label="The word bank points to two meanings, riverside and financial, decided by surrounding words" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="150" y="24" width="80" height="24" rx="3" fill="#24405e"/><text x="190" y="40" text-anchor="middle" fill="#fff">"bank"</text>
  <path d="M150 30 L60 14" stroke="#1a1a1a" marker-end="url(#w)"/><text x="52" y="12" text-anchor="end">river bank</text>
  <path d="M150 42 L60 58" stroke="#1a1a1a" marker-end="url(#w)"/><text x="52" y="60" text-anchor="end">money bank</text>
  <text x="300" y="30" fill="#6b6b6b">context</text><text x="300" y="42" fill="#6b6b6b">decides</text>
  <path d="M230 36 L292 36" stroke="#c0392b" marker-end="url(#w)"/>
  <defs><marker id="w" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::note
Every technique in this booklet attacks one of these three. Counting methods (next pages) handle discreteness but ignore context. Embeddings capture similarity. Attention — the transformer's engine — was built to handle long-range dependence directly. Read each method by asking: which hard property does this one solve, and which does it still ignore?
:::

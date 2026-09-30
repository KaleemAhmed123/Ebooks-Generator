## The limits of counting

- BoW and TF-IDF share one fatal assumption: **each word is an isolated column.** The vector has no idea two words are related.
- This shows up as three walls that no amount of counting can climb.

### The three walls

- **No synonymy.** *"The film was great"* and *"The movie was excellent"* share almost no words. To a counter they look like different documents, though they mean the same thing.
- **No word order.** *"dog bites man"* = *"man bites dog"*. Meaning that lives in arrangement is invisible.
- **Explosive, sparse vectors.** A 50,000-word vocabulary means 50,000-long vectors that are almost all zeros. This is the **curse of dimensionality** — data spread so thin across so many dimensions that "close" and "far" stop being meaningful.

<svg viewBox="0 0 370 76" role="img" aria-label="Two sentences with the same meaning share no words under counting, so their vectors are far apart" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="10" y="14" width="150" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="85" y="28" text-anchor="middle">"film was great"</text>
  <rect x="10" y="44" width="150" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="85" y="58" text-anchor="middle">"movie was excellent"</text>
  <path d="M164 24 L230 24" stroke="#c0392b" marker-end="url(#l)"/><path d="M164 54 L230 54" stroke="#c0392b" marker-end="url(#l)"/>
  <text x="300" y="28" text-anchor="middle" fill="#c0392b">far apart</text>
  <text x="300" y="42" text-anchor="middle" fill="#6b6b6b">(same meaning!)</text>
  <text x="300" y="58" text-anchor="middle" fill="#c0392b">share only "was"</text>
  <defs><marker id="l" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker></defs>
</svg>

:::note
The fix is one idea: stop giving each word its own axis. Instead, place words in a **dense, shared space** where similar meanings land near each other, using far fewer numbers (say 300, not 50,000). That dense vector is an **embedding** — the next section, and the foundation everything after it stands on.
:::

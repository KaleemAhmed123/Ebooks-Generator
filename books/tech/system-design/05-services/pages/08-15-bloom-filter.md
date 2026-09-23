## The Bloom filter

- A **Bloom filter** answers one question — have I seen this key — in a fraction of the memory the keys themselves would need. It gives two answers: *definitely not*, which is always true, and *probably*, which is sometimes wrong. That asymmetry is what makes it useful in front of a store

<svg viewBox="0 0 460 112" role="img" aria-label="A Bloom filter. Adding key A hashes it three ways and sets three bits in a shared bit array. Querying key X hashes it the same three ways; one of those positions holds a one but two hold zero, and a single zero proves X was never added. There are no false negatives. All ones would only mean probably present, because the bits may have been set by other keys. Ten bits per key with seven hash functions gives about a 0.8 per cent false positive rate, so a billion URLs fit in 1.25 gigabytes. An orange cross marks deletion: clearing a bit would erase it for every key that shares it, so a plain Bloom filter cannot remove." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="14" font-size="7" fill="#1d4e89">add(A): set the bits at h₁(A), h₂(A), h₃(A)</text>
  <line x1="141" y1="16" x2="141" y2="26" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="226" y1="16" x2="226" y2="26" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="328" y1="16" x2="328" y2="26" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="100" y="28" width="15" height="14" fill="#fff" stroke="#999"/><text x="107" y="38" text-anchor="middle" font-size="6.5" fill="#999">0</text>
  <rect x="117" y="28" width="15" height="14" fill="#fff" stroke="#999"/><text x="124" y="38" text-anchor="middle" font-size="6.5" fill="#999">0</text>
  <rect x="134" y="28" width="15" height="14" fill="#e6f2ff" stroke="#1d4e89"/><text x="141" y="38" text-anchor="middle" font-size="6.5">1</text>
  <rect x="151" y="28" width="15" height="14" fill="#fff" stroke="#999"/><text x="158" y="38" text-anchor="middle" font-size="6.5" fill="#999">0</text>
  <rect x="168" y="28" width="15" height="14" fill="#e6f2ff" stroke="#1d4e89"/><text x="175" y="38" text-anchor="middle" font-size="6.5">1</text>
  <rect x="185" y="28" width="15" height="14" fill="#fff" stroke="#999"/><text x="192" y="38" text-anchor="middle" font-size="6.5" fill="#999">0</text>
  <rect x="202" y="28" width="15" height="14" fill="#fff" stroke="#999"/><text x="209" y="38" text-anchor="middle" font-size="6.5" fill="#999">0</text>
  <rect x="219" y="28" width="15" height="14" fill="#e6f2ff" stroke="#1d4e89"/><text x="226" y="38" text-anchor="middle" font-size="6.5">1</text>
  <rect x="236" y="28" width="15" height="14" fill="#fff" stroke="#999"/><text x="243" y="38" text-anchor="middle" font-size="6.5" fill="#999">0</text>
  <rect x="253" y="28" width="15" height="14" fill="#fff" stroke="#999"/><text x="260" y="38" text-anchor="middle" font-size="6.5" fill="#999">0</text>
  <rect x="270" y="28" width="15" height="14" fill="#fff" stroke="#999"/><text x="277" y="38" text-anchor="middle" font-size="6.5" fill="#999">0</text>
  <rect x="287" y="28" width="15" height="14" fill="#e6f2ff" stroke="#1d4e89"/><text x="294" y="38" text-anchor="middle" font-size="6.5">1</text>
  <rect x="304" y="28" width="15" height="14" fill="#fff" stroke="#999"/><text x="311" y="38" text-anchor="middle" font-size="6.5" fill="#999">0</text>
  <rect x="321" y="28" width="15" height="14" fill="#e6f2ff" stroke="#1d4e89"/><text x="328" y="38" text-anchor="middle" font-size="6.5">1</text>
  <rect x="338" y="28" width="15" height="14" fill="#fff" stroke="#999"/><text x="345" y="38" text-anchor="middle" font-size="6.5" fill="#999">0</text>
  <rect x="355" y="28" width="15" height="14" fill="#fff" stroke="#999"/><text x="362" y="38" text-anchor="middle" font-size="6.5" fill="#999">0</text>
  <rect x="372" y="28" width="15" height="14" fill="#fff" stroke="#999"/><text x="379" y="38" text-anchor="middle" font-size="6.5" fill="#999">0</text>
  <rect x="389" y="28" width="15" height="14" fill="#e6f2ff" stroke="#1d4e89"/><text x="396" y="38" text-anchor="middle" font-size="6.5">1</text>
  <rect x="406" y="28" width="15" height="14" fill="#fff" stroke="#999"/><text x="413" y="38" text-anchor="middle" font-size="6.5" fill="#999">0</text>
  <rect x="423" y="28" width="15" height="14" fill="#fff" stroke="#999"/><text x="430" y="38" text-anchor="middle" font-size="6.5" fill="#999">0</text>
  <text x="4" y="38" font-size="6.5">bit array</text>
  <line x1="175" y1="58" x2="175" y2="44" stroke="#bf4c28" marker-end="url(#e)"/>
  <line x1="260" y1="58" x2="260" y2="44" stroke="#bf4c28" marker-end="url(#e)"/>
  <line x1="379" y1="58" x2="379" y2="44" stroke="#bf4c28" marker-end="url(#e)"/>
  <text x="4" y="68" font-size="7" fill="#bf4c28">query X: two of its three positions hold 0 — X was never added</text>
  <text x="4" y="84" font-size="7">a single zero is proof of absence; all ones means only "probably" — the bits may belong to other keys</text>
  <text x="4" y="97" font-size="7">10 bits per key at k = 7 gives ≈ 0.8 % false positives, so a billion URLs fit in 1.25 GB</text>
  <text x="4" y="109" font-size="7.5" fill="#bf4c28">✕ removal: clearing a bit would erase it for every key sharing it, so a plain Bloom filter cannot delete</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker><marker id="e" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#bf4c28"/></marker></defs>
</svg>

- The economics are the reason it appears in front of caches and stores. Holding a billion URLs as strings is tens of gigabytes; the filter answers "seen it" for 1.25 GB, which fits in one process's memory, so the check happens with no network call at all
- It composes with negative caching (page 14) rather than replacing it. The filter stops the lookup before the cache is consulted, and a false positive costs exactly one wasted lookup that then proceeds normally — so being wrong 0.8 % of the time is a rounding error rather than a correctness problem

### The failure

- Using it where a false positive is not survivable. "Probably present" must always be allowed to fall through to the real store; treating it as an answer means 0.8 % of keys are silently reported as existing when they do not
- The second failure is capacity. The false positive rate is a function of how full the array is, so a filter sized for a billion keys and fed two billion degrades — quietly, with no error, toward answering "probably" for everything. It has to be sized for the eventual count and rebuilt when that estimate is passed, and since it cannot delete, rebuilding is the only way to shrink it

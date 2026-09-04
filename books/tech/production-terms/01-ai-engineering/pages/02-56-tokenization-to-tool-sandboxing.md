## Tokenization

Splitting text into the subword units a model actually reads. Vocabularies are
built by byte-pair encoding: start from bytes, repeatedly merge the most
frequent adjacent pair, stop at a fixed size. OpenAI's `cl100k_base` holds
100,277 entries; `o200k_base` roughly 200,000.

Because the merges are learned from frequency on mostly English text, common
English words land on one token while a rare word, a UUID or an emoji splits
into several. The same sentence in an under-represented language costs more
tokens than its English equivalent — identical meaning, larger bill, less room
inside the context window.

<svg viewBox="0 0 460 78" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The word unbelievable splits into a few subword tokens while a UUID of similar length splits into many more, showing that token count does not track character count">
  <text x="4" y="16" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">12 characters, 2 tokens</text>
  <rect x="4" y="22" width="52" height="18" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/><text x="30" y="35" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">unbeliev</text>
  <rect x="58" y="22" width="34" height="18" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/><text x="75" y="35" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">able</text>
  <text x="236" y="16" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">a UUID of similar length</text>
  <rect x="236" y="22" width="26" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="249" y="35" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">7f</text>
  <rect x="264" y="22" width="26" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="277" y="35" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">3a</text>
  <rect x="292" y="22" width="22" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="303" y="35" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">-</text>
  <rect x="316" y="22" width="26" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="329" y="35" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">9c</text>
  <rect x="344" y="22" width="26" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="357" y="35" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">1b</text>
  <rect x="372" y="22" width="26" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="385" y="35" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">d4</text>
  <text x="4" y="66" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">token count tracks familiarity, not length</text>
</svg>

**Character-level tasks fail here, not for want of reasoning.** Counting letters
or reversing a string asks about units the model never sees; it sees the pieces.

## Tool Sandboxing

Executing model-chosen tool calls with the minimum capability that still works.
The arguments come from the model, and the model's context can be influenced by
anyone whose text reaches it — a user, a fetched page, a document in your own
corpus. They are untrusted input in the strict sense.

Code execution is the obvious case, but the principle is general: an unscoped
database tool is arbitrary data access, an unscoped file tool is arbitrary file
access.

| Control | Setting |
|---|---|
| Network | denied, or an explicit allowlist |
| Filesystem | a temporary directory, nothing else |
| Resources | CPU, memory and wall-clock capped |
| Output size | capped before it re-enters the context |

**Run tools with the end user's permissions, not the service's.** A tool that
can read any record will eventually be talked into reading the wrong one, and
the denial lands in your logs, which is how you find out it was attempted.

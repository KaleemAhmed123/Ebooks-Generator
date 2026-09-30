## The big idea: attention

- **Attention is a soft database lookup.** That one analogy carries the whole mechanism.
- A normal database: you send a **query**, it matches one **key** exactly, returns that key's **value**. `"capital of France"` → exact match → `"Paris"`.
- Attention: your query is compared to **every** key by similarity, and you get back a **weighted blend of all the values** — mostly the best-matching one, a little of the rest.

<svg viewBox="0 0 370 92" role="img" aria-label="A query compared to all keys yields weights that blend all values into one output" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="38" width="46" height="18" rx="3" fill="#1a3a2a"/><text x="35" y="51" text-anchor="middle" fill="#fff">query</text>
  <g fill="#24405e"><rect x="100" y="10" width="40" height="15" rx="2"/><rect x="100" y="40" width="40" height="15" rx="2"/><rect x="100" y="70" width="40" height="15" rx="2"/></g>
  <g fill="#fff" font-size="7" text-anchor="middle"><text x="120" y="21">key 1</text><text x="120" y="51">key 2</text><text x="120" y="81">key 3</text></g>
  <path d="M58 44 L98 18" stroke="#c0392b" stroke-width="2.5"/><path d="M58 47 L98 47" stroke="#c0392b" stroke-width="0.8"/><path d="M58 50 L98 76" stroke="#c0392b" stroke-width="0.5"/>
  <text x="180" y="30" font-size="7" fill="#c0392b">0.8</text><text x="180" y="50" font-size="7" fill="#c0392b">0.15</text><text x="180" y="80" font-size="7" fill="#c0392b">0.05</text>
  <path d="M200 47 L236 47" stroke="#1a1a1a" marker-end="url(#a2)"/>
  <rect x="240" y="38" width="118" height="18" rx="3" fill="#6a9bd0"/><text x="299" y="51" text-anchor="middle" fill="#fff">weighted blend of values</text>
  <defs><marker id="a2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- "**Self**-attention" means the queries, keys, and values all come from the **same sequence** — each word looks at every other word in its own sentence to decide what it means *here*.
- That is how *"bank"* finally gets two vectors: near *"river"* it attends to *"river"*; near *"money"* it attends to *"money"*. The context, not a fixed dictionary, sets the meaning.

:::note
Every word ends up as a blend of the words it found relevant. This is the fix for the static-embedding limit (page 05-08): the same word gets a **different vector in every context**. The next three pages make "compared by similarity" and "weighted blend" precise — they are just dot products and a softmax.
:::

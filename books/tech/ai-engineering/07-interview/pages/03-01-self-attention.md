# NLP & Transformers

## Walk me through self-attention from scratch.

- Goal: let each token **mix in information from every other token**, weighted by relevance.
- Each token's embedding is projected into three vectors via learned matrices: **Query** (what I'm looking for), **Key** (what I offer), **Value** (what I'll pass on).
- For a token, score its Query against **every** token's Key by dot product → divide by √d → **softmax** into weights that sum to 1 → take the weighted sum of **Values**. That sum is the token's new representation.
- Done for all tokens at once, this is three matmuls: `softmax(Q·Kᵀ / √d) · V`. Every token attends to every token in a single parallel operation.

<svg viewBox="0 0 300 92" role="img" aria-label="Token embeddings project to Q, K, V; Q dot K gives scores, softmax gives weights, weights times V gives the output" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="8" y="38" width="40" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="28" y="49" text-anchor="middle">tokens</text>
  <rect x="78" y="14" width="30" height="14" rx="2" fill="#fff" stroke="#24405e"/><text x="93" y="24" text-anchor="middle">Q</text>
  <rect x="78" y="40" width="30" height="14" rx="2" fill="#fff" stroke="#24405e"/><text x="93" y="50" text-anchor="middle">K</text>
  <rect x="78" y="66" width="30" height="14" rx="2" fill="#fff" stroke="#24405e"/><text x="93" y="76" text-anchor="middle">V</text>
  <rect x="140" y="27" width="56" height="16" rx="2" fill="#fff" stroke="#24405e"/><text x="168" y="38" text-anchor="middle">Q·Kᵀ/√d</text>
  <rect x="206" y="27" width="44" height="16" rx="2" fill="#fff" stroke="#24405e"/><text x="228" y="38" text-anchor="middle">softmax</text>
  <rect x="258" y="40" width="36" height="16" rx="2" fill="#24405e"/><text x="276" y="51" text-anchor="middle" fill="#fff">·V</text>
  <path d="M48 46 L76 22" stroke="#999" marker-end="url(#s)"/><path d="M48 47 L76 47" stroke="#999" marker-end="url(#s)"/><path d="M48 48 L76 72" stroke="#999" marker-end="url(#s)"/>
  <path d="M108 35 L138 35" stroke="#1a1a1a" marker-end="url(#s)"/><path d="M196 35 L204 35" stroke="#1a1a1a" marker-end="url(#s)"/>
  <path d="M250 35 C262 35, 272 38, 276 40" stroke="#1a1a1a" fill="none" marker-end="url(#s)"/>
  <defs><marker id="s" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::interview
What's really being tested:

can you explain Q/K/V in plain language (ask / offer / pass-on) and land on the one-line formula. This is the single most common transformer question.
:::

## Embedding

A fixed-length vector of floating-point numbers standing in for a piece of text,
produced so that texts with similar meaning land close together.
`text-embedding-3-small` returns 1536 numbers and `text-embedding-3-large`
returns 3072; both can be shortened through the `dimensions` parameter, trading
accuracy for storage.

<svg viewBox="0 0 460 74" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Text passes through one embedding model to become a fixed-length vector; only vectors from that same model and preprocessing sit in a space where distances mean anything">
  <rect x="4" y="14" width="104" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="56" y="30" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">a chunk of text</text>
  <path d="M110 26 H142" stroke="#1a1a1a" stroke-width="1.2"/><path d="M142 26 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="146" y="14" width="122" height="24" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <text x="207" y="30" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#c25a35">model + preprocessing</text>
  <path d="M270 26 H302" stroke="#1a1a1a" stroke-width="1.2"/><path d="M302 26 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="306" y="14" width="150" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="381" y="30" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">[0.021, -0.44, … ] 1536</text>
  <text x="146" y="56" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">change this box and every vector already stored is in a different space</text>
  <text x="146" y="68" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">— the same shape, no longer the same meaning</text>
</svg>

Dimension count is a storage and index decision as much as a quality one.
pgvector's `vector` type indexes up to 2,000 dimensions, so a 3072-dimension
vector needs `halfvec` or truncation before it can carry an index at all.

**A vector is only comparable with vectors from the same model and the same
preprocessing.** There is no conversion between two models' spaces. That single
property is what makes a model change a full corpus re-embed, and what makes
drift so hard to see.

## Embedding Drift

The embedding model or its preprocessing changing, so new vectors stop being
comparable with the old ones. A library upgrade changes a normalisation default.
A provider updates the model behind an unversioned name. Someone adjusts text
cleaning for incoming documents and not for the existing index.

Part of the index then lives in one space and part in another. Distances between
them are arbitrary, and retrieval degrades in a way that looks random rather
than systematic — some queries fine, some inexplicably poor, no pattern anyone
can name.

**Nothing errors, because nothing is structurally wrong.** The vectors are the
right shape and the right length; they no longer mean the same thing. Store the
model name, its version and a preprocessing version beside every vector, and
assert at startup that the query path matches what the index was built with.

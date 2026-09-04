## Cosine Similarity

The cosine of the angle between two vectors: their dot product divided by the
product of their lengths. It runs from -1 to 1, ignores magnitude entirely, and
is the number every retrieval threshold is set against.

<svg viewBox="0 0 460 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two vectors from a common origin separated by a small angle score near one; a vector at right angles scores zero, and magnitude is ignored because both are divided by their lengths">
  <path d="M40 78 L150 20" stroke="#c25a35" stroke-width="1.6"/>
  <path d="M40 78 L146 38" stroke="#c25a35" stroke-width="1.6"/>
  <path d="M40 78 L106 4" stroke="#6b6b6b" stroke-width="1.2" stroke-dasharray="3 2"/>
  <path d="M40 78 m 46 -13 a 48 48 0 0 0 -6 -14" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
  <text x="96" y="60" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">θ</text>
  <text x="158" y="24" font-family="Georgia,serif" font-size="9" fill="#c25a35">small θ — cos θ near 1</text>
  <text x="158" y="42" font-family="Georgia,serif" font-size="9" fill="#c25a35">same direction, different length: same score</text>
  <text x="112" y="10" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">θ = 90° — cos θ = 0, unrelated</text>
  <text x="40" y="90" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">direction is the meaning; length is discarded by the division</text>
</svg>

Where vectors are already normalised to unit length — OpenAI's
`text-embedding-3` models are — cosine similarity reduces to the dot product,
and cosine and Euclidean ranking give identical order. In Postgres you meet it
as pgvector's `<=>` operator, which returns cosine *distance*: `1 - similarity`.

**The absolute value means nothing across corpora.** A 0.82 that is a strong
match in one index is noise in another, because scores depend on the model and
the text distribution. Derive the threshold from your own labelled pairs, and
derive it again whenever the embedding model changes.

## Cost per Request

Input and output tokens are priced differently and output is the expensive one:
Claude Sonnet 5 is $2 per million input tokens against $10 per million output,
as of September 2026. Input cost is then dominated by what you send *every
time*, not by what the user typed.

If your system prompt, tool definitions and retrieved context total 12,000
tokens and the user sends forty, the user accounts for 0.3% of your input bill.
The levers are trimming the fixed preamble, caching the stable prefix — Claude
cache reads are 10% of the base input price — and retrieving six chunks instead
of forty. Shortening the answer barely registers.

**Log per-request cost tagged by feature, tenant and model from the first day.**
A monthly invoice tells you nothing you can act on. Tagged data routinely shows
one rarely used feature carrying a large share of spend, which is a five-minute
product conversation rather than a month of optimisation.

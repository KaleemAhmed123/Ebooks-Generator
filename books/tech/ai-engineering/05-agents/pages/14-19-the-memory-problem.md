## The memory problem

- A language model is **stateless**. It remembers nothing between calls; each request is answered from only what is in that request's context. An agent that "remembers" your name across sessions is doing extra engineering — the model itself forgot the instant the last call returned.
- The naive fix — keep the whole conversation in context — breaks on two walls:

<svg viewBox="0 0 360 96" role="img" aria-label="Growing history hits the context window limit and rising cost, forcing real memory" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="18" width="150" height="66" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="89" y="32" text-anchor="middle" font-size="6.5">keep everything</text><text x="89" y="48" text-anchor="middle" font-size="6">hits context limit ✗</text><text x="89" y="62" text-anchor="middle" font-size="6">cost grows every turn ✗</text><text x="89" y="76" text-anchor="middle" font-size="5.5" fill="#6b6b6b">and old info dilutes focus</text>
  <rect x="196" y="18" width="150" height="66" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="271" y="32" text-anchor="middle" font-size="6.5">real memory</text><text x="271" y="48" text-anchor="middle" font-size="6">store outside context</text><text x="271" y="62" text-anchor="middle" font-size="6">retrieve what's relevant</text><text x="271" y="76" text-anchor="middle" font-size="5.5" fill="#6b6b6b">context stays lean</text>
</svg>

- **The context window is finite** (Booklet 3). A months-long assistant relationship or a 200-tool agent run overflows it. You cannot keep everything.
- **Cost and attention.** Even under the limit, a huge context is expensive (re-billed each turn) and *dilutes* the model — buried key facts get lost among thousands of stale tokens ("lost in the middle").

- **So memory means: store information outside the context, and pull the *relevant* bits back in when needed.** That is the entire memory problem — what to keep, where to keep it, and how to retrieve it. The next pages are the answers the field has built, each a different type of memory or mechanism.

:::note
Human memory is the guiding analogy for this whole cluster, and it is genuinely useful: we have **working memory** (what's in mind now — the context window), **episodic memory** (specific past events), **semantic memory** (general facts we've learned), and **procedural memory** (skills). Agent memory systems deliberately mirror these, because the problems — limited attention, needing to recall the right thing at the right time — are the same.
:::

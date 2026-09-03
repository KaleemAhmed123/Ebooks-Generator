## Semantic Caching

Caching by meaning rather than by exact string, so paraphrases of the same
question hit the same cached answer.

"What is ML?", "Explain ML" and "describe machine learning" become one cached
answer instead of three model calls — if the similarity threshold is right.

### How it works

An ordinary cache matches exact text. For natural language that fails almost
immediately, because nobody phrases a question the same way twice.

Semantic caching matches on meaning. Embed the incoming question, compare
against vectors of previously answered questions, and if one is close enough
return the stored answer without calling the model.

**The whole design rests on one number: the similarity threshold.**

| Threshold | Result |
|---|---|
| Too high | near-identical questions miss the cache — no benefit |
| Too low | different questions collide — a confident answer to a question nobody asked |

Those two failures are not symmetrical. A miss costs a model call. A collision
gives the user a fluent, well-written answer to somebody else's question, and
nothing about it looks wrong. **Tune conservatively.**

### In practice

**Some questions must never be cached semantically**, however similar they look.

Anything whose answer depends on who is asking, on the current time, or on data
that changes — "what is my balance", "what is the status of my order" — will
return another user's answer or yesterday's.

Maintain an explicit **allow-list of cacheable intents** rather than a deny-list
of dangerous ones. A deny-list fails open, and failing open here means leaking.

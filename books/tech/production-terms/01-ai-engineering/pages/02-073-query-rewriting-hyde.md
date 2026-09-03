## Query Rewriting / HyDE

Transforming the user's question before retrieval — expanding it, resolving
pronouns, or generating a hypothetical answer to embed instead.

"What about the second one?" retrieves nothing. Rewritten against the history to
"what are the payment terms in the Acme contract", it retrieves correctly.

### How it works

A user's raw question is often a poor search query, and retrieval is only as
good as what it is handed.

**Follow-ups are the clearest case.** "What about the second one?" carries no
searchable content at all — the meaning lives in the previous turns. Rewriting
it against the conversation turns an impossible query into an easy one.

**The other common problem is vocabulary mismatch.** Users write in everyday
language; documents are written in formal or technical register. "Why is my
thing broken" and "diagnostic procedure for fault code 12" concern the same
subject and embed far apart.

**HyDE** attacks that differently: ask a model to *write* a hypothetical answer
to the question, then embed that instead of the question. The invented answer
uses document-like language, so it lands nearer to real documents — and it does
not matter that its content is fabricated, because it is only ever used as a
search key.

### In practice

Both techniques add a model call before retrieval, which costs latency on every
single request.

Whether it is worth it depends on your traffic. Rewriting is close to essential
for multi-turn conversational retrieval and often unnecessary for single-shot
search, where people type reasonably complete questions. **Measure retrieval
recall with and without it** before making it permanent — it is a real cost on
the hot path and should have to justify itself.

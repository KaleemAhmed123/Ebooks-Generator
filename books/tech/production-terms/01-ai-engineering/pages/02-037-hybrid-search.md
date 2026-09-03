## Hybrid Search

Combining dense vector search with keyword search. Dense handles meaning, sparse
handles exact identifiers.

A search for error code `ERR_4471` fails with pure vectors — the code has no
semantic neighbours. BM25 finds it instantly. Hybrid handles both in one query.

### How it works

Dense and sparse retrieval fail in opposite directions, which is exactly why
combining them works.

**Dense search understands meaning.** It matches "can't log in" to
"authentication failure" with no shared words. It has no concept of exact
tokens, so an identifier like `ERR_4471` sits in a region of the space with
nothing meaningful near it.

**Sparse search matches literal terms**, weighted by rarity. It nails
identifiers, product codes, names and acronyms, and fails completely on
paraphrase.

Real queries contain both kinds of content, frequently in one sentence: *"why am
I getting ERR_4471 when uploading"*. Run both retrievers, merge the results, and
each covers the other's blind spot.

### In practice

Hybrid is close to a default recommendation for production retrieval. The
improvement is consistent, and it removes an entire class of embarrassing
failure — a user searching for a literal string that exists in your corpus and
getting nothing back.

**The merge step is where the design actually happens.** The two retrievers
produce scores on incompatible scales, so combining them naively means one
dominates. Reciprocal rank fusion is the usual answer, because it works on
positions rather than scores and therefore needs no normalisation between them.

## Deterministic Replay

Storing enough of a request — rendered prompt, model version, retrieved context,
parameters, seed — to reproduce it exactly while debugging.

"The model gave a wrong answer" is unfixable without the retrieved context. With
a replay record you re-run it and see that retrieval returned nothing relevant.

### How it works

A user question is not a reproducible bug report. Re-running it may produce
something different, and the context that produced the original answer is gone.

Replay means capturing enough to reconstruct the request exactly:

| Captured | Why it is needed |
|---|---|
| Fully rendered prompt | the template alone does not show what was sent |
| Model and version | behaviour changes between versions |
| Sampling parameters and seed | temperature makes reruns diverge |
| Retrieved chunk IDs and content | the usual actual cause |
| Tool calls and results | agents fail here, not in the model |
| Raw output | before any post-processing hid the problem |

The rendered prompt is the crucial one. Your code assembles it from templates,
retrieval results and history, so the template on its own tells you nothing
about what the model actually received.

With a complete record, debugging is reading. Most surprising outputs turn out
to be surprising inputs — retrieval returned nothing relevant, history truncated
oddly, a template variable resolved empty.

### In practice

Sample successful requests to keep storage sane, and capture at full rate
anything that failed, was flagged, hit a cap, or drew negative feedback.

That gives you complete records exactly where you will need them, without paying
to store every successful interaction in full detail forever.

## RAG: operating it in production

- Building the RAG pipeline (Flagship 3) is half the job; *operating* it is the other half, and it has failure modes that only appear after launch. A RAG system is a living thing — the corpus changes, queries drift, quality decays.

| Operational concern | What breaks | Handling |
|---|---|---|
| **index freshness** | docs change, index goes stale | incremental re-embed on change (19-32) |
| **query drift** | users ask new things retrieval misses | monitor recall, expand corpus |
| **quality decay** | recall/faithfulness slowly drop | online eval on both surfaces (19-06) |
| **embedding model upgrade** | new model → must re-embed everything | versioned indexes, migration plan |
| **cost creep** | more docs, more queries, bigger context | monitor cost/query, tune k |

- **The embedding-migration trap.** If you upgrade the embedding model, *every* stored vector is now in the wrong space — a new query embedded with the new model won't match old vectors. So an embedding upgrade means **re-embedding the entire corpus** (expensive, slow) with a versioned-index migration (build the new index alongside, cut over, retire the old). Teams forget this and get silently broken retrieval after an "upgrade."
- **Monitor both RAG surfaces** (19-06): retrieval recall and generation faithfulness. Both decay — recall as corpus and queries drift, faithfulness as models/prompts change — and only continuous online eval (17-46a) catches the slide before users do.

:::interview
"What goes wrong with a RAG system *after* it launches?"

It decays, in ways the build phase doesn't show. **Freshness**: the corpus changes but the index lags, so answers cite stale content — needs incremental re-embedding on document change. **Query drift**: users ask things the corpus doesn't cover, so recall silently drops — monitor recall and expand the corpus. **Quality decay**: recall and faithfulness slide as content, queries, models, and prompts change — caught only by continuous online eval on *both* surfaces (19-06). And the classic operational trap: **upgrading the embedding model** invalidates every stored vector (new queries can't match old embeddings), so it forces a full re-embed with a versioned-index migration — teams forget this and break retrieval on an "upgrade." The framing: RAG is a *living system* to operate and monitor, not a pipeline you build once.
:::

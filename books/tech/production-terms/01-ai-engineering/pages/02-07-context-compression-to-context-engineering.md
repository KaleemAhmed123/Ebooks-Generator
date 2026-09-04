## Context Compression

Reducing retrieved content before it enters the prompt. Extractive filtering
keeps only the sentences relevant to the query and drops the rest, preserving
the original wording that grounding and citation depend on. Abstractive
summarisation has a model rewrite the content more compactly, so what reaches
the prompt is generated text rather than the source.

Compression is usually the wrong first move. Better retrieval and reranking cut
context by **selecting** well rather than by discarding after the fact, which
improves quality instead of risking it. Reach for compression when the relevant
documents are genuinely long and have to be read rather than searched.

**An abstractive summary can drop the detail that mattered or add one the
document never contained.** The answer is then grounded in the summary, not in
anything real. Where a citation has to hold up, extractive filtering is the safe
default: it cannot invent.

## Context Engineering

Deciding what occupies the context window and in what order, as distinct from
prompt engineering, which is about wording. The window is one budget shared by
the system prompt, tool definitions, history, retrieved documents and the space
the answer needs. A token spent on one is unavailable to the others.

Two forces push against filling it. Input cost scales directly with tokens. And
attention is uneven: Liu et al. (2023) measured accuracy highest when the
relevant passage sat at the start or end of a long context and significantly
worse in the middle. So put stable material first, where it also caches, the
strongest chunks and the question last, and summarise history rather than
resending it verbatim.

**The discipline is subtractive.** Fewer, better-placed chunks beat more chunks,
and the last thing to cut is the room the answer needs — running out of window
mid-reply looks like a model problem and is arithmetic.

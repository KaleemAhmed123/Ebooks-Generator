## Capstone catalog (3)

- More project shapes from the source capstones, each a composition of the building blocks (17-62). Goal, stack, defining decision.

**Data-analysis agent** — answer analytical questions over a database/spreadsheets.
- *Stack:* text-to-SQL (19-16a) + a code-execution sandbox (Flagship 4) for analysis/plotting + verification.
- *Defining decision:* **execute and verify, never trust generated analysis** — run the query/code, check the result is sane, show the work. A fabricated statistic is worse than no answer.

**Meeting assistant** — transcribe, summarize, extract action items from meetings.
- *Stack:* ASR (Booklet 2) + structured extraction (17-17a) + speaker diarization + summary.
- *Defining decision:* **structured extraction over freeform summary** — action items as a typed list with owners and dates, so downstream tools can act on them, not prose to re-parse.

**Personalized learning / tutor** — adaptive teaching that tracks a learner.
- *Stack:* RAG over material (Flagship 3) + per-learner **memory** (Booklet 5) + Socratic prompting + outcome eval.
- *Defining decision:* **the learner model is the product** — memory of what the student knows and struggles with is what makes it adaptive, not a chatbot with a textbook.

**Content-generation pipeline** — marketing/product copy at scale with brand consistency.
- *Stack:* templates + RAG over brand guidelines + guided output + human review.
- *Defining decision:* **brand-consistency guardrails** (glossary, tone checks, 19-16k) — consistency, not raw generation, is the hard part.

:::note
The pattern across all of them — and the whole catalog — is that a "new" AI project is rarely a new invention; it's a *recomposition* of the same dozen blocks (17-62): a model, retrieval, structured output, tools/sandbox, memory, an eval loop, a human gate, safety. The data-analysis agent is text-to-SQL + sandbox; the meeting assistant is ASR + extraction; the tutor is RAG + memory. Mastery isn't knowing a hundred architectures — it's knowing the blocks cold and seeing which composition a new problem calls for. That recognition is what this entire module, and series, was built to give you.
:::

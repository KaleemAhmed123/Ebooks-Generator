## A long-running agent keeps blowing its context window. What do you do?

- Each turn appends tool results and reasoning, so context grows until it overflows or gets expensive/slow and quality drops (lost-in-the-middle). You must actively **manage** it.
- Techniques:
  - **Summarise/compact** older turns into a running summary; keep recent turns verbatim.
  - **Trim tool outputs** — store the full result externally, keep only a short reference/snippet in context (big web pages, file dumps, query results).
  - **Externalise state** — write progress/findings to a scratchpad or file the agent re-reads, instead of carrying everything in the prompt.
  - **Retrieve, don't retain** — pull only the relevant memory each turn rather than keeping all history.
  - **Sub-agents** — delegate a sub-task to a fresh agent with its own clean context, returning only the result.
- The principle: treat the context window as a **scarce cache**, not a log. Keep what the next decision needs; offload the rest.

:::interview
What's really being tested: that you manage context as a scarce resource (summarise, trim, externalise, retrieve, delegate) rather than letting history accumulate — a real production pain point.
:::

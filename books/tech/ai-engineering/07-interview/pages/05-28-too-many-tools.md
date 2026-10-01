## How many tools is too many, and how do you handle a large tool set?

- The model must choose among all tools you expose each turn. Too many → **confusion** (picks the wrong one), **context bloat** (every schema sits in the prompt), and higher cost. Accuracy degrades well before you hit hundreds.
- There's no magic number, but once selection accuracy drops or the tool schemas dominate the prompt, you have too many *for one call*.
- Handling scale:
  - **Tool retrieval / RAG over tools** — embed tool descriptions, retrieve only the handful relevant to the current request, and expose just those.
  - **Hierarchical / namespaced tools** — group tools; a router picks the group, then the specific tool.
  - **Sub-agents** — give each specialist agent its own small tool set rather than one agent with everything.
  - **Consolidate** overlapping tools into one well-parameterised tool.
- Principle: expose the **smallest relevant tool set per decision**, not your whole catalog.

:::interview
What's really being tested: that tool count hurts selection and context, and you scale via dynamic tool retrieval / grouping / sub-agents rather than dumping every tool into one prompt.
:::

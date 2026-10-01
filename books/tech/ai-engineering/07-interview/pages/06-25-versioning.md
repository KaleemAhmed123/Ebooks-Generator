## How do you make an LLM application reproducible and versioned?

- LLM apps have many moving, mutable parts; without versioning you can't reproduce a result, debug a regression, or roll back. Version **everything that affects output**:
  - **Model** — exact model ID/version; never float on "latest" (providers update models silently, changing behaviour).
  - **Prompts** — treat prompts as code: in version control, with IDs, reviewed and tested; log which prompt version served each response.
  - **Retrieval** — embedding model version, index snapshot, chunking config, and which documents were in scope.
  - **Params** — temperature, top-p, max tokens, tools.
  - **Code & dependencies** — the orchestration logic.
- Then **log the full config with every response** (prompt v, model v, retrieved doc IDs) so any output is traceable and reproducible-as-possible (remember true bit-exactness isn't guaranteed).
- This is what makes evals meaningful (you know what you tested), rollbacks safe, and incidents debuggable.

:::interview
What's really being tested: that you version model/prompt/retrieval/params as code, pin model versions against silent updates, and log the serving config per response for traceability.
:::

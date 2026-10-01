## What does a good tool definition look like, and what makes a bad one?

- The tool schema **is a prompt** — the model picks and fills tools based on their names, descriptions, and parameter docs. Bad schemas cause wrong-tool and wrong-argument errors far more than "the model is dumb."
- Good:
  - **Clear, action-named** tools (`get_order_status`, not `data`).
  - **Descriptions that say when to use it** and when not, plus units/formats for parameters.
  - **Few, well-typed parameters** with enums for fixed choices; required vs optional explicit.
  - **Return concise, structured results** the model can act on (not a 10k-token dump).
  - **Errors as actionable messages** ("order not found; check the ID format") so the model can recover.
- Bad: overlapping tools that do similar things (the model can't choose), vague names/descriptions, free-text params that invite malformed input, and giant raw outputs that blow the context.
- Design tools for the **model's** ergonomics, the way you'd design an API for a junior engineer.

:::interview
What's really being tested: that tool schemas drive selection accuracy, and you can list concrete do's/don'ts (clear names, when-to-use descriptions, enums, concise structured results, actionable errors).
:::

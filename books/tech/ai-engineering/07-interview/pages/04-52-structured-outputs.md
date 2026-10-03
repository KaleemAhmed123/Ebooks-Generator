## How do you get reliable JSON (or a fixed schema) out of an LLM?

- Asking nicely ("return JSON") fails at scale — the model adds prose, trailing commas, or drifts from the schema. You need a mechanism, not a plea.
- Options, strongest first:
  - **Constrained / structured decoding** — the decoder is restricted to only emit tokens allowed by a grammar or JSON Schema, so **invalid output is impossible by construction**. Provider "JSON mode"/"structured outputs" and libraries like Outlines/XGrammar do this.
  - **Function/tool calling** — define the schema as a tool; the model returns arguments matching it.
  - **Validate + retry** — parse against the schema (e.g. Pydantic), and on failure re-prompt with the error. A fallback when constrained decoding isn't available.
- Also: give an explicit schema/example, keep it flat where possible, and set low temperature.

:::interview
What's really being tested: that you reach for constrained decoding / tool-calling (guarantees valid structure) over prompt-and-hope, with validate-and-retry as the fallback.
:::

## How does tool / function calling actually work under the hood?

- You give the model a list of tools, each with a **name, description, and a JSON-Schema** for its arguments. This schema goes into the prompt (via the API's tool field).
- The model doesn't execute anything. When it decides to use a tool, it emits a **structured request** — the tool name and arguments as JSON — and stops.
- **Your code** parses that, runs the real function (API call, DB query, calculator), and feeds the **result back** into the conversation as a tool-result message.
- The model then continues, using the result to answer or to call another tool.
- Key point for interviews: the LLM only ever **proposes** calls and **reads** results; the execution, auth, and safety are entirely in your code. The schema's quality (names, descriptions) largely determines whether the model picks the right tool with the right arguments.

:::warn
The model can hallucinate tool arguments or call the wrong tool. Validate arguments against the schema, handle tool errors gracefully, and never auto-execute irreversible actions without a guard.
:::

:::interview
What's really being tested: that function calling is propose-then-your-code-executes (the model emits JSON, you run it), and that schema quality drives tool-selection accuracy.
:::

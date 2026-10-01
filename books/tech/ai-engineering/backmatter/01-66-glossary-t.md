## Glossary: T

| Term | Means | In |
|---|---|---|
| **time travel (LangGraph)** | Rewinding a checkpointed agent run to an earlier state, optionally editing it, and re-running | B5 |
| **tmux** | a terminal that keeps running on a server after you disconnect | B1 |
| **Token** | the unit of text a model consumes (word, subword, or byte) | B3 |
| **token bucket** | A rate-limiting algorithm where each key has a bucket that refills at its allowed rate and drains per unit consumed; empty bucket rejects | B6 |
| **Tokenization** | splitting text into tokens | B3 |
| **token pooling (visual)** | Merging neighboring patch tokens after encoding to cut visual token count by k² at the cost of spatial precision | B5 |
| **tool** | A function the model is allowed to call; the line between a chatbot and an agent | B5 |
| **tool choice** | Control over whether the model must call a tool: auto, any, a forced tool, or none | B5 |
| **tool poisoning** | Hiding malicious instructions in a tool's description that the model reads and obeys | B5 |
| **tool_result** | The message block returning a tool's output to the model, keyed to the tool_use id | B5 |
| **tool shadowing** | A malicious server registering a tool with the same name as a trusted one to intercept calls | B5 |
| **tool_use** | The message block in which a model requests a tool call, carrying an id, name, and input | B5 |

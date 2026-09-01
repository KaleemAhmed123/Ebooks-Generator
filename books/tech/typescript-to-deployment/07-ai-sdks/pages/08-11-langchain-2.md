### The two pieces that matter

- **The checkpointer** persists the conversation against a `thread_id`, so the next turn resumes without you rebuilding the message array
- **Middleware** wraps the model call: dynamic prompts, summarization, restricting tools per step, guardrails
- `wrapModelCall` is the hook, and it is the same idea as `wrapLanguageModel` in Module 4

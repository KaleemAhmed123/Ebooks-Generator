## Memory, and its four kinds

- "Memory" gets used for four different things that need four different implementations, and conflating them is why the topic feels confusing
- All of them are storage. None of them are a model feature

| Kind | Holds | Lives in | Lifetime |
|---|---|---|---|
| **Working** | this conversation's messages | the request, a row | one session |
| **Episodic** | what happened before, per user | a database table | forever, retrieved |
| **Semantic** | facts and preferences | key-value or a profile row | until changed |
| **Procedural** | how to do the job | the system prompt, tools, memory files | a deploy |

### Working memory

- The message array. It is bounded by the context window, so it needs trimming or summarizing, covered on the next page

### Episodic memory

- Past conversations and past runs. **Retrieved, not carried.** Embed each summary and pull the relevant one back when it matters
- This is retrieval from Module 7, pointed at conversation history instead of documents

### Semantic memory

- `prefers email`, `ships to Noida`, `is on the enterprise plan`
- **A row in a table, not a vector.** These are facts, they need updating in place, and they belong in the system prompt every time

### Procedural memory

- The instructions, the tools and the examples. It changes through a code review, not at runtime
- The Anthropic memory tool from Module 3 lets the model write its own procedural notes, which is powerful and needs the same review discipline

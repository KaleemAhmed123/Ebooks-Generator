## Coding agent: context management

- A coding agent's hardest resource is its **context window**. Over a long task it accumulates file contents, tool outputs, and history until it overflows — and a full context is slower, pricier, and *worse* (the model loses the thread among noise). Managing what's in context each step is a core harness job (19-39).

| Strategy | Does | When |
|---|---|---|
| **observation budget** | truncate each tool output (19-39) | always |
| **compaction** | summarise old history into a digest | long tasks |
| **retrieval** | pull only relevant files, not the repo | large codebases |
| **sub-agents** | delegate a sub-task with its own context | isolable work |
| **externalise state** | write progress to a file, not the context | very long tasks |

- **Compaction** is the key long-task technique: when the context grows large, summarise the older turns into a compact digest (what's been done, what's learned, what's next) and continue from that plus the recent turns. The agent keeps its working memory bounded without losing the plot — the memory-management lesson from Booklet 5, in the harness.
- **Sub-agents** isolate context: delegate "find where auth is handled" to a sub-agent that does its own exploration and returns *just the answer*, so the main agent's context isn't polluted with the sub-task's dozens of file reads. This is why the multi-agent and single-agent-with-sub-agents patterns exist (Flagship 8).

:::note
Context management is often what separates a coding agent that completes a long task from one that derails halfway. As context fills, models degrade — they miss instructions given early, repeat work, or lose track of the goal ("context rot"). So the harness must actively curate: budget observations, compact history, retrieve rather than dump, and offload state to files. This is Booklet 5's memory problem made concrete — the agent's effective intelligence over a long task is set less by the model and more by *how well the harness manages what the model sees each step*.
:::

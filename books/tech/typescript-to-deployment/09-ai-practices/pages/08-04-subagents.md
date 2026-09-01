## Subagents

- A long task fills its context with everything it read on the way. **A subagent runs a piece of the work in its own window and returns only the answer**
- That is the isolation move from Booklet 7, applied to your own development loop

### What it is genuinely good for

| Use | Gain |
|---|---|
| **a broad search** | "find every place that reads this config" returns a list, not 40 files of context |
| **a focused review** | a second agent reviews the first one's diff, with no memory of writing it |
| **an independent branch of research** | two approaches explored in parallel, both summarized |
| **a specialist pass** | a security-focused read of the same change |

- **The review case is the strongest.** A reviewer that did not write the code catches things the author does not, for the same reason it works with people

### What it is not

- **Not free.** Each subagent is a full set of model calls, so a task that spawns five costs roughly five times as much
- **Not more reliable.** Three agents agreeing is not evidence. They share the same blind spots
- **Not a substitute for decomposition.** Splitting a task into three reviewable steps beats one agent orchestrating three subagents you cannot see

### The rule

- **Use a subagent to save context, not to add cleverness.** Search, review and research all return a small answer from a large amount of reading, which is exactly the shape that benefits
- **Only summaries cross between agents**, never whole transcripts, or every agent carries every other one's context and the saving disappears

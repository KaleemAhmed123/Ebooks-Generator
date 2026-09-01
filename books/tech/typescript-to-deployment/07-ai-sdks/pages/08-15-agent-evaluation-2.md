### The failure modes worth naming

- **The loop.** The same call with the same arguments three times. Detect by hashing the calls, as Module 8 describes
- **The shortcut.** Answering from memory without calling the tool that had the real value
- **The wander.** Correct answer, eleven steps. Invisible unless step count is a metric
- **The give-up.** Budget exhausted with no answer, reported to the user as a generic error

### The discipline

- **Record every transcript in production** with tools, arguments, results and tokens. It is the only debuggable artifact an agent leaves
- Promote real failing transcripts into the evaluation set. Synthetic agent tasks are far easier than real ones

## The memory tool

- Context editing keeps the request small by throwing things away. Something has to hold what mattered
- The **memory tool** is a set of file operations the model can request: view, create, edit, rename, delete, under a `/memories` path
- Nothing runs on the provider side. **Your application executes every operation**, against storage you choose, so you own the data entirely
- The `/memories` path is a prefix you map onto a real directory, an S3 prefix, or rows keyed by user id

```ts
import { betaMemoryTool } from "@anthropic-ai/sdk/helpers/beta/memory"
import { BetaLocalFilesystemMemoryTool } from "@anthropic-ai/sdk/tools/memory/node"

const backend = await BetaLocalFilesystemMemoryTool.init("./memory")

const runner = client.beta.messages.toolRunner({
  model: "claude-opus-5",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Remember that Rabiya prefers email replies." }],
  tools: [betaMemoryTool(backend)],
  max_iterations: 10,
})
```

- The bare tool definition is `{ type: "memory_20250818", name: "memory" }`. There is no input schema to write
- The API adds an instruction telling the model to check its memory directory first, so no prompting is needed

### The security work is yours

- **Path traversal is the real risk.** A path such as `/memories/../../.env` reaches outside the directory
- Resolve every path to its canonical form and reject anything that leaves the memory root. Never trust the string as given
- **Scope storage per user or per tenant.** One shared directory means one customer's notes reaching another's conversation
- Cap file sizes and expire files that have not been read in months, or memory grows until it fills the window it was meant to save

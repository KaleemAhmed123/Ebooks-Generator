## The Claude Agent SDK

- Module 8 builds an agent loop by hand. The **Claude Agent SDK** ships the loop that Claude Code itself runs, as a library
- It arrives with file editing, shell access, search and subagents already wired, which is why it is the fastest route to a coding or operations agent
- It is a different shape from the SDKs in this module. It runs a session, not a request

```bash
npm i @anthropic-ai/claude-agent-sdk
```

```ts
import { query } from "@anthropic-ai/claude-agent-sdk"

for await (const message of query({
  prompt: "Find every route missing a rate limit and list them.",
  options: {
    model: "claude-opus-5",
    cwd: "/srv/app",
    maxTurns: 20,
    maxBudgetUsd: 2,
    allowedTools: ["Read", "Grep", "Glob"],
    canUseTool: async ({ toolName, toolUse }) => {
      if (toolName === "Bash" && String(toolUse.input.command).includes("rm")) return false
      return true
    },
  },
})) {
  console.log(message)
}
```

- **`canUseTool` is the approval gate from Module 8**, built in, and `maxBudgetUsd` is the cost budget
- `permissionMode` of `plan` makes it propose before acting, which is the safe default for anything touching a real system

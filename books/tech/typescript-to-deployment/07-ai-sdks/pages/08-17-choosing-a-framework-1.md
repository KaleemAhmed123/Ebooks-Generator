## Choosing between the frameworks

- Five reasonable options exist and they are not competing for the same job. Picking by popularity is how a team ends up with the wrong one

| | Fits | Skip when |
|---|---|---|
| **Raw provider SDK** | one or two tools, full control | you need provider portability |
| **AI SDK** | product features, streaming to a browser | you need durable graphs |
| **LangChain** | many integrations, middleware | you want a small dependency tree |
| **LangGraph** | branching, pausing, resuming, approvals | the flow is a simple loop |
| **Claude Agent SDK** | coding and operations agents on a filesystem | it is a chat feature |
| **OpenAI Agents SDK** | handoffs and guardrails, OpenAI-first | you are multi-provider |

```bash
npm i @openai/agents
```

```ts
import { Agent, run, tool } from "@openai/agents"

const support = new Agent({
  name: "support",
  instructions: "Answer support questions. Look up orders first.",
  tools: [getOrder],
})

const result = await run(support, "Where is o_842?")
```

- Its distinguishing features are **handoffs**, one agent transferring control to another, and **guardrails** as a first-class construct

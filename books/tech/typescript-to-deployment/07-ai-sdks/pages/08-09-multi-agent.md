## More than one agent

- A single agent with thirty tools degrades: it picks wrong tools, its prompt is a compromise, and its context fills with definitions it will not use
- **Splitting into several focused agents** gives each a small tool set and a prompt written for one job
- It also adds coordination, latency and cost, so it is not a free improvement

| Pattern | Shape | Fits |
|---|---|---|
| **Router** | a cheap model picks the specialist | many distinct request types |
| **Supervisor** | one agent calls others as tools | a task with sub-tasks |
| **Handoff** | control transfers, conversation continues | support tiers, escalation |
| **Parallel** | several run at once, results merged | independent research, voting |

```ts
const research = tool({
  description: "Research a question using the documentation corpus.",
  inputSchema: z.object({ question: z.string() }),
  execute: async ({ question }) => {
    const result = await researchAgent.generate({ prompt: question })
    return result.text
  },
})
```

- **A sub-agent as a tool is the simplest useful version**, and it composes with everything already built
- The sub-agent gets its own clean context window, which is the isolation move from Module 6

### What to watch

- **Cost multiplies.** Three agents at ten steps each is thirty model calls for one user request
- **Only pass summaries between agents**, never whole transcripts, or every agent carries every other agent's context
- **A sub-agent's output is untrusted input** to its parent. Injection travels through it, so the rules from Module 6 apply at each hop
- Start with one agent. Split when a specific failure, not a diagram, demands it

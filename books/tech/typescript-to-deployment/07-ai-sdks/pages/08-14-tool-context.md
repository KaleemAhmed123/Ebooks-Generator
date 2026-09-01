## When there are too many tools

- Tool definitions are input tokens. Fifty tools with descriptions and schemas can be twenty thousand tokens on **every turn**
- Accuracy falls too, because the model is choosing from a crowded list where several entries look plausible
- **Past roughly twenty tools, the tool set itself becomes the problem**

### The four fixes, cheapest first

| Fix | Does |
|---|---|
| **merge tools** | one `search` with a `type` argument beats six searches |
| **narrow per step** | `activeTools` exposes only what this phase needs |
| **defer definitions** | the tool search tool loads a schema on demand |
| **split the agent** | a sub-agent owns its own small tool set |

```ts
prepareStep: ({ stepNumber }) =>
  stepNumber === 0
    ? { activeTools: ["searchDocs", "searchOrders"] }
    : { activeTools: ["draftReply", "submitAnswer"] },
```

- **Narrowing by phase is the highest-value move** and needs no new infrastructure. Research first, act second

### Keeping results small

- A tool returning a full database row puts every column in the context, and it stays there for the rest of the run
- **Return the fields the model needs to decide**, and an id it can use to fetch more
- Truncate long results and say so: `... 40 more rows, call again with a filter`
- Context editing from Module 3 clears old results automatically, and it is a backstop rather than a substitute for returning less

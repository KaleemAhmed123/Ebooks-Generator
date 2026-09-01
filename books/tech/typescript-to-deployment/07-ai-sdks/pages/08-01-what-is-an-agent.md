# Module 8 - Agents

## What an agent actually is

- The word carries a lot of weight it has not earned. Stripped down, an agent is a loop
- Call the model with the tools and the history. If it asks for a tool, run it, append the result, and call again. Stop when it stops asking, or when the budget runs out
- **That is the whole mechanism.** Every framework in this module is that loop with state, retries and observability around it

```ts
async function run(messages, tools, maxSteps = 10) {
  for (let step = 0; step < maxSteps; step++) {
    const reply = await client.messages.create({ model, max_tokens: 2048, tools, messages })
    messages.push({ role: "assistant", content: reply.content })

    if (reply.stop_reason !== "tool_use") return reply

    const results = []
    for (const block of reply.content) {
      if (block.type !== "tool_use") continue
      results.push({
        type: "tool_result",
        tool_use_id: block.id,
        content: await execute(block.name, block.input),
      })
    }
    messages.push({ role: "user", content: results })
  }
  throw new Error("step budget exhausted")
}
```

### What makes it an agent rather than a function call

- **The model chooses the next step**, including how many steps there are. You did not write the sequence
- That is the whole value and the whole risk. It handles cases you did not anticipate, and it can also loop, wander or take an action you did not want
- Every remaining page in this module is about keeping the second half of that sentence contained

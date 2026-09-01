## Human in the loop

- Some actions cannot be undone: a refund, a deletion, an email to a customer, a payment
- An agent that is right 98 percent of the time is still wrong twice in a hundred refunds, and that is not an acceptable rate for money
- **An approval gate stops the loop before the action, records what was proposed, and waits for a person**
- It is the difference between an agent that suggests and an agent that acts, and it is a product decision more than a technical one

```ts
const REQUIRES_APPROVAL = new Set(["refund_order", "send_email", "delete_account"])

for (const block of reply.content) {
  if (block.type !== "tool_use") continue

  if (REQUIRES_APPROVAL.has(block.name)) {
    await db.pendingAction.create({
      data: { runId, toolUseId: block.id, tool: block.name,
              args: block.input, status: "pending" },
    })
    return { status: "awaiting_approval" }   // the loop stops here
  }

  results.push({ type: "tool_result", tool_use_id: block.id,
                 content: await execute(block.name, block.input) })
}
```

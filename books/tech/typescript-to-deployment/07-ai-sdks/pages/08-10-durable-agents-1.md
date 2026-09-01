## Agents that survive a restart

- An agent run can take minutes. Deploys, restarts, scale-downs and crashes all happen inside that window
- If the loop lives in a request handler, all of that work is lost, and the user sees a timeout after paying for twelve model calls
- **A production agent is a job, not a request.** This is the async API pattern from Booklet 6, applied to a loop

```ts
app.post("/api/v1/runs", async (req, res) => {
  const run = await db.agentRun.create({
    data: { userId: req.user.id, input: req.body.question,
            status: "queued", messages: [] },
  })
  await queue.add("agent-run", { runId: run.id })
  res.status(202).json({ data: { id: run.id, status: "queued" } })
})
```

```ts
worker.process("agent-run", async (job) => {
  const run = await db.agentRun.findUnique({ where: { id: job.data.runId } })

  for (let step = run.step; step < 20; step++) {
    const reply = await model(run.messages)
    run.messages.push(...)
    await db.agentRun.update({
      where: { id: run.id },
      data: { messages: run.messages, step: step + 1 },   // after every step
    })
    if (done(reply)) break
  }
})
```

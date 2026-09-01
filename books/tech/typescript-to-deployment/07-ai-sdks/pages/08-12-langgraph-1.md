## LangGraph

- A loop is one control flow. Real processes have branches, retries, parallel paths and points where they stop and wait
- **LangGraph models the process as a graph**: nodes are functions, edges are transitions, and a shared state object flows through
- Its distinguishing feature is not the graph. It is that **the graph can pause, persist and resume**, which is what an approval step actually needs

```ts
import { StateGraph, StateSchema, MemorySaver, Command,
         interrupt, START, END } from "@langchain/langgraph"
import * as z from "zod"

const State = new StateSchema({
  refundAmount: z.number(),
  status: z.enum(["pending", "approved", "rejected"]).nullable(),
})

const graph = new StateGraph(State)
  .addNode("approval", async (state) => {
    const decision = interrupt({
      question: "Approve this refund?",
      amount: state.refundAmount,
    })
    return new Command({ goto: decision ? "refund" : "cancel" })
  }, { ends: ["refund", "cancel"] })
  .addNode("refund", async () => ({ status: "approved" }))
  .addNode("cancel", () => ({ status: "rejected" }))
  .addEdge(START, "approval")
  .addEdge("refund", END)
  .addEdge("cancel", END)
  .compile({ checkpointer: new MemorySaver() })

const config = { configurable: { thread_id: "refund-842" } }
const paused = await graph.invoke({ refundAmount: 4500, status: "pending" }, config)
console.log(paused.__interrupt__)

const done = await graph.invoke(new Command({ resume: true }), config)
console.log(done.status)   // "approved"
```

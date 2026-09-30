## Step 2: the API contract

- Before boxes, define the **interface** — it forces the functional requirements into something concrete and exposes the sync/async decision that shapes the whole system.
- The core question: does the caller *wait*? Three shapes, chosen by latency and duration.

| Shape | When | Mechanism |
|---|---|---|
| **synchronous** | short, fast (a classification) | request → response |
| **streaming** | interactive chat | request → SSE token stream |
| **asynchronous** | long jobs (agents, batch) | submit → job id → poll / webhook |

:::mint
```text
POST /v1/chat            (streaming)
  req:  { conversation_id, messages[], stream: true, user_id }
  res:  text/event-stream of token deltas, then usage {in, out, cost}

POST /v1/agent/run       (async — a coding agent runs minutes)
  req:  { task, repo, budget_tokens, callback_url }
  res:  { job_id, status: "queued" }
GET  /v1/agent/run/{id}  -> { status, steps[], result?, tokens_used }
```
:::

- **Chat streams** (Server-Sent Events) because a 3-second answer that streams *feels* instant — TTFT is what the user perceives, so the contract must expose the stream, not make them wait for the full response.
- **Agents run async** because they take minutes and must survive restarts (Booklet 5's durable execution): return a `job_id`, let the client poll or receive a webhook, and carry a token/cost budget in the request so the run cannot spend unboundedly.
- **Put `usage` in the response.** Returning token counts and cost per call is what makes the FinOps attribution (17-55) possible downstream — design it into the contract, do not bolt it on.

:::note
The API contract is where interviewers see whether you have actually shipped LLM products. Streaming for chat, async-with-a-job-id for agents, `conversation_id` for memory, `user_id` for attribution and rate limits, a token budget for cost control — naming these in the interface signals production experience faster than any diagram, because they are the fields you only add after being burned by their absence.
:::

## Step 1: requirements first

- The first five minutes decide the interview. **Never architect before you have pinned functional and non-functional requirements** — the interviewer left them vague on purpose to see if you ask.
- Ask the questions whose answers *change the design*. Each one below forks the architecture.

| Ask | If the answer is… | The design changes to… |
|---|---|---|
| daily active users / QPS? | 100 vs 100M | one GPU vs a multi-region fleet |
| latency SLO? | 5 s ok vs 300 ms TTFT | batch tier vs dedicated + spec-decode |
| knowledge source? | model's own vs private corpus | plain LLM vs RAG pipeline |
| fresh data? | static vs real-time | cache-heavy vs live retrieval |
| stateful (memory)? | one-shot vs conversation | stateless vs session + KV locality |
| accuracy bar / stakes? | casual vs medical/legal | light guardrails vs eval + human-in-loop |
| budget? | unconstrained vs tight | frontier vs routed/quantised/self-host |
| compliance? | none vs HIPAA/EU | any region vs residency + BAA |

- **Write the non-functional numbers down and refer back to them.** "You said 50M DAU and a 300 ms TTFT SLO" is the sentence that drives every later decision — the scale math, the serving engine, the cost. A design that ignores the numbers it was given reads as junior.
- **State your assumptions out loud** when the interviewer stays vague: "I'll assume 10M DAU, 20 messages each, 300 ms TTFT — stop me if that's off." That is how staff candidates take control of ambiguity instead of freezing on it.

:::interview
"Design a customer-support assistant."

Do not draw anything yet. Ask: how many businesses/end-users and peak QPS? latency target? does it answer from *their* knowledge base (→ RAG) or general knowledge? how fresh must the KB be? multi-turn memory? what is the cost of a wrong answer (→ guardrails, human handoff)? budget and compliance? *Then* size it and design. The clarifying questions themselves are scored — they show you know which requirements bind the architecture.
:::

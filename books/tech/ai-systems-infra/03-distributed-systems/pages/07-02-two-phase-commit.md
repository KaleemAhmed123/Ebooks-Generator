## 2PC and its blocking problem

- When one transaction must commit atomically across **several** nodes or services — all commit or all abort — the classic answer is **Two-Phase Commit (2PC)**, run by a **coordinator**:
  - **Phase 1 — prepare.** The coordinator asks every participant "can you commit this?" Each does the work, locks what it needs, writes it to durable storage as *prepared*, and votes **yes** or **no**. A yes is a **promise**: "I will commit if told to, even if I crash and restart."
  - **Phase 2 — commit/abort.** If **all** voted yes, the coordinator tells everyone **commit**; if **any** voted no (or timed out), it tells everyone **abort**. Participants finish and release locks.
- It does deliver cross-node atomicity. But it has a crippling flaw that keeps it out of most modern microservice designs:

:::warn
2PC is a **blocking** protocol. Between voting "yes" and hearing the final decision, a participant is **in-doubt**: it has locked the rows and *must* wait for the coordinator — it cannot unilaterally commit or abort without risking disagreement. If the **coordinator crashes** at that moment, every participant sits there **holding locks indefinitely**, blocking other transactions, until the coordinator recovers. So 2PC turns the coordinator into a single point of failure *and* couples everyone's availability to it — the opposite of what you want across services. It's also chatty (two round trips + fsyncs) and assumes participants are reachable, which partitions violate.
:::

- Where 2PC still lives: **inside** a single system that can afford it — a distributed SQL database coordinating its own shards, or an **XA** transaction across a database and a message broker in a tightly-controlled environment. Across independent microservices over an unreliable network, the blocking and coupling are unacceptable, so the industry reaches for a different model entirely: give up global atomicity, and **make failure a first-class, compensable step** — the saga.

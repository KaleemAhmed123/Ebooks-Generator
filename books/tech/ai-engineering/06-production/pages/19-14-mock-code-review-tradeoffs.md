## Mock: code-review agent — eval, failure, tradeoffs

- **Eval is precision-first and human-anchored.** The metric that matters is *comment acceptance rate* — of the comments the agent posted, what fraction did developers act on vs dismiss? A held-out set of PRs with known issues measures recall; live acceptance measures precision. You tune the confidence threshold to keep acceptance high even if recall drops.
- **Failure modes.**

| Failure | Response |
|---|---|
| hallucinated issue (cites code that's fine) | ground every comment in the diff; self-check pass |
| comment flood on a big PR | cap comments per PR; rank by severity |
| leaks private code to a provider | self-host or a zero-retention endpoint; VPC |
| misses a real security bug | pair with deterministic linters/SAST; agent complements, not replaces |
| repo too big for context | retrieval over the repo, not stuffing the whole thing |

- **Tradeoffs probed.** *Agent vs deterministic tools* — linters and SAST (static analysis) catch known patterns cheaply and reliably; the agent adds judgement (logic bugs, design, intent) but hallucinates. Run both; let each do what it's good at. *Precision vs recall* — bias hard to precision. *Cost per PR* — cache the repo context, retrieve rather than re-embed, batch non-urgent reviews.

:::interview
"Should the review agent replace your linters?"

No — it *complements* them, and saying otherwise is the trap. Deterministic tools (linters, type-checkers, SAST) are cheap, reliable, and never hallucinate, so they own the known-pattern checks; the agent adds what they can't — logic errors, design feedback, "does this match the intent?" — but it sometimes invents issues, so it needs grounding and a self-check filter. The right design runs both, routes the mechanical checks to the deterministic tools, and reserves the agent (and its cost) for the judgement calls. Positioning the agent as *complement, not replacement* — and knowing which class of bug each catches — is the senior read.
:::

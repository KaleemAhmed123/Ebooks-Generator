## Mock: observability + eval — failure, tradeoffs, wrap-up

- **Failure modes** of the watcher itself:

| Failure | Response |
|---|---|
| trace volume overwhelms storage | sampling + retention tiers (hot recent, cold archive) |
| PII in logged prompts/outputs | redact at the collector before storage (17-53) |
| LLM-judge is itself wrong/biased | calibrate against human review; use it for trends, not verdicts |
| eval set goes stale | feed real production failures back into the offline set |
| alert fatigue | alert on rate-over-window, page on SLO breach only |

- **Tradeoffs probed.** *Sampling rate* — more traces mean better visibility but higher cost; keep all errors, sample successes. *Build vs buy* — LangSmith/Langfuse/Arize give you this off the shelf; build only if scale or data-residency demands it. *LLM-judge vs human* — judge is cheap and scalable but imperfect; anchor it with periodic human calibration and use it for *relative* trends, not absolute truth.
- **Wrap-up of 19A.** Seven mocks, one framework: clarify → estimate → design the minimal spine → do the capacity/cost math → name the eval and failure modes → defend the tradeoff. The building blocks (gateway, cache, retriever, serving, queue, eval loop, observability) recur; only their arrangement changes.

:::interview
"What's the one thing every AI system design answer must include that candidates most often skip?"

**Eval** — "how do you know it works, and know it *keeps* working?" Candidates lavish time on the architecture and forget that an LLM system's correctness is a *measured distribution*, not a given: no offline eval gating changes, no online quality signal catching silent regressions, no LLM-judge-plus-human loop. An architecture without an eval story is a system you can't safely change. Leading with clarified requirements and *closing* with the eval-and-failure story is the shape of every strong answer in this cluster.
:::

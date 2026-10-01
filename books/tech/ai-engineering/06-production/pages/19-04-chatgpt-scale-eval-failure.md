## Mock: ChatGPT-scale — eval, failure, tradeoffs

- **Eval** (the step candidates skip). Offline: a held-out suite of quality/safety/refusal tests gated in CI on every model or prompt change. Online: sampled LLM-judge scoring + implicit signals (regenerations, thumbs) as a live quality SLO (17-46a), so a silent regression from a model or prompt update pages someone.
- **Failure modes** and their designed responses:

| Failure | Response |
|---|---|
| serving fleet overload | admission control + shed low-priority, autoscale with warm floor |
| a region outage | route to nearest healthy region, replicate KV to failover (17-35) |
| model regression after update | canary + online eval catch it; one-command prompt/model rollback |
| jailbreak / unsafe output | input+output Llama Guard, safety metric alerting (Module 18) |
| cost spike (viral / retry storm) | budget alerts, rate limits with backoff, per-key quotas |

- **Tradeoffs the interviewer will probe.** *Bigger model vs cheaper routing* — route easy turns to a small model, reserve the frontier model for hard ones (17-44); quality preserved where it matters, cost cut on the majority. *Latency vs throughput* — pick the batch depth at the goodput knee, not the throughput peak (17-30). *Memory vs freshness* — cap conversation history fed back, summarise older turns.

:::interview
"What breaks first at this scale, and how do you know before users do?"

Capacity: the serving fleet hits the preemption knee under a traffic spike, so I design **admission control + load shedding + a warm autoscaling floor** and **load-test at peak context×concurrency** to find the knee before launch. And I insist on a **live quality signal**, because the failure that has *no* error and *no* latency spike — a model/prompt update quietly degrading answers — is the one dashboards miss; online eval plus one-command rollback is how I catch and fix it fast. Naming the *silent quality regression* as the scariest failure is what separates a staff answer from an uptime-only one.
:::

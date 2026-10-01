## Safety gate: in production

- The gate (Flagship 12) works; running it in production adds constraints the offline design ignores — latency, cost, and the reality that the gate itself can fail.

| Concern | Handling |
|---|---|
| **added latency** | run input classifier in parallel with prefill; stream output through the checker |
| **added cost** | small fast classifiers, not a frontier model, for screening |
| **the gate fails open/closed?** | decide per stakes: fail-closed (block) for high-harm, fail-open for availability |
| **false-positive UX** | appeal path + human review (18-44) |
| **evolving attacks** | classifiers + jailbreak set updated continuously (18-15) |

- **Latency: overlap the checks.** Screening input and output in *series* with generation doubles the felt latency. Instead, run the input classifier *concurrently* with prefill, and screen the output *as it streams* rather than after — so safety adds milliseconds, not a second. A gate that makes every response feel slow gets disabled.
- **Fail-open vs fail-closed is a policy decision.** If the safety classifier service is down, do you *block* everything (fail-closed — safe but an outage) or *allow* everything (fail-open — available but unguarded)? The answer depends on the harm: fail-closed for a medical/high-stakes product, fail-open with alerting for a low-stakes one. This must be decided deliberately, not left to whatever the code happens to do on a timeout.

:::interview
"Doesn't adding a safety gate make every response slow and expensive?"

Only if you build it naively. **Latency**: run the input classifier *in parallel* with prefill and screen the output *as it streams*, so the checks overlap generation and add milliseconds, not a serial second. **Cost**: use small fast classifiers (Llama Guard-class), not a frontier model, for screening — cheap per call. Then the production decisions the offline design skips: **fail-open vs fail-closed** when the classifier service is down (block for high-harm products, allow-with-alerting for low-stakes — a deliberate policy call), an **appeal path** for false positives, and **continuously updated** classifiers/jailbreak sets since attacks evolve. The framing — safety is a latency-and-availability engineering problem in production, solved by overlapping checks and choosing failure modes on purpose — is the signal.
:::

## What to log on every request

- Observability (17-45) is only as good as what each span carries. There's a standard set of attributes that make an LLM request debuggable, cost-attributable, and auditable — and a set you must handle carefully or leak (17-53).

| Log | Why |
|---|---|
| model + version, prompt version | which config produced this (rollback, 17-44a) |
| input/output token counts | cost, and load analysis |
| computed cost | FinOps attribution (17-55) |
| TTFT, TPOT, e2e latency | the golden signals (17-46) |
| the prompt + output (redacted) | debug *quality* failures — irreplaceable |
| finish reason, error/refusal | failure classification |
| trace + request + user/session id | correlation, per-user analysis |
| safety verdicts, cache hit/miss | safety + cost debugging |

- **The prompt and output are the most valuable and most sensitive** thing to log. Without them, a quality bug ("the model gave a wrong answer") is undebuggable — you can't see what it actually said. With them, you can reproduce and fix. But they contain whatever the user typed, so **redact PII**, set retention limits, and encrypt (17-53) — the tension between debuggability and privacy is real and must be designed, not defaulted.
- **Log versions, always.** The model version, prompt version, and config that produced a request are what let you correlate a quality regression with a change and roll back (17-44a, 17-52a). A trace without the version that produced it can't answer "what changed?"

:::note
The single most useful thing to get right is **prompt/output logging with redaction** — it's the difference between "users say quality dropped" being a mystery or a five-minute diagnosis (read the logged prompts and outputs, spot the pattern, correlate with the version). Teams under-log it (privacy fear, storage cost) and then fly blind on quality incidents. The answer isn't to skip it — it's to log it *with* PII redaction, retention limits, and sampling (17-46a), so you keep the debuggability without the liability. Everything else on the list is standard APM plus tokens/cost; the prompt/output pair is the LLM-specific, quality-debugging essential.
:::

## Deep mock: clinical assistant — eval and wrap

- **Eval** for a clinical system is rigorous and clinician-anchored, because "looks good" is not a standard when patient safety is at stake.

| Layer | Metric |
|---|---|
| **ASR** | word error rate, *especially* on medical terms/drugs |
| **draft quality** | clinician edit distance (how much they had to change) |
| **factual accuracy** | every clinical claim verified against the transcript |
| **safety** | missed drug interactions, hallucinated meds (→ zero tolerance) |
| **codes** | billing/diagnosis code accuracy vs coder ground truth |
| **outcome** | clinician time saved, sign-off rate, post-sign corrections |

- **Edit distance is the north-star quality metric** — how much the clinician had to change the draft measures how good it was, in the unit that matters (their time). And every eval is validated against *clinician* ground truth, not an LLM judge alone, because the domain expertise and liability require it. Safety metrics (hallucinated meds, missed interactions) get a *far stricter* bar than quality metrics.
- **Failure modes and responses:** hallucinated medication → drug-database gate blocks it pre-review; ASR error on a drug name → confidence flag forces review; model regression → canary + clinician-reviewed eval before rollout (never ship a clinical model change unvalidated); the model down → clinicians document manually (graceful degradation, no patient impact).

- **Wrap-up.** This design shows the framework at full depth: requirements *drove* it (safety + compliance → human-in-loop, near-batch), the architecture composed known blocks (ASR + RAG + structured output + review gate), scale/cost fell out of the non-interactive SLA, and safety/eval/compliance were woven throughout — not bolted on.

:::interview
"Why is this design different from a consumer chatbot?"

Three inversions, all from the requirements. **Human-in-the-loop, not autonomous** — patient-safety stakes mean a clinician always signs, so the AI *drafts to speed review* and I engineer against automation bias. **Throughput, not latency** — the 30s-after-visit SLA makes it near-batch, so I optimise cost, not TTFT. **Compliance-first** — HIPAA/PHI constrain model choice (zero-retention), region, logging, and access control from minute one. The meta-lesson: the *requirements* determine the design, so clarifying stakes, latency, and compliance *first* separates a design that fits the problem from an impressive one that solves the wrong problem.
:::

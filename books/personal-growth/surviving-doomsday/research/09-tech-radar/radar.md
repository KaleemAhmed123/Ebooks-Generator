# Personal tech radar
> Owner profile: backend-heavy AI full-stack (Node/TS, Python/FastAPI, Postgres, RAG, LangGraph, evals), chasing freelance AI work. See `../../profile.md`.
> Living file. **Update, don't rewrite.** Each quarter: add a dated row to "Movement log", change the item's ring and `Placed` date, keep the old reasoning in the log. Sources are `[S#]` in `sources.md`.

## Rings (borrowed from Thoughtworks [S1][S3], tuned for one person)

| Ring | Meaning for me | Entry bar |
|---|---|---|
| **Adopt** | Default choice in client work. I sell it. | Used in production by me *and* evidence it is durable (neutral governance, stable major, or Lindy). |
| **Trial** | Use on my own projects or a low-risk client slice. | A spike verdict of "go" (see report, spike protocol). |
| **Assess** | Worth a 2–8 h spike when a real client need appears. | One primary source shows it is real, not a launch post. |
| **Hold** | Don't start new work on it. Migrate if I'm on it. | Deprecated, abandoned, or a demonstrated failure mode. |

Unlike Thoughtworks, items don't fade after one edition [S1]: this file is the memory. An item that sits in Assess for 3 quarters without a spike gets deleted.

## Snapshot — placed 2026-10-03

Release facts are from the PyPI/npm registries pulled 2026-10-03 [S22][S23] unless cited otherwise.

### Adopt

| # | Item | Type | Placed | Why, for this profile | Evidence |
|---|---|---|---|---|---|
| 1 | Context engineering | technique | 2026-10-03 | Primble's "rules first, LLM for the gaps" is this. Thoughtworks put it in Adopt (Apr 2026). It is a skill, not a library, so it can't be deprecated. | [S5] B |
| 2 | Eval gates in CI (deterministic checks + human-labelled set; judge only where calibrated) | technique | 2026-10-03 | Evals are what clients can't do themselves. Thoughtworks moved *uncalibrated* LLM-as-judge back to Assess for bias, so the gate needs a labelled set under it. | [S8] B |
| 3 | MCP, spec 2026-07-28 (building servers) | protocol | 2026-10-03 | Neutral governance (Linux Foundation AAIF since 2025-12-09), Tier 1 SDKs in TS/Python/Go/C#, a published roadmap and deprecation policy. Thoughtworks still says Trial (Nov 2025); I go further because "MCP server for your system" is a sellable unit for my integration work (SAP/Salesforce). Build stateless from day one. | [S25][S26][S27][S28] A, [S6] B |
| 4 | LangGraph 1.x | framework | 2026-10-03 | Already in my stack. 1.0.0 shipped 2025-10-17 with no breaking changes; at 1.2.12 now, no 2.0 after ~12 months. Durable execution and human-in-the-loop fit ECOU-style confirmation gates. | [S22] A, [S31] A/C |
| 5 | Coding agents (Claude Code, Codex) under a leash | practice | 2026-10-03 | Already use them. The leash matters more than the tool: the 2025 RCT measured a 19% slowdown with a 20% *perceived* speed-up, and most developers distrust AI accuracy. Review every diff, run tests, keep the agent out of secrets. | [S36] B, [S37] A, [S38] B, [S4] B |
| 6 | AGENTS.md in every repo | convention | 2026-10-03 | Near-zero cost. An AAIF founding project alongside MCP. | [S25] A, [S33] A |
| 7 | pgvector on Postgres | platform | 2026-10-03 | Postgres is the Lindy pick. pgvector ships steady bug-fix releases (0.8.7 on 2026-10-01). Default vector store until a client's scale proves otherwise. | [S35] A, [S21] C |

### Trial

| # | Item | Type | Placed | Why, for this profile | Evidence |
|---|---|---|---|---|---|
| 8 | OpenTelemetry GenAI semantic conventions | standard | 2026-10-03 | The right long-term shape for LLM tracing, and I already run Prometheus/Grafana. Still "Development" status in its own repo, so attribute names can change. Instrument, but pin versions. | [S29] A |
| 9 | Langfuse (self-hosted) | tool | 2026-10-03 | Fits my self-hosting habit; tracing, datasets, LLM-as-judge in one place. Acquired by ClickHouse (2026-01-16), core stays MIT. Acquisition is a watch item, not a blocker. 17 releases in 90 days. | [S32] A/C, [S22] A |
| 10 | Pydantic AI | framework | 2026-10-03 | Typed agents next to FastAPI. Churn is high: 1.0 on 2025-09-05, 2.0 on 2026-06-23, 64 releases in the last 90 days. Pin minor versions. | [S22] A |
| 11 | Vercel AI SDK (`ai`) | library | 2026-10-03 | The TS default for Next.js front ends. Majors every ~6 months (5.0 2025-07-31, 6.0 2025-12-22, 7.0 2026-06-25). Budget a migration per year. | [S23] A |
| 12 | Agent Skills (SKILL.md) | convention | 2026-10-03 | Thoughtworks Trial (Apr 2026). Cheap to write; the "30+ tools" adoption figure is from C sources. | [S7] B, [S34] C |

### Assess

| # | Item | Type | Placed | Why, for this profile | Evidence |
|---|---|---|---|---|---|
| 13 | A2A protocol | protocol | 2026-10-03 | v1.0 in March 2026 (Python SDK 1.0.0 on 2026-04-20), Linux Foundation governance. Adoption numbers are self-reported. Cross-vendor agent-to-agent calls are rare in small freelance projects (I infer). Spike when a client brings it. | [S22] A, [S30] C |
| 14 | MCP extensions: Tasks, MCP Apps | protocol | 2026-10-03 | New in 2026-07-28; Tasks was redesigned in that same release. Too young to sell. | [S26][S27] A |
| 15 | Vendor agent SDKs (OpenAI Agents SDK, Claude Agent SDK, Google ADK) | framework | 2026-10-03 | OpenAI Agents SDK still 0.x (0.23.1); Claude Agent SDK 0.x with 53 PyPI releases in 90 days; ADK at 2.x. Lock-in to one model vendor; use only when the client is committed to that vendor. | [S22][S23] A |
| 16 | Microsoft Agent Framework | framework | 2026-10-03 | 1.0 on 2026-04-02; successor to AutoGen and Semantic Kernel. Relevant only for Azure/.NET clients. | [S22] A, [S19] A |
| 17 | Self-hosted inference (vLLM, SGLang) | platform | 2026-10-03 | Both pre-1.0 (vLLM 0.30.0, SGLang 0.5.21) with frequent releases. Needed only for data-residency or cost cases; most freelance work goes through APIs (I infer). | [S22] A |
| 18 | DSPy | framework | 2026-10-03 | 3.x since 2025-08-12. Prompt optimisation against a metric; pays off only once an eval set exists (item 2 first). | [S22] A |

### Hold

| # | Item | Type | Placed | Why | Evidence |
|---|---|---|---|---|---|
| 19 | OpenAI Assistants API | API | 2026-10-03 | Sunset 2026-08-26. Migrate any client code to the Responses API. | [S18] B |
| 20 | AutoGen | framework | 2026-10-03 | Maintenance mode, no new features; last `autogen-agentchat` release 2025-09-30. | [S19] A, [S22] A |
| 21 | MCP legacy features: sessions, HTTP+SSE transport, Roots/Sampling/Logging | protocol | 2026-10-03 | Removed or deprecated in 2026-07-28, with a 12-month window. Don't build new servers on them. | [S26][S27] A |
| 22 | Uncalibrated LLM-as-judge as the only release gate | practice | 2026-10-03 | Known biases (position, verbosity, self-enhancement). Onlycouplez's gates should get a human-labelled check set. | [S8] B |
| 23 | Unpinned AI dependencies and unvetted MCP servers | practice | 2026-10-03 | LiteLLM 1.82.7/1.82.8 (2026-03-24) stole credentials on install; PyPI shows the gap between 1.82.6 and 1.83.0. Pin with hashes, review transitive deps of MCP servers. | [S20] B, [S22] A |

## Candidates inbox

One line each: date seen · item · signal · source. Promote to Assess only with a primary source.

- 2026-10-03 · OpenTelemetry GenAI → Stable · watch the semconv-genai repo for a first release · [S29]
- 2026-10-03 · Thoughtworks Radar Vol. 35 · expected around Nov 2026 if the April/November cadence holds (I infer from Vol. 33 Nov 2025, Vol. 34 Apr 2026) · [S4][S6]

## Movement log

| Date | Item | From → To | Reason |
|---|---|---|---|
| 2026-10-03 | all | — → initial | First pass. |

## What to track

- Observability is only useful if you capture the right signals. Four categories cover what you will actually need to debug, control cost, and improve an agent.

<svg viewBox="0 0 360 84" role="img" aria-label="Track debugging detail, cost, latency, and quality signals" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="82" height="52" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="51" y="30" text-anchor="middle">debug</text><text x="51" y="42" text-anchor="middle" font-size="5.5" fill="#6b6b6b">every span's</text><text x="51" y="51" text-anchor="middle" font-size="5.5" fill="#6b6b6b">in/out, tools</text>
  <rect x="98" y="16" width="82" height="52" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="139" y="30" text-anchor="middle">cost</text><text x="139" y="42" text-anchor="middle" font-size="5.5" fill="#6b6b6b">tokens, $ per</text><text x="139" y="51" text-anchor="middle" font-size="5.5" fill="#6b6b6b">run/step/user</text>
  <rect x="186" y="16" width="82" height="52" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="227" y="30" text-anchor="middle">latency</text><text x="227" y="42" text-anchor="middle" font-size="5.5" fill="#6b6b6b">per step +</text><text x="227" y="51" text-anchor="middle" font-size="5.5" fill="#6b6b6b">p50/p95</text>
  <rect x="274" y="16" width="82" height="52" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="315" y="30" text-anchor="middle">quality</text><text x="315" y="42" text-anchor="middle" font-size="5.5" fill="#6b6b6b">success, user</text><text x="315" y="51" text-anchor="middle" font-size="5.5" fill="#6b6b6b">feedback</text>
</svg>

- **Debug detail** — every span's inputs and outputs: the exact prompt, the completion, each tool call's arguments and result. This is what lets you reconstruct *why* a run went wrong (13-44). Without full in/out capture, a trace is a timeline with no content.
- **Cost** — tokens and dollars per run, per step, and aggregated per user/feature. This finds the expensive step (a fat tool result re-billed each turn, 13-17) and catches runaway loops (14-05) by their cost signature.
- **Latency** — duration per step and end-to-end, as percentiles (p50/p95), not just averages — the slow tail is what users feel. Locate the bottleneck span (a slow tool, a long generation).
- **Quality** — did the run succeed? Capture explicit **user feedback** (thumbs up/down, corrections), task-success signals, and automated eval scores (next cluster). This is the hardest and most valuable signal — everything else is a proxy for it.

:::interview
"What do you monitor for a production agent?"

Four things. Debug detail — full inputs/outputs of every model and tool call, so failures are reconstructable. Cost — tokens and dollars per run/step/user, to find expensive steps and catch runaway loops. Latency — per-step and end-to-end percentiles (p95, not just mean), to locate bottlenecks users actually feel. And quality — success signals and real user feedback, plus automated evals. The first three are mechanical; the fourth is the point — you instrument the mechanics to explain movements in quality.
:::

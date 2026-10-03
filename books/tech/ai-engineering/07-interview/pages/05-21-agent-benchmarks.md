## What do agent benchmarks like SWE-bench and GAIA measure, and how do you read them critically?

- They test end-to-end agent capability on realistic tasks.
  - **SWE-bench (Verified)** — resolve real GitHub issues in real repos; success = the hidden tests pass. The standard for coding agents.
  - **GAIA** — general assistant tasks needing tool use, web browsing, and multi-step reasoning; questions are easy for humans, hard for agents.
  - **WebArena / OSWorld** — operating a browser / a real OS to complete tasks; test computer-use agents.
- Read them critically:
  - **Harness matters** — the same model scores very differently with different scaffolding (tools, retries, prompts). A "model X scores Y%" headline is really "this *system* scores Y%."
  - **Contamination** — public benchmarks can leak into training data, inflating scores.
  - **Distribution gap** — benchmark tasks may not match your domain; a top SWE-bench agent can still flop on your codebase.
- Use benchmarks to compare approaches directionally, then **build your own eval** on your real tasks.

:::interview
What's really being tested: that you know what each benchmark measures *and* that scores reflect the whole harness (plus contamination risk) — so you'd validate on your own tasks.
:::

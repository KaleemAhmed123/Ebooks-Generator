## Design a code-review / PR agent.

- **Requirements:** on a pull request, produce useful review comments (bugs, style, security), low false-positive rate (noise destroys trust), integrate with the git host, respect repo context.
- **Core = agent with tools + strong grounding:**
  - **Trigger** on PR open/update (webhook).
  - **Gather context** — the diff, plus retrieval over the surrounding code/repo (the change rarely makes sense in isolation), tests, and style/config.
  - **Analyse** — the LLM reviews the diff with context; pair with **deterministic tools** (linters, static analysis, test runs) whose findings are reliable and ground the LLM's comments.
  - **Verify before commenting** — prefer findings the agent can back with a tool result or a concrete failure scenario; suppress low-confidence nits.
  - **Post** inline comments via the host API.
- **Reliability:** false positives are the killer — tune for **precision over recall**, let users dismiss/teach, and track accepted-comment rate.
- **Safety:** read-mostly; if it can push fixes, gate behind human approval; sandbox any execution; beware injection from PR content.
- **Eval:** curated PRs with known issues; measure precision/recall of findings and developer acceptance; iterate from dismissed comments.
- **Tradeoffs:** precision vs recall (lean precision), LLM judgment vs deterministic tools (combine), cost per PR vs depth.

:::interview
What's really being tested: grounding the LLM with repo retrieval + deterministic analysis, optimising for precision (trust), gating any writes behind approval, and measuring acceptance rate — not just "send the diff to an LLM."
:::

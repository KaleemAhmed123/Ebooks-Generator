## What are the common ways agents (especially multi-agent systems) fail?

- Failures cluster into categories — knowing them speeds debugging. [VERIFY: MAST taxonomy source.]
  - **Specification** — bad goal/role/prompt: the agent optimises the wrong thing or misunderstands the task from the start.
  - **Inter-agent / coordination** — in multi-agent systems: miscommunication, dropped context on handoff, agents duplicating or contradicting each other, waiting on each other (deadlock).
  - **Verification** — no/weak checks, so errors aren't caught and compound; the agent declares success wrongly.
  - **Reasoning/tool errors** — wrong tool, bad arguments, misread results, loops.
  - **Termination** — stops too early (gives up) or never (runaway).
- Research (e.g. MAST) finds many multi-agent failures are **coordination and specification** problems, not model stupidity — which is why adding more agents often adds failure modes rather than fixing them.
- Debugging approach: use traces to classify the failure into one of these buckets, then fix the matching layer (spec, coordination, verification, tools, termination).

:::interview
What's really being tested: that you have a mental taxonomy (spec / coordination / verification / tool / termination), and know multi-agent failures are often coordination/spec issues — so you debug by category, not randomly.
:::

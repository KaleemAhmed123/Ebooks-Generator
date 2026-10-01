## "How would you onboard onto an unfamiliar AI system/codebase?"

- **What they're screening for:** a systematic approach to understanding a system before changing it — especially AI systems with hidden data/prompt/model dependencies.
- **A strong answer shows:**
  - **Start with the why and the flow** — what problem it solves, then trace one request end to end (input → retrieval → prompt → model → post-processing → output).
  - **Find the AI-specific surfaces** — where are the prompts, which model/version, what's the retrieval corpus/index, where are the evals, what guardrails exist.
  - **Read the evals and traces first** — they tell you what "good" means here and where it currently fails, faster than reading all the code.
  - **Talk to people** — the quickest path to the non-obvious decisions and landmines (why this model, why this chunking).
  - **Make a small, safe change** and run it through the eval/monitoring to confirm your mental model.
- The theme: understand the data/prompt/model flow and the eval definition of quality **before** touching anything.

:::warn
Weak: "Start coding and figure it out." Strong: trace a request end to end, locate prompts/model/corpus/evals, read the evals to learn the quality bar, ask about hidden decisions, then make one safe change.
:::

:::interview
What's really being tested: a disciplined onboarding method — trace the flow, find the AI-specific surfaces, learn quality from the evals — before modifying a system you don't yet understand.
:::

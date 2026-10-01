## How do you red-team an LLM application before launch?

- **Red-teaming** is adversarially probing the system for failures — safety, security, and misuse — before attackers or users find them.
- What to probe:
  - **Jailbreaks** — attempts to get disallowed content (role-play, obfuscation, many-shot, encoded prompts).
  - **Prompt injection** — especially **indirect** (malicious instructions in retrieved docs / tool results) for RAG and agents; test the lethal-trifecta exposure.
  - **Data exfiltration / leakage** — can it be made to reveal system prompts, other users' data, secrets?
  - **Harmful/unsafe outputs**, bias, and policy violations across categories.
  - **Tool/action abuse** for agents — can it be steered into destructive or unauthorised actions?
- How:
  - **Automated tooling** (e.g. garak, PyRIT) to generate attacks at scale, plus **human red-teamers** for creativity.
  - **Continuous**, not one-off — re-run on every model/prompt change; add discovered attacks to the eval/guardrail suite.
- Output: a prioritised list of vulnerabilities, fixes (guardrails, least privilege, filtering), and regression tests so they stay fixed.

:::interview
What's really being tested: that you probe jailbreaks + injection (incl. indirect) + leakage + action abuse, use automated tools *and* humans, and feed findings back into continuous guardrail/eval coverage.
:::

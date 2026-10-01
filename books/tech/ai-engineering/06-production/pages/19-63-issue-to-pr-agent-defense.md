## Issue-to-PR agent: reliability and defense

- Running an agent against real repos and issues adds failure modes a demo never sees, and the design is mostly about handling them safely.

| Failure | Response |
|---|---|
| issue is vague / underspecified | ask a clarifying comment, or decline — don't guess a PR |
| fix passes tests but is wrong | tests are necessary not sufficient; human review is the gate |
| flaky tests | retry; flag flakiness rather than chasing a phantom |
| no test coverage for the bug | agent writes a failing test first (repro), then fixes |
| malicious issue (prompt injection) | treat issue text as untrusted; least-privilege repo access |
| huge repo | retrieve, don't stuff; scope edits to relevant files |

- **Reproduce before fixing.** The strongest pattern is to have the agent first write a *failing test* that reproduces the issue, then make it pass — so "done" is objectively defined and the fix is proven against a concrete repro, not against the agent's interpretation of prose.
- **Least-privilege on the repo.** The agent gets branch-write and PR-open, never merge or force-push, and the issue text is *untrusted input* (an attacker can file an issue) — so an injection in an issue can't escalate to arbitrary repo actions (Module 18's trifecta at the workflow layer).

:::interview
"How do you keep an issue-to-PR agent from shipping bad code?"

Layered verification with a human at the end. **Reproduce-first**: write a failing test that captures the issue, then fix until it passes — objective done-ness. **Test gate**: no green suite, no PR. **Human review**: the agent opens a PR, never merges — tests are necessary but not sufficient, so a person approves the actual change (propose-then-commit). **Least privilege**: branch-write only, and treat the issue text as untrusted since anyone can file one (injection). And it should **decline** vague issues rather than guess. The framing — the agent proposes a *proven, reviewable* change and a human commits it — is what makes autonomous bug-fixing safe to run.
:::

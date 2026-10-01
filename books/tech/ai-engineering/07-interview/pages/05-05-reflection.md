## What is reflection / self-critique in agents, and does it actually help?

- **Reflection** has the agent review its own output or trajectory and revise — "critique this answer, then improve it," or after a failed attempt, analyse why and retry (Reflexion).
- It helps when there's a **signal to reflect on**: test results, a verifier, error messages, or a checkable rubric. A coding agent that reads the failing test and fixes the bug is reflection working well.
- It helps **less** on pure open-ended reasoning with no external feedback — the model critiquing itself with the same knowledge that produced the error often just rationalises, and can even talk itself out of a correct answer.
- Practical rule: reflection pays off when paired with **external grounding** (tests, tools, a separate judge/model), not when the model grades its own homework with no new information.

:::interview
What's really being tested: that reflection works with an external feedback signal (tests/verifier) but is weak as pure self-grading — the nuance that separates hype from practice.
:::

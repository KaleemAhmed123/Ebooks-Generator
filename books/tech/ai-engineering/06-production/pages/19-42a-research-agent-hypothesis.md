## Research agent: hypothesis generation

- The research loop (Flagship 5) is only as good as the hypotheses it tests — a bad hypothesis wastes the whole expensive cycle (retrieve, experiment, evaluate). Generating *good, testable* hypotheses is the loop's most creative and most error-prone step.

:::mint
```python
def generate_hypothesis(state):
    return llm(
        f"Question: {state['question']}\n"
        f"What we've learned so far: {summarize(state['findings'])}\n\n"
        f"Propose the NEXT hypothesis to test. It must be:\n"
        f"1. TESTABLE with our tools (code execution, retrieval)\n"
        f"2. NOVEL — not already answered by prior findings\n"
        f"3. INFORMATIVE — its result narrows the question either way\n"
        f"Return the hypothesis and the experiment that would test it.")
```
:::

- **A good hypothesis is testable, novel, and informative.** *Testable* with the agent's actual tools (or it can't be checked — the verification bottleneck, 18-33). *Novel* — not already settled by prior findings (or the loop spins). *Informative* — its result changes the picture *either way* (a hypothesis whose outcome tells you nothing is wasted compute). The prompt encodes these constraints explicitly.
- **Grounding in prior findings prevents drift.** Feeding the summarized findings back in makes each hypothesis *build* on what's learned rather than restart — the loop converges instead of wandering. This is why the state carries the findings, and why the critic (Flagship 5) can redirect when hypotheses stop being productive.

:::note
Hypothesis generation is where the research agent's *value* and its *risk* both concentrate. A well-posed, testable hypothesis makes the whole loop productive; a vague or untestable one burns a full cycle for nothing, and a subtly-wrong one sends the loop confidently down a dead end. This mirrors the science it automates — asking the right question is harder than answering it — and it's why the human-in-the-loop and critic gates matter most here: the loop's autonomy is bounded by its ability to pose good questions and verify their answers, which is exactly the ceiling Module 18's self-improvement frontier (15/18) identified.
:::

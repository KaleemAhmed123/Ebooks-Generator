## Research agent: the critic loop and defense

- The **critic** is what keeps a long autonomous loop honest. After each iteration it judges the work against explicit criteria and decides: continue, stop (done or hopeless), or redirect (the hypothesis was wrong, try a different angle).

:::mint
```python
def critic(state):
    last = state["findings"][-1]
    review = judge_llm(
        f"Question: {state['question']}\n"
        f"Hypothesis: {last['hyp']}\nResult: {last['result']}\n\n"
        f"Assess: is the result VALID (sound method, supported by data)? "
        f"Is the question ANSWERED? Should we STOP, CONTINUE, or REDIRECT? "
        f"Flag any unsupported claim or methodological flaw.")
    return parse_verdict(review)     # {stop: bool, redirect: bool, notes, tokens}
```
:::

- **The critic is a separate role, not the same model rubber-stamping itself.** Booklet 5's lesson: an agent is a poor judge of its own work, so the critic uses a fresh context (and ideally a different prompt or model) to catch the flaws the generator is blind to — an unsupported claim, a broken experiment, a hypothesis the data doesn't back.
- **The verification bottleneck** (Module 18's self-improvement ceiling) shows up here concretely: the loop can only improve as fast as the critic can *reliably* tell good work from bad. If the critic can't verify a domain, autonomous research in that domain stalls — you cannot self-improve past what you can check.

:::interview
"What stops an autonomous research agent from producing confident nonsense?"

The critic gate, and the honesty of what it can verify. Each iteration is judged by a **separate critic role** (fresh context, not the generator grading itself) against explicit validity criteria — sound method, claims supported by data — with authority to **stop or redirect**, not just continue. Around it: a **token budget** so it can't spend forever, **checkpointing** for long runs, and a **sandbox** for experiment code. The deeper limit to name is the **verification bottleneck** — the loop improves only as fast as the critic can reliably check work, so in domains where verification is hard, autonomy is inherently capped. That honesty about the ceiling is the senior signal, not a claim that the agent "does research."
:::

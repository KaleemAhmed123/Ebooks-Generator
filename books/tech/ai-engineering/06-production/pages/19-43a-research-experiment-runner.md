## Research agent: the experiment runner

- The research loop's (Flagship 5) most dangerous component is the **experiment runner** — it writes and executes code to test a hypothesis, which is both the agent's core capability and its biggest risk. It must be powerful *and* contained.

:::mint
```python
def run_experiment(hypothesis, budget_s=300):
    code = generate_experiment_code(hypothesis)      # agent writes the test
    result = sandbox_execute(                          # isolated, no network
        code,
        timeout=budget_s,                              # can't run forever
        no_network=True,                               # can't exfiltrate/call out
        fs_readonly_except=["/tmp/exp"],               # scoped writes only
        mem_limit="8GB")
    if result.timed_out or result.crashed:
        return {"status": "failed", "logs": result.logs}   # feed back, don't retry blindly
    return {"status": "ok", "data": result.output, "code": code}  # keep code for reproducibility
```
:::

- **Sandbox with hard limits** (Flagship 4): no network (an experiment can't exfiltrate data or make external calls — the trifecta defense, Module 18), scoped filesystem writes, a memory cap, and a wall-clock timeout so a runaway or infinite experiment is killed. The runner is the highest-privilege action the research agent takes, so it gets the tightest containment.
- **Reproducibility is built in.** Every experiment keeps its *generated code* and its result, so a finding can be re-run and audited — essential when the agent's conclusions feed a paper (Flagship 5) that a human will trust. An experiment you can't reproduce is a claim, not a result.

:::note
The experiment runner crystallises the whole research-agent safety story: the capability that makes autonomous research *possible* (writing and running arbitrary code to test ideas) is exactly the capability that makes it *dangerous* (arbitrary code execution with the agent's access). The resolution is containment, not restriction — let it write and run whatever code it needs, but in a sandbox where the worst outcome is a crashed throwaway environment, with reproducible artifacts so a human can verify. It's Module 18's AI-control philosophy — assume the code might be wrong or hostile, and design so that's survivable — applied to the one component that can actually do damage.
:::

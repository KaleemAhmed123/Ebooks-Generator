## Research agent: the pipeline

- Orchestrate the stages as a loop where each produces a typed artefact the next consumes, checkpointed so a long run survives interruption (durable execution, 17-17).

:::mint
```python
def research_loop(question, max_iters=5, budget_tokens=200_000):
    state = {"question": question, "findings": [], "spent": 0}
    for i in range(max_iters):
        hyp     = generate_hypothesis(state)              # what to test next
        papers  = retrieve_literature(hyp)                # RAG over corpus
        result  = run_experiment(hyp, papers)             # sandboxed code
        score   = evaluate(result, hyp)                   # did it support hyp?
        state["findings"].append({"hyp": hyp, "result": result, "score": score})
        checkpoint(state)                                 # resumable
        verdict = critic(state)                           # continue / stop / redirect
        state["spent"] += verdict["tokens"]
        if verdict["stop"] or state["spent"] > budget_tokens:
            break
    return write_report(state)
```
:::

- **Typed artefacts between stages** keep the pipeline debuggable: a hypothesis is a structured object, an experiment result carries its data and code, a finding bundles them with a score. When the loop goes wrong, you can see *which artefact* was bad, not just that the final report is off.
- **The experiment runner is Flagship 4's sandbox** — the agent writes and runs code to test its hypothesis in an isolated, no-network environment with a timeout, so a runaway or malicious experiment is contained. The retriever is Flagship 3's RAG over a paper corpus. The flagships compose.

:::note
Notice what makes this *safe* to run autonomously: a **token budget** (a research loop can spend unboundedly — cap it), **checkpointing** (hours-long runs must resume, not restart), a **sandbox** for the experiment code, and — the crux — a **critic gate** deciding whether each iteration was worth continuing. Strip those out and you have an expensive random walk. This is Booklet 5's autonomy-ladder lesson in code: capability without governors is not a feature, it is an incident waiting to bill you.
:::

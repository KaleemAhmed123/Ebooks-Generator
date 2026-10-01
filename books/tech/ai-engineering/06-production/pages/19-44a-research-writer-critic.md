## Research agent: writer and critic

- The research loop (Flagship 5) ends by *writing up* findings and *critiquing* them. These two roles are where hallucination is most dangerous — a fabricated result in a paper a human trusts — so they're built around grounding and separation.

:::mint
```python
def write_report(state):
    # ground every claim in a specific finding — no un-sourced assertions
    report = writer_llm(
        f"Write a report answering: {state['question']}\n"
        f"Use ONLY these findings, cite each claim by finding-id:\n{state['findings']}")
    # critic verifies each cited claim is actually supported by its finding
    audit = critic_llm(
        f"For each claim in this report, is it supported by the cited finding? "
        f"List any UNSUPPORTED or MISCITED claim.\n{report}\n{state['findings']}")
    if audit.has_problems:
        report = writer_llm.revise(report, audit.problems)   # fix, don't publish
    return report
```
:::

- **Grounding forces citation.** The writer may use *only* the loop's actual findings and must cite each claim to a finding-id — the RAG faithfulness discipline (19-35) applied to the agent's own results. A claim with no supporting finding is a hallucination, and the structure makes it visible.
- **The critic verifies citations, not vibes.** A separate critic role (fresh context, Flagship 5) checks that each cited claim is *actually supported* by the finding it points to — catching miscitations and unsupported leaps the writer is blind to. Only a citation-audited report is returned.

:::note
The writer-critic pair is the research agent's last line against confident fabrication, and it mirrors the whole booklet's stance: don't trust the model to be honest, *structure the task so dishonesty is caught*. Grounding every claim in a specific finding, forcing citations, and having a separate critic verify those citations converts "the agent wrote a plausible report" into "the agent wrote a report whose every claim traces to a verified result." For any agent whose output a human will *act on* — a research summary, a code review, a diagnosis — this grounded-and-audited pattern is what makes the output trustworthy rather than merely fluent.
:::

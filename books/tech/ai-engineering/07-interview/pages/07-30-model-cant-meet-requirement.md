## "The model just can't hit the required quality. What do you do?"

- **What they're screening for:** resourcefulness and honesty when the straightforward approach fails — common in AI, where some bars aren't reachable yet.
- **A strong answer shows a ladder of moves before giving up:**
  - **Diagnose the gap** — error analysis: is it retrieval, prompt, data, model capability, or an unrealistic bar? Fix the actual bottleneck.
  - **Try the cheaper levers first** — better prompting/few-shot, RAG for missing knowledge, re-ranking, decomposition, a better model, then fine-tuning.
  - **Reshape the problem** — narrow the scope, add a human in the loop for the hard fraction, change the UX so an imperfect model is still useful (suggestions users confirm).
  - **Re-negotiate the requirement** — if the bar is genuinely unreachable, say so with evidence and propose an achievable scope rather than quietly shipping something that fails.
- **Honesty is the senior move:** "here's what's achievable and what isn't, with data" beats forcing a model past its limit or hiding the gap.

:::warn
Weak: keep tweaking forever, or ship something that misses the bar silently. Strong: diagnose the bottleneck, climb the lever ladder, reshape with human-in-the-loop/scope, and renegotiate the bar honestly if truly unreachable.
:::

:::interview
What's really being tested: resourcefulness (a diagnosis-driven ladder of fixes incl. reshaping the problem) plus the honesty to renegotiate an unreachable requirement with evidence.
:::

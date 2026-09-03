## Self-Consistency

Sampling several independent answers and taking the majority. It raises accuracy
on reasoning tasks at a multiple of the cost.

Five samples with majority voting lifted accuracy on a multi-step task from 71%
to 84%, for five times the tokens. Worth it for high-stakes work, wasteful for
classification.

### How it works

Sampling above temperature 0 means the same prompt can produce different
answers. Self-consistency turns that into a signal rather than a nuisance.

Generate several independent answers, then take the majority. On multi-step
reasoning this improves accuracy meaningfully, because **there are many ways to
reason incorrectly and comparatively few ways to reason correctly** — errors
scatter while correct answers converge on each other.

The cost is linear in the number of samples. Five samples is five times the
tokens and, unless parallelised, five times the latency.

That makes it a poor default and a good tool for a specific situation:
high-stakes decisions, low volume, and cases where being wrong costs
considerably more than the extra tokens do.

### In practice

**The disagreement is valuable independently of the vote.**

If five samples produce five different answers, the model is uncertain in a way
no confidence score reported. That is a strong signal to abstain or escalate —
not to pick the plurality and present it with the same confidence as a unanimous
result.

Use the spread as an uncertainty measure, not merely as a way to choose. It is
one of the few genuinely honest uncertainty signals available.

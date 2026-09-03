## Shadow Deployment for Models

Running a candidate model on mirrored production traffic without serving its
output, then comparing against the live one.

Two weeks of shadowed traffic showed the candidate matched on 94% of outputs and
was better on the disagreements — evidence no offline evaluation could have
produced.

### How it works

Offline evaluation runs a fixed dataset. Real traffic is messier: inputs you did
not anticipate, distributions your set does not represent, edge cases nobody
thought to write down.

Shadow deployment mirrors live requests to a candidate model while the current
one keeps serving users. The candidate's output is logged and discarded, never
shown to anyone.

You get evidence from real traffic at zero user risk, and you can compare outputs
on **identical inputs** — which offline evaluation cannot give you, because it
cannot contain the requests you did not know to include.

**The essential precaution is side effects.** If the candidate path can call
tools that send, write or charge, then mirroring the traffic mirrors the
actions. Everything with an external effect has to be stubbed before a single
request is shadowed.

### In practice

**Focus the review on disagreements, not the aggregate.**

If the candidate matches the current model on 94% of requests, those tell you
nothing at all. The 6% where they differ is the entire signal.

Reading a sample of those is usually a faster and far more convincing decision
than any summary statistic — you can see whether the new model is better or
merely different, which no percentage will tell you.

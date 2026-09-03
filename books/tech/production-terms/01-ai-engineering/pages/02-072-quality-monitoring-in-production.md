## Quality Monitoring in Production

Watching quality signals continuously, not only at deploy. Model behaviour, user
input and retrieved data all shift underneath a system nobody changed.

A weekly automated eval on a sampled slice of live traffic caught a six-point
drop three days after an upstream index change that no deploy accompanied.

### How it works

Standard monitoring tells you the system is up and responding. For an AI feature
that is necessary and nowhere near sufficient — it can be fast, error-free, and
producing worse answers every week.

**The useful quality signals are mostly free**, in that you are already
generating them:

| Signal | Rises when |
|---|---|
| Abstention and refusal rate | retrieval or scope is degrading |
| Retry rate | users are not getting what they asked for |
| Schema repair rate | model behaviour shifted |
| Escalation to human support | the product is failing quietly |
| Groundedness on a sample | answers are drifting off the sources |

Add a scheduled evaluation run on a slice of live traffic for a directly
comparable number.

**The reason this matters more than for conventional services is that AI systems
degrade without deploys.** A provider update, a corpus change or a shift in user
behaviour moves quality with nothing changing on your side.

### In practice

**Alert on trends, not on individual outputs.** One bad answer is noise. A
groundedness score declining across ten days is a signal.

Set the window in days for slow-moving quality metrics, and keep fast alerting
for the operational signals — latency, errors, cost rate — where a spike
genuinely is an incident happening now.

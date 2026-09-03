## Cost per Successful Task

Total spend divided by tasks actually completed, not by requests made. Retries,
rejections and abandoned sessions are real money that per-request pricing hides.

Per-request cost looked fine until retries and abandonment were counted. The
true cost per completed extraction was more than twice the headline figure.

### How it works

Cost per request is the number that is easy to measure and the wrong one to
manage. Real usage includes a great deal of work that produced nothing:
validation failures that retried, outputs the user rejected and regenerated,
sessions abandoned halfway, agent runs that hit a cap without finishing.

All of it was billed. None of it delivered anything.

Dividing total spend by tasks that actually completed gives a number that can be
double the per-request figure, and the gap between the two is where the real
optimisation lives.

**The reframing changes what you work on.** Raising success rate from 70% to 85%
cuts cost per outcome by roughly 18% without touching prompts, models or
infrastructure — and it improves the product while doing so, which switching to
a cheaper model does not.

### In practice

Include human cost wherever a review step exists. If 15% of documents need a
minute of someone's attention, that labour usually dwarfs the inference spend
entirely.

| Counted | Missed if you only measure per-request |
|---|---|
| Retries after validation failure | billed, delivered nothing |
| Regenerations after rejection | billed twice for one outcome |
| Abandoned sessions | billed, no outcome at all |
| Human review minutes | often the largest line of all |

Counting only the API bill leads teams to spend months optimising the smaller
number.

## Right-Sizing

Matching instance and container sizes to measured utilisation rather than to the
guess made at provisioning time. AWS Compute Optimizer reads the last 14 days of
CloudWatch metrics — 93 days on the paid enhanced setting — and labels each
resource over-provisioned, under-provisioned or optimised.

For EC2 it sees CPU, network and disk. Memory utilisation is not a default
CloudWatch metric, so unless you ship the agent or feed in an external source,
the recommendation was made without knowing how much memory the workload uses.

**Mean CPU is the wrong statistic.** A box at 8% average that hits 90% for four
minutes during the nightly batch is correctly sized for those four minutes, and
every tool reading averages will tell you to halve it.

## Sampling vs Instrumentation Profiling

Sampling interrupts on a timer and records the stack. Instrumentation adds a
hook at every function entry and exit and counts exactly.

| | Cost | Blind spot |
|---|---|---|
| Sampling | fixed, set by the rate | anything rarer than the rate |
| Instrumentation | grows with call count | none — it distorts the timing instead |

Go's CPU profiler samples at 100 Hz, which its own source calls "frequent enough
to produce useful data, rare enough not to bog down the system".

**Instrumentation makes small functions look expensive.** The hook costs more
than the body, so the profile blames the tightest loop in the program.

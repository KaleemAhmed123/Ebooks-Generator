## Eval Drift

Quality degrading over time with no change on your side, because the upstream
model, your data or your users moved.

Accuracy was 91% at launch. Six weeks later, with no deploys, it is 78% — the
provider updated the model and the prompt no longer fits it.

### How it works

Drift is your quality falling while your code stays exactly the same. Three
things move underneath you:

| What moved | How it shows up |
|---|---|
| The provider updated an unpinned model | behaviour changes overnight, no deploy |
| Users ask different things as the product grows | the prompt fits yesterday's traffic |
| Your corpus grows, changes format, gets noisier | retrieval quietly gets worse |

None of these produce an error. There is no failed deploy, no exception, no
alert. The system keeps returning fluent answers that are slowly getting worse,
and nobody notices until support volume rises enough to be visible from outside
the team.

The defence has two halves: pin model versions, so at least one variable is
under your control, and run your evaluation on a **schedule** rather than only
on deploy.

### In practice

Scheduled evaluation is the half teams skip, because running evals in CI feels
sufficient. It is not — the entire point of drift is that nothing changed on
your side, so nothing triggered CI.

A weekly automated run against the golden set, with results tracked over time,
is what turns a slow invisible decline into a dated line on a graph. That line
is also the only artefact that will convince anyone the problem is real.

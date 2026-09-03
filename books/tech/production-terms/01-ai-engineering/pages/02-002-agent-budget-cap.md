## Agent Budget Cap

Hard ceilings on steps, tokens, wall time and spend for a single agent run.
Without them, a confused loop is unbounded.

An agent stuck retrying a failing tool ran 340 steps before anyone noticed. A
cap of 25 steps turns that into a clean, alertable failure instead of a bill.

### How it works

An agent decides its own next step, which means it decides how long it runs.
Unbounded, a confused agent does not stop — it keeps taking locally reasonable
actions that make no overall progress.

The usual shape: a tool returns an error the model reads as transient, so it
retries. The retry fails identically. Every individual decision looks sensible
in isolation, and the run continues until something external ends it.

Caps make termination external rather than depending on the model recognising
futility, which is not something it is good at. Bound steps, total tokens,
wall-clock time and spend per run, and stop on whichever trips first.

Loop detection belongs alongside them. The same tool called with the same
arguments three times means no progress is being made, whatever budget remains.

### In practice

When a cap trips, return the partial result with an explanation. "I completed
three of five steps and then stopped" is something a user can act on. A spinner
that never resolves teaches them the feature is broken.

| Bound | Catches |
|---|---|
| max steps | wandering without progress |
| max tokens | context growth per step |
| max wall time | a hung tool call |
| max spend | all of the above, in the only unit finance reads |
| loop detection | same tool, same arguments, three times |

Alert on the trip **rate**, not on individual trips. A rising rate almost always
means a broken tool rather than a run of hard tasks.

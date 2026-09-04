## Abstention Policy

*escalation*

The system declines to answer and hands off, instead of assembling a confident
guess from training memory. Four triggers fire it: retrieval returned nothing
above the similarity floor, the request falls outside what the corpus covers, a
required field failed validation, or a groundedness check found claims the
context does not support.

Declining has to route somewhere. "I don't have that" is a dead end; "I don't
have that — here is how to reach support" is a product. Track the abstention
rate with bounds on both sides: too low and the system is answering things it
should not, too high and people stop asking.

**Instruction-tuned models are shaped to be helpful, and not-knowing is not a
state they naturally express.** So abstention has to be a path your code takes,
not an outcome you hope the model chooses.

## Agent Budget Cap

Hard ceilings on steps, tokens, wall-clock time and spend for a single agent
run, stopping on whichever trips first. Loop detection belongs beside them: the
same tool called with the same arguments three times means no progress is being
made, whatever budget remains.

Caps make termination external. A confused agent does not stop on its own — a
tool returns an error it reads as transient, the retry fails identically, and
every individual decision looks reasonable while the run makes none.

**Alert on the trip rate, not on individual trips.** A rising rate almost always
means a broken tool rather than a run of hard tasks. And when a cap trips,
return the partial result: "three of five steps, then stopped" is something a
user can act on, where a spinner that never resolves teaches them the feature is
broken.

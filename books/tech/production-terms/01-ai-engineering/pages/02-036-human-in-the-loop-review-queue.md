## Human-in-the-Loop Review Queue

Routing low-confidence extractions to people, and feeding their corrections back
as labelled data.

15% of documents route to review. Corrections become training examples, and the
review rate falls over time as the system improves on its real failures.

### How it works

No extraction pipeline reaches 100%, so the question is not whether humans are
involved but how efficiently.

A review queue routes low-confidence or validation-failing extractions to people
while everything else passes automatically. That single split is what makes the
economics work: if 85% auto-processes, human effort applies to the remaining
fifteen rather than to everything.

**The detail that decides throughput is what the reviewer sees.** A form of
extracted values forces them to read the whole document to verify it. The same
values with each one highlighted on the page image lets them confirm at a
glance.

That difference is roughly an order of magnitude in review time, which is
usually the difference between a queue that keeps up and a queue that grows
until someone declares the project a failure.

### In practice

Corrections are training data, and capturing them closes the loop — today's
review population becomes tomorrow's improvement.

**Track the review rate as a headline metric.** If it is not falling, the loop
is not actually connected, and what you have built is a permanent manual process
wearing an automation label. That distinction is invisible from the accuracy
dashboard and obvious from the trend line.

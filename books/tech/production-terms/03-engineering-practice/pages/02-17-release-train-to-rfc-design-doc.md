## Release Train

Shipping on a fixed cadence. What is ready when the window opens departs; what
is not waits for the next one. The Scaled Agile Framework's Agile Release Train is the formal version:
50 to 125 people delivering inside a Planning Interval, "a timebox of 8-12
weeks".

**Cadence caps lead time, it does not reduce it.** A change finished the day
after a departure sits, complete and unmerged, for the entire interval — on an
eight-week train that is two months of shelf life on code that was done, and
every hour of it widens the gap between the branch and what it will merge into.

## Resource Saturation

From Brendan Gregg's USE method, which pairs it with utilisation and errors.
Saturation is "the degree to which the resource has extra work which it can't
service, often queued".

Saturation is the one that predicts latency. Utilisation at 70% says nothing
about the queue; run-queue depth, pool wait time and buffer occupancy do.

**Averaging hides the bursts that built your p99.** Gregg's own warning: 70%
utilisation measured over a minute can be short bursts of 100%, and the queue
formed inside those bursts.

## RFC / Design Doc

A written proposal circulated before implementation, so the argument happens
while it is still cheap. Rust's process names the threshold explicitly: an RFC
is required for "substantial" changes — any semantic or syntactic language
change that is not a bugfix, removing features, large additions to the standard
library — while refactors and objective quality improvements go straight to a
pull request.

IETF RFCs are archival. A published document is never edited; a revision is a
new number that obsoletes the old one.

**A design doc that arrives with the branch already pushed is a review request
in costume.** Every comment will be about naming, because everything expensive
is already load-bearing.

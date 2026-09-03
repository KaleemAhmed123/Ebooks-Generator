# Reliability & Observability

## How to read this booklet

Forty-nine terms, alphabetical. Each one gets three things and nothing else:
what it means, where it bites, and a picture when a picture is faster than a
sentence.

The contents page lists every term with its page number. That is the point of
the book — you half-remember a phrase from a postmortem, you look it up, you
have the real meaning in twenty seconds.

### What counts as a term here

A term earned its place if it would be said out loud during an incident, in the
review afterwards, or by an interviewer probing how you handle failure.

Two halves run through the list, interleaved because the alphabet does not care
about categories. The reliability terms are about staying up and failing well.
The observability terms are about knowing which of the two you are currently
doing.

### What is deliberately not here

Tooling instructions. No PromQL tutorial, no OpenTelemetry walkthrough, no
Grafana configuration. Where a query shape appears it is because the shape is
the idea — averaging percentiles is wrong for a reason worth one line.

Teaching, too. This booklet does not explain how to build a rate limiter. It
tells you what someone means by *token bucket*, and what goes wrong when they
get it wrong.

Overlap with the other booklets is intentional. Idempotency is here because you
will meet it at 3am, and there because you have to build it.

## Regression Suite for Prompts

A set of cases that previously broke and must never break again. It grows from
real incidents rather than being written up front.

Every production bug becomes a test case. Six months in, the suite is 180 cases
and it catches the reintroduction of an old failure before anyone sees it.

### How it works

A golden set measures general quality. A regression suite is narrower and, in
day-to-day work, more valuable: it is the set of things that have already broken
once.

**It grows from incidents rather than being designed.** Every production bug —
a malformed output, a wrong classification, a hallucinated field, a jailbreak
that worked — gets reduced to a minimal reproducing case and added.

Six months in it is a couple of hundred cases, and it encodes everything the
team learned the hard way. New engineers inherit that knowledge automatically,
because the suite fails when they reintroduce an old mistake they were never
told about.

**Its value is specifically catching reintroduction.** Fixing a bug in a prompt
is easy. Keeping it fixed through fifty subsequent prompt edits is what the
suite does, and nothing else does it.

### In practice

Keep every case tied to the incident it came from — a link, a date, one line of
context.

Two years on, someone will find a case that appears to assert something
arbitrary and will be tempted to delete it. **The link is what stops them**, and
the case that looks arbitrary is almost always the one guarding something
subtle that nobody has thought about since.

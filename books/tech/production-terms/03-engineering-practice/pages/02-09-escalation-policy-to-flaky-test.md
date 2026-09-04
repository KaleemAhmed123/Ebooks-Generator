## Escalation Policy

The ordered rules deciding who is notified next when a page goes unacknowledged.
PagerDuty's default escalation timeout is 30 minutes, adjustable per rule, and a
policy can repeat its rules up to nine times. Their own on-call guidance is far
tighter — escalate to the team within five minutes, with the individual
notification timeouts staggered under that.

**The policy is only as good as its last rule.** Once the repeats are exhausted
the incident stays assigned to the final responder and stops notifying
altogether, so a page that escalated all the way through looks exactly like a
page nobody ever sent.

## Fixture vs Factory

Two ways to get test data. A fixture is a fixed starting state shared by many
tests — a seeded database, a checked-in file, a pytest fixture with a scope. A
factory builds a fresh object per test from defaults the test overrides.

| | Fixture | Factory |
|---|---|---|
| State | pre-built, shared | built per test |
| Test reads | whatever is in it | what it asked for |
| Breaks when | someone edits it | rarely |

**pytest's scopes are where this bites.** A `session`-scoped fixture is created
once and then mutated by every test that touches it, so nobody dares change the seeded
row that forty other tests quietly depend on.

## Flaky Test

A test that passes and fails on the same code. Google's analysis of its roughly
4.2 million continuously-run tests found flakiness rising with test size — the
larger the binary, the more likely one run disagrees with the last.

The causes cluster: state shared between tests, real time, real network, and
concurrency that happens to interleave differently.

**The damage is not the failed run, it is the retry button.** Once re-running is
the normal response to red, every genuine failure gets one free pass before
anyone reads it.

## Showback vs Chargeback

Two ways of returning allocated cost to the teams that caused it. Showback
reports the number for visibility. Chargeback posts it against the business
unit's budget in the finance system.

The FinOps Foundation is explicit that the difference is formality, not
maturity: showback is required in any practice, chargeback depends on the
organisation's accounting policy, and neither is the more advanced choice.

**Chargeback converts allocation errors into finance disputes.** A misattributed
shared cost under showback is an awkward conversation; under chargeback it is a
journal entry somebody has to reverse. Do not switch until unallocated spend is
small and the shared-cost split is agreed in writing.

## Smoke Test

A short set of checks that the build is worth testing further: the process
boots, the health endpoint answers, a login succeeds, one write lands.

It runs first and it fails early. Finding a missing environment variable after
forty minutes of end-to-end tests is forty minutes spent proving something
already known.

**A smoke test that grows stops being one.** Its whole value is finishing in
under a minute; at ten minutes it is the first slow suite, and nobody gets
the early answer any more.

## Snapshot Test

Serialising output and committing the result, so later runs diff against it. Jest
writes the file on first run; `jest -u` regenerates every failing one.

Jest's own documentation says the artefact "should be committed alongside code
changes, and reviewed as part of your code review process", and names the habit
it is fighting: "regenerating snapshots when test suites fail instead of
examining the root causes of their failure".

**A snapshot too large to read is not a test, it is a receipt.** Two hundred
lines of rendered markup, and no reviewer can separate an intended class change
from a deleted button.

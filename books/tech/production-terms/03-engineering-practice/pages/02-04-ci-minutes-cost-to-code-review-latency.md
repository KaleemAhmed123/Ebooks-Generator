## CI Minutes Cost

Continuous integration billed by the runner-minute, at a rate set by the
runner's operating system. The gap between those rates is the whole cost story.

GitHub-hosted runners, list price as of 2026: a Linux 2-core minute is $0.006, a
Windows 2-core minute $0.010, a macOS minute $0.062 — about ten Linux minutes
for one macOS minute. Public repositories pay nothing on standard runners;
private ones get 2,000 included minutes on Free, 3,000 on Team.

**The bill is set by the matrix, not by the test suite.** Four operating systems
across three language versions is twelve jobs for one push, and the macOS legs
alone can outweigh every Linux leg combined. Shrink the matrix before you
optimise a single test.

## Code Review Latency

Time from review request to first response, not to approval. Google's public
engineering practices set the ceiling at one business day, and expect a reviewer
who is not in deep focus to answer sooner.

The cost is in the rounds, not the round: features and fixes "are delayed by
days, weeks, or months as each CL waits for review and re-review."

| Round | Google's maximum | Elapsed |
|---|---|---|
| first response | 1 business day | 1 day |
| re-review after changes | 1 business day | 2 days |
| final approval | 1 business day | 3 days |

**Measure the tail, not the median.** A two-hour median with a three-day 95th
percentile is a team that reviews typo fixes instantly and hard changes last.

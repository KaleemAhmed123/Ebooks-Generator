## Offline vs Online Evaluation

Offline scores a fixed dataset before shipping. Online measures real user
outcomes after. Offline gates the deploy; online tells you the truth.

Offline accuracy rose four points and online thumbs-up fell. The golden set did
not contain the messy queries users actually send — a sampling problem, not a
model one.

### How it works

**Offline evaluation** runs a fixed dataset before you ship. Fast, repeatable,
and cheap enough to run on every change, which is exactly what makes it usable
as a deployment gate.

**Online evaluation** measures what happens with real users afterwards: did they
accept the answer, retry, escalate, complete the task. Slower, noisier, and the
only thing measuring the outcome you actually care about.

They disagree more often than you would expect, and the disagreement is
informative rather than irritating:

| Pattern | Usually means |
|---|---|
| Offline up, online down | your dataset does not represent real traffic |
| Offline flat, online up | your scoring misses something users notice — tone, brevity |

The first is the common one. You optimised for the cases you collected, and the
cases you collected were the tidy ones.

### In practice

The fix for a diverging dataset is to **resample from production regularly**
rather than treating the golden set as permanent.

Real usage shifts as the product grows, and a dataset built at launch describes
a user population that no longer exists. Refresh a portion on a schedule while
keeping the historical cases as regression tests — you want the set to track
reality without losing the failures you have already fixed.

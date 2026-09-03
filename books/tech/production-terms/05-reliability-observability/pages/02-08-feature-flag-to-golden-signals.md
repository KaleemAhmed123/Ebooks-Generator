## Feature Flag

Turning behaviour on and off without a deploy. It separates shipping the code
from exposing it.

A new summarisation feature ships with the flag off, goes on for the internal
team, then 10%, then everyone. No deployment at any step, and the kill switch is
the same flip backwards.

Flags accumulate, and each one doubles the number of configurations nobody has
tested. The flag that breaks production is usually one somebody forgot to delete
two years ago.

## Forward-Only Migration

Schema changes do not roll back with the code, so every change has to leave old
and new versions both able to run.

| Release | Change |
|---|---|
| 1 | add the new column, write both |
| 2 | read the new one, stop writing the old |
| 3 | confirm no reads, then drop the old |

Dropping a column in the same release that stops using it makes rollback
impossible the moment it ships. Expand, migrate, contract — three deploys, and
the only sequence that is safe to reverse at any point in it.

## Golden Signals

Google's four graphs for any service. If a service gets four panels, these are
the four.

| Signal | The question |
|---|---|
| latency | how slow |
| traffic | how much |
| errors | how broken |
| saturation | how close to the limit |

Saturation is the one teams skip and the one that predicts the next outage. A
queue growing steadily is a failure that has not happened yet.

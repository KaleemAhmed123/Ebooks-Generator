## Spot vs On-Demand vs Reserved

Three ways to buy the same instance, trading flexibility for price.

| Purchase | Discount claimed | What you give up |
|---|---|---|
| On-demand | baseline | nothing |
| Savings Plan / Reserved | up to 72% | 1 or 3 years, no cancellation |
| Spot | up to 90% | the capacity, on two minutes' notice |

Spot reclamation arrives as an interruption notice in instance metadata and on
EventBridge, two minutes ahead, on a best-effort basis. Batch work that
checkpoints resumes; work that does not, restarts from zero. Never put a
stateful primary on spot.

**Spot's real price is the checkpointing you have to write.** A job with a
90-minute uncheckpointed step, reclaimed at minute 85, spent 85 minutes of cheap
compute to produce nothing.

## Storage Class Lifecycle

Rules that move objects to colder, cheaper classes as they age. The saving is on
storage; the cost is in transitions and minimum durations.

| S3 class | Minimum billed duration | Minimum billable size |
|---|---|---|
| Standard-IA, One Zone-IA | 30 days | 128 KB |
| Glacier Instant Retrieval | 90 days | 128 KB |
| Glacier Flexible Retrieval | 90 days | 40 KB overhead |
| Glacier Deep Archive | 180 days | 40 KB overhead |

Every move is a billed transition request. Since September 2024 S3 refuses by
default to transition anything under 128 KB — the request costs more than the
storage it saves.

**Deleting early does not stop the bill.** Remove an object from Deep Archive
after a week and you still pay the remaining 180 days.

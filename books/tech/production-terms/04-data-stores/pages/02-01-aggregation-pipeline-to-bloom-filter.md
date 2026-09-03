## Aggregation Pipeline

Stages that transform documents in sequence. Stage order decides performance —
shrink the set before the expensive work, not after it.

Putting `$match` after `$lookup` joins the entire collection and then throws
most of it away. Moving `$match` first cut a report from 40 seconds to 300
milliseconds.

| Stage | Do it | Why |
|---|---|---|
| `$match` | first | shrinks the set, and can use an index |
| `$project` | early | stops carrying fields nothing reads |
| `$lookup` | late | the join is the expensive part |
| `$group` | after that | operates on the smallest set possible |
| `$sort` | last | needs an index or it hits a 100MB memory cap |

## Bloom Filter

A tiny probabilistic set that answers "definitely not present" or "probably
present". It removes pointless lookups for a fraction of the memory a real set
would need.

Checking whether a URL has been crawled: a Bloom filter over 100 million URLs
fits in roughly 180MB at a 1% false positive rate. The equivalent hash set is
tens of gigabytes.

**False positives happen. False negatives never do.** That asymmetry is the
whole design — a "not present" answer is certain, so the lookup can be skipped
outright, and a "present" answer is a hint that still costs you a real query.

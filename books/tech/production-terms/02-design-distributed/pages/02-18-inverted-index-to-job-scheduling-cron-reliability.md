## Inverted Index

A map from a term to the list of documents containing it. It is what makes
full-text search fast, and the reason a search engine is not a database.

Finding "payment failed" across forty million documents by scanning is not a
plan. An inverted index intersects two posting lists — the documents containing
`payment` and those containing `failed` — and returns in milliseconds.

<svg viewBox="0 0 460 74" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Posting lists for two terms are intersected to give the documents containing both, which are then ranked">
  <text x="4" y="20" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">"payment"</text>
  <text x="80" y="20" font-family="Consolas,monospace" font-size="9" fill="#6b6b6b">[ 3, 91, 402, 5514, ... ]</text>
  <text x="4" y="40" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">"failed"</text>
  <text x="80" y="40" font-family="Consolas,monospace" font-size="9" fill="#6b6b6b">[ 91, 402, 8871, ... ]</text>
  <path d="M240 46 V58 H262" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M262 58 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <text x="150" y="58" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">intersect</text>
  <text x="270" y="61" font-family="Consolas,monospace" font-size="9" fill="#2b5fa8">[ 91, 402 ]</text>
  <text x="342" y="61" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">then rank by relevance</text>
</svg>

Ranking is the second half and the harder one. Retrieving the matching set is
mechanical; deciding which of the two thousand matches goes first is the part
that gets tuned for years.

## Job Scheduling & Cron Reliability

Scheduled work needs the same rigour as request handling. Four questions decide
whether a cron is reliable, and none of them has a default answer.

**What happens on overlap?** A job scheduled every sixty minutes that takes
seventy overlaps itself forever. Either take a lock and skip, or make
concurrency safe on purpose.

**What happens on a missed run?** Catch up, or skip to now. Both are defensible
and only one is right for a given job.

**What happens on multiple instances?** A cron on every replica fires six times.
Leader election or a distributed lock is the answer, not luck.

**How do you know it did not run?** Alerting on failure is easy and insufficient
— a job that never started emits nothing at all. Alert on the absence.

## Writing one

```markdown
# Payout retries

## Problem
A failed payout is marked failed and never retried. Support retries it by hand,
roughly 40 times a week, and occasionally pays a seller twice.

## Goal
Automatically retry a failed payout up to 3 times with backoff, and never pay twice.

## Requirements
1. A payout with a retryable provider error is retried after 5m, 30m, 2h.
2. A non-retryable error (invalid account) is not retried and raises a support task.
3. Retries are idempotent: the provider must never see two charges for one payout.
4. Every attempt is recorded with its error, visible on the payout in admin.
5. After 3 failures the payout moves to `needs_review`.

## Out of scope
- Changing the payout schema beyond adding `attempts` and `next_retry_at`.
- The admin UI. Adding the API field is enough.
- Retrying payouts that failed before this ships.

## Done when
- A forced provider 503 in staging results in exactly one successful payout.
- Tests cover: retryable, non-retryable, exhausted, and duplicate-suppression.
- The runbook names how support handles `needs_review`.

## Open questions
- Which provider error codes count as retryable? (proposed: 429, 5xx, timeout)
```

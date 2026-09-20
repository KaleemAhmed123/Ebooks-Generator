## Designing compensations

- A compensation is **semantic undo**: a new transaction that reverses the business effect, not a restore of the old bytes. Release the hold, refund the charge, mark the order cancelled. It commits in its own right and can itself fail, so it is retried until it succeeds

| Step | Compensation | Notes |
|---|---|---|
| reserve stock | release the reservation | idempotent by key: releasing twice is one release |
| create the order | set status `cancelled` | not `DELETE`: the row is the audit trail |
| charge the card | refund | a second transaction on the provider, with its own idempotency key |
| **dispatch the parcel** | **none** | the **pivot**: after it, only forward recovery |

- A **pivot** is the step with no undo. Order the saga so every step that can fail for business reasons (stock, fraud, funds) runs before the pivot, and every step after it can only fail transiently and is retried forward. Compensatable steps, then the pivot, then retriable steps

### The failure

- A compensation that assumes the step ran. The charge timed out, the saga does not know whether the provider took the money, and the refund runs against nothing, or against a charge that lands a second later. Compensate by the step's idempotency key, and make the provider tell you the charge's state before refunding it

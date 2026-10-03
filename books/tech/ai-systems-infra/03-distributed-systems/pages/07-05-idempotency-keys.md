## Idempotency keys and dedup

- An operation is **idempotent** if doing it twice has the same effect as doing it once. Some are naturally so (`set balance = 100`, `DELETE where id=5`); the dangerous ones are **not** (`balance = balance + 100`, "charge the card", "send the email"). At-least-once delivery (Module 7) *will* re-run those, so you must **make** them idempotent — and the standard tool is an **idempotency key**.
- The mechanism: the caller attaches a **unique key** to each *logical* operation (not each attempt — the same key on every retry). The server, in one atomic step, checks whether it has already processed that key:
  - **unseen** → do the work, **record the key** (with the result), return it.
  - **seen** → skip the work, **return the stored result**.
- A retry therefore collapses onto the first execution: the card is charged once, the second attempt returns the first attempt's receipt. This is precisely how **Stripe's `Idempotency-Key` header** makes a retried payment safe, and how a well-built queue consumer dedupes redelivered messages.

:::lab
Design an idempotent "create payment" endpoint. Client sends `POST /payments` with header `Idempotency-Key: <uuid>` generated **once per logical payment** and reused on every retry. Server: in a single DB transaction, `INSERT` the key into a `processed_keys` table with a unique constraint; if the insert **succeeds**, do the charge and store the result against the key; if it **conflicts** (key exists), return the previously stored response. Now a client that times out and retries 5× charges the customer **once**. Decide your **retention window** (how long keys are kept) and what to return for an in-flight duplicate (409 or wait).
:::

- Two design notes. The key store needs a **retention policy** — keep keys long enough to cover realistic retry windows (hours–days), then expire them so the table doesn't grow forever. And the check-and-record must be **atomic** (a unique constraint or a conditional write), or two concurrent duplicates both see "unseen" and both execute — the very race you're trying to kill.

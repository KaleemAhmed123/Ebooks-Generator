## Idempotent Tool Design

Agents retry. A tool without idempotency turns one retry into two emails, two
refunds or two tickets.

`send_email` called twice because the model never saw the first result sends two
emails. Accepting a deduplication key makes the second call a no-op.

### How it works

Agents retry. The model may not see a tool result, may decide the first attempt
failed, or may simply call the same thing twice while working through a problem.
**This is normal behaviour, not a bug to be eliminated.**

Which means any tool with a side effect will eventually be invoked twice for one
intent. If `send_email` is not idempotent, that is two emails. If
`create_refund` is not, that is two refunds and a conversation with finance.

The fix is the same as for any distributed consumer: accept a key identifying
the intent, record it with the result, and on a repeat return the stored result
without redoing the work.

**The key must identify the intent, not the call.** Generated fresh per attempt,
it defeats the entire purpose — every retry gets a new key and executes again,
and the tool looks idempotent while behaving exactly as it did before.

### In practice

Where a natural key exists, use it: an order ID for a refund, a message ID for a
send, a document ID for an extraction. Where none exists, derive one
deterministically from the arguments so identical calls collapse onto each other.

Return a clear signal on the duplicate path. The agent's trace should show a
deduplicated repeat rather than two apparent successes — otherwise the trace
tells you the tool ran twice and worked twice, which is precisely the wrong
conclusion.

## Strong Consistency

Every read returns the most recently committed write. Always, everywhere. You
pay for it in latency and in availability during a partition.

A ledger balance has to be strongly consistent, because a stale read is how a
user spends the same money twice. That means reads coordinate — going to the
primary, or through a quorum — and both cost round trips.

Worth it for money and inventory. Not worth it for a like count, a view counter,
or anything where being a second out of date has no consequence anyone can
describe.

## Tokenisation

Replacing a sensitive value with a meaningless reference, and keeping the real
value in a separate vault. The point is to shrink the number of systems that are
in scope for compliance.

Storing `tok_9f2c` instead of a card number takes the application out of PCI
scope. Only the vault holds real card data, and only the vault needs the
strictest controls, the tightest access review and the shortest patch window.

The distinction from encryption matters: ciphertext is mathematically related to
the value and a leaked key exposes everything, whereas a token has no
relationship to what it stands for. Compromising the token store yields
meaningless strings.

## Webhook Design

Delivering events to someone else's HTTP endpoint. You have just taken on
retries, ordering, signing, and the certainty that their server will be down at
some point.

A receiver returning 500 for six hours needs backing-off retries, a
dead-letter path and an alert when you finally give up. Signing matters as much:
without an HMAC over the body and a timestamp, the receiver cannot tell your
call from anyone else's, and cannot detect a replay.

Three things receivers always end up asking for, so build them first: an event
ID they can deduplicate on, a delivery log they can inspect themselves, and a
way to replay what they missed while they were down.

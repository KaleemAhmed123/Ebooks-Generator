## Retriable vs terminal failures

- Not every failure deserves a retry. The handler decides at the point of the error, from the kind of error, and the two answers go to two different places

| Failure | Kind | Where it goes |
|---|---|---|
| timeout, connection refused, 503, 429 | transient: the world may change | retry tier (page 1), with backoff |
| serialization failure, deadlock, lock timeout | transient: retry the transaction (booklet 03) | retry, immediately |
| 400, schema validation, unknown event type | terminal: the record is wrong | dead-letter (page 3) now |
| 404 on the entity the event is about | terminal, or a late-arriving create | dead-letter, or a short retry if creates can arrive late |
| 401, 403 | terminal for the whole consumer, not the record | stop the consumer; page |
| unknown exception | unknown | retry once or twice, then dead-letter |

- The classification is the handler's job because only the handler sees the error. A broker sees "not acknowledged" and counts
- Booklet 01's retry rules apply here unchanged: backoff with jitter, a budget, and a check that the operation is safe to repeat before it is repeated (Module 5, page 7)

### The failure

- Retrying a 400 twenty times. The record fails validation in a millisecond, so the twenty attempts cost nothing and the tiers add up to an hour before it is dead-lettered. Meanwhile the log fills with twenty identical stack traces per bad record, and the alert on error rate fires for a problem that was already known on the first attempt

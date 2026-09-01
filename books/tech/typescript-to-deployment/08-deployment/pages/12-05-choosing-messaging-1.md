## Choosing between them

| | SQS | SNS | EventBridge | Amazon MQ | MSK |
|---|---|---|---|---|---|
| Shape | one queue, one consumer group | fanout by topic | routing by content | full broker | log |
| Ordering | FIFO optionally | no | no | yes | per partition |
| Replay | no | no | archive and replay | no | **yes** |
| Retries and DLQ | built in | through SQS | built in | built in | manual |
| Pricing | per request | per request | per event | per hour | per hour |
| Operations | none | none | none | some | more |

### The decision, in four questions

- **One consumer doing work?** SQS with a dead letter queue
- **Several independent consumers of the same event?** SNS fanout into one SQS queue each
- **Routing on the event's contents, or reacting to AWS itself?** EventBridge
- **Need replay, or a routing feature SQS lacks?** MSK or Amazon MQ, and be sure the need is real

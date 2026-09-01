## Queues and brokers are different tools

- Both move work out of the request, and they answer different questions
- A **job queue** is one producer handing specific work to a specific worker. The producer names the queue
- A **message broker** is one producer announcing that something happened. The producer names an exchange, and bindings decide who hears it

| | Job queue, such as BullMQ | Broker, such as RabbitMQ |
|---|---|---|
| Producer knows the consumer | yes, by queue name | no, only the exchange |
| Typical shape | send this email | an order was paid |
| Adding a consumer | change the producer | add a binding |
| Retries and backoff | built in | you build them |
| Scheduling and delays | built in | needs a plugin |
| Inspecting failures | a dashboard | a dead letter queue |

### Choosing

- One service, deferred work, retries that matter: **job queue**
- Several services reacting to the same fact: **broker**
- Both, in the same system, is normal and not a smell

### The naming that clarifies it

- A job is an **instruction**. Send this email
- A message is a **statement of fact**. This order was paid
- An instruction has one correct handler. A fact can have any number, including none

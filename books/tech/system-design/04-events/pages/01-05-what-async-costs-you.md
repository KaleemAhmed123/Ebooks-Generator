## What async costs you

- Introducing a message broker is a massive architectural shift. It gives you temporal decoupling, load levelling, and fan-out. But it takes away the simplicity of a standard function call

| | Synchronous (HTTP) | Asynchronous (Message Broker) |
|---|---|---|
| **Result** | Immediate success or failure (200 OK or 500). | You have no idea if the side effect worked when you return 200 OK to the user. |
| **Consistency** | Strong. Everything happened, or nothing did. | Eventual. The email might arrive 5 hours later. |
| **Duplicates** | Handled mostly by network retries. | Built into the protocol. Consumers **must** be idempotent. |
| **Operations** | Run your stateless app servers. | You now have to run, monitor, and scale a stateful, complex distributed log. |

- Do not introduce a message broker because you read a blog post saying "microservices use Kafka". If your traffic is low and your domains are tightly coupled (e.g., creating a User and their default Settings row), do it synchronously in a database transaction. Use a broker only when you strictly need one of the three benefits from the previous pages

### The failure

- "We went async and now nobody can answer 'did it happen yet?'" When a user clicks "Submit", the frontend used to wait for a 200 OK, and then redirect to a success page. If you move the backend logic to a queue, the frontend gets a 200 OK immediately, but the work hasn't started. The frontend must now poll a status endpoint or listen to a WebSocket to know if the async worker finished. You have massively increased frontend complexity

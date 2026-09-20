## Sync vs async

- When one service calls another, you must choose between synchronous (HTTP, gRPC) and asynchronous (message queues, event streams) communication. Neither is universally better
- The rule is simple: use synchronous communication when the caller *cannot proceed* without the answer. Use asynchronous communication when the caller *can* proceed without the answer

| Communication | When to use it | Example |
|---|---|---|
| **Synchronous** | The user is actively waiting, or the system needs data to make a decision right now | Checking if a user's password is correct during login (`IdentityService`) |
| **Asynchronous** | The action is a side effect, or the user can be notified later | Sending a welcome email after an account is created (`EmailService`) |

### The failure

- A common interview failure is answering "async is better because it is decoupled". Async is terrible for a login check: you cannot tell a user "your login request is queued, we will email you if you are authenticated"
- When you use async for a workflow that requires an immediate answer, you end up building a complex state machine on the client (polling, WebSockets) to fake a synchronous response. This is the worst of both worlds

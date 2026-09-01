### The rules that make it durable

- **Persist after every step**, not at the end. The state is the message array plus the step number, and that is enough to resume
- **Make tools idempotent**, or a resumed run charges the card twice. The idempotency keys from Booklet 6 belong on every tool that writes
- **Stream progress over SSE from the run record**, so the user sees steps without holding the generation on a socket
- A run that has not advanced in five minutes is stuck. Fail it loudly rather than leaving it queued forever

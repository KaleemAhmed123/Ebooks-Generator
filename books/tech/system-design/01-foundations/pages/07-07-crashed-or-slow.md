## You cannot tell "crashed" from "slow"

- A timeout fires. Did the server crash? Is it processing the request slowly? Is the reply stuck in a buffer somewhere?
- The caller cannot tell. The three outcomes are indistinguishable from the outside:
  - The server is down. The request was never processed. Safe to retry
  - The server is alive and slow. It will finish the request. A retry will duplicate the work
  - The server processed it, but the reply was lost. A retry will duplicate the work

### The response to silence

- **Timeout** — stop waiting after a known interval. Without a timeout, the caller waits until the kernel gives up (minutes). Module 8 covers how to pick the number
- **Retry** — send the request again. Module 9 covers backoff, jitter, and when not to retry
- **Idempotency** — make the retry safe. If the first request did go through, the retry must produce the same result. Module 10 covers the mechanism
- These three are the complete toolkit for handling silence. Each without the others is incomplete: a timeout without a retry just fails faster; a retry without idempotency may duplicate side effects; idempotency without a timeout never fires

### The failure

- Retrying without idempotency. The server was slow, not dead. It processed the original, then the retry. Two payments, two emails, two database rows

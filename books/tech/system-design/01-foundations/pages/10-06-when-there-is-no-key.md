## When there is no key

- Not every third-party API supports idempotency keys. If you call an API that is not naturally idempotent (like "send email" or "launch server") and it times out, you cannot safely retry
- The only safe action is **reconciliation**: reading the state to find out if the request succeeded before deciding what to do next

### Reading before acting

- If the API creates a resource, give it a name you control. Instead of calling `POST /instances`, call `POST /instances` with `Name=WebServer-01`. If it times out, you can call `GET /instances?name=WebServer-01` to check if it exists
- If it exists, the original request succeeded. If it does not, you can safely retry
- Cloud APIs expose the same idea as a client token: EC2's `RunInstances` takes a `ClientToken`, and a repeated call with the same token does not launch a second instance. It is an idempotency key under another name

### The failure

- Blindly retrying a non-idempotent call because "it usually works". The call is to a vendor's SMS API. It times out. You retry. The user receives two text messages
- Without an idempotency key, a timeout on a mutating request means the state is unknown. Reconcile first: read the state, then act

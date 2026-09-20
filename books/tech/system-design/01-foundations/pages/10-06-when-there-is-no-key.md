## When there is no key

- Not every third-party API supports idempotency keys. If you call an API that is not naturally idempotent (like "send email" or "launch server") and it times out, you cannot safely retry
- The only safe action is **reconciliation**: reading the state to find out if the request succeeded before deciding what to do next

### Reading before acting

- If the API creates a resource, give it a name you control. Instead of calling `POST /instances`, call `POST /instances` with `Name=WebServer-01`. If it times out, you can call `GET /instances?name=WebServer-01` to check if it exists
- If it exists, the original request succeeded. If it does not, you can safely retry
- AWS EC2 handles this with a `ClientToken`. If you pass a token to `RunInstances`, AWS remembers it. Even if you terminate the instance, AWS remembers that token for the rest of its lifetime, ensuring a late retry does not launch a zombie instance

### The failure

- Blindly retrying a non-idempotent call because "it usually works". The call is to a vendor's SMS API. It times out. You retry. The user receives two text messages
- Without an idempotency key, a timeout on a mutating request means the state is unknown. You must drop into a reconciliation flow to discover the state before you take action

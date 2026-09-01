### The one that only affects Alpine

- musl resolves differently from glibc, and intermittent `EAI_AGAIN` under load on Alpine images is a known pattern
- If a name resolves ninety-nine times and fails once, try the `-slim` variant of the base image before investigating further

### Outbound DNS failing

```bash
docker compose exec orders getent hosts api.stripe.com
```

- No answer means the container is on an `internal: true` network with no route out. That is deliberate for a database and wrong for a service calling a payment provider
- Put services that need outbound access on a normal network as well

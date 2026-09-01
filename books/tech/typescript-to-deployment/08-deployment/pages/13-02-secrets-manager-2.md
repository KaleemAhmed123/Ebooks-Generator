### Reading it in the application

```ts
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager"

const sm = new SecretsManagerClient({})

async function loadSecrets() {
  const res = await sm.send(new GetSecretValueCommand({ SecretId: "prod/orders/db" }))
  return JSON.parse(res.SecretString!)
}
```

- **Fetch once at boot and cache it.** Per-request fetches are slow, throttled and billed per call
- **Handle rotation.** Either re-fetch on an authentication failure and retry once, or restart on a rotation event from EventBridge
- **Deletion has a recovery window**, seven to thirty days. `--force-delete-without-recovery` skips it and is almost never right

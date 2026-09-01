### Connecting

```ts
const uri = `mongodb://${user}:${pass}@${host}:27017/orders` +
  `?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`
```

- **`retryWrites=false` is required for DocumentDB** and is the single most common connection failure
- The TLS certificate bundle must be downloaded and shipped with the application, or every connection is rejected
- **Neither is reachable from outside the VPC.** Local development connects through a Session Manager port forward

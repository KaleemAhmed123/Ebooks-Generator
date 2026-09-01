### `String` against `SecureString`

- **`SecureString` encrypts with KMS**, and reading it requires both the SSM permission and the KMS key permission
- **Use it for anything sensitive**, even though Secrets Manager is the better home for a rotating credential

### The limits worth knowing

| Limit | Value |
|---|---|
| standard parameter size | 4 KB |
| advanced parameter size | 8 KB, and billed |
| default throughput | 40 requests per second |

- **Fetch at boot, not per request.** Parameter Store is throttled, and a service reading a parameter on every request will hit the limit

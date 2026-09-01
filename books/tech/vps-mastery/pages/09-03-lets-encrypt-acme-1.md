## Let's Encrypt and ACME

- **Let's Encrypt** is a free certificate authority. **ACME** is the protocol its clients speak
- The client proves domain control, and the authority issues a certificate. No human step, no payment

### The two challenge types

| Challenge | Proves control by | Needs |
|---|---|---|
| `HTTP-01` | Serving a file at `/.well-known/acme-challenge/<token>` | Port 80 reachable from the internet |
| `DNS-01` | Publishing a `TXT` record at `_acme-challenge.example.com` | API access to the DNS provider |

- `HTTP-01` is the default and needs no credentials
- `DNS-01` is required for **wildcard** certificates, and works for a server with no public port 80

### Rate limits worth knowing

| Limit | Value |
|---|---|
| Certificates per registered domain | 50 per week |
| Duplicate certificate, same exact name set | 5 per week |
| Failed validations | 5 per account, per hostname, per hour |

- The duplicate limit is the one that bites. Five failed attempts at debugging a config, and issuance is blocked for a week

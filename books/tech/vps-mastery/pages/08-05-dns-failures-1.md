## Common DNS failures

| Symptom | Usual cause |
|---|---|
| `NXDOMAIN` | The record does not exist, or the nameservers are wrong |
| Resolves to the old address | TTL has not expired. Page 08-04 |
| `www` works, root does not | Missing `@` record, or a CNAME at the root |
| Works on mobile data, not on office wifi | A local resolver caching, or a split-horizon DNS |
| Certbot fails with NXDOMAIN | Requested a certificate before the record propagated |
| Long pause then the page loads | An `AAAA` record with nothing listening on IPv6 |

### Reading the failure

```bash
dig example.com

# ;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN
```

| Status | Means |
|---|---|
| `NOERROR` with an answer | Working |
| `NOERROR` with no answer | The name exists, but not this record type |
| `NXDOMAIN` | The name does not exist at all |
| `SERVFAIL` | The nameserver is broken, or DNSSEC validation failed |
| `REFUSED` | The server will not answer for this zone |

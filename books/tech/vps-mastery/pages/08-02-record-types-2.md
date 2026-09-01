### CNAME cannot sit at the root

- A CNAME replaces every other record for that name, and the root must also hold `NS` and usually `MX`
- Providers work around this with `ALIAS` or `CNAME flattening`. Both are provider features, not DNS standards

### AAAA is correctness, not speed

- IPv6 does not make a site faster. It makes it reachable for clients on IPv6-only networks
- **Only add `AAAA` if the server actually answers on that address.** A published IPv6 address with nothing listening produces a long timeout before the browser falls back to IPv4, which reads as a slow site

```bash
ip -6 addr show scope global      # empty means do not publish an AAAA record
```

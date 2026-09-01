## Record types

| Type | Points to | Use |
|---|---|---|
| `A` | An IPv4 address | The main record for a VPS |
| `AAAA` | An IPv6 address | Add if the box has IPv6 |
| `CNAME` | Another **name** | Subdomain pointing at a managed service |
| `MX` | A mail server name | Email for the domain |
| `TXT` | Free text | Domain verification, SPF, DKIM, ACME challenges |
| `NS` | Nameservers for the zone | Set at the registrar |
| `CAA` | Which authority may issue certificates | Optional hardening |

### A record

```text
Type  Name   Value           TTL
A     @      203.0.113.10    300
A     www    203.0.113.10    300
A     api    203.0.113.10    300
```

- `@` means the domain itself. `www` means `www.example.com`

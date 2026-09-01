## Ports

- A published port has up to four parts:

```text
"127.0.0.1:8080:8080/tcp"
  │         │    │    └── protocol, tcp by default
  │         │    └─────── container port. Fixed by the application
  │         └──────────── host port. Any free port
  └────────────────────── host address. THE SECURITY BOUNDARY
```

| Written as | Reachable from |
|---|---|
| `"8080:8080"` | The entire internet |
| `"0.0.0.0:8080:8080"` | The entire internet, explicitly |
| `"127.0.0.1:8080:8080"` | This machine only |
| omitted | Other containers on the same network only |

### The default is public

- Writing `"5432:5432"` binds to every interface. The firewall does not stop it, for the reason on page 02-09
- **Always write the address.** Every published port in this booklet starts with `127.0.0.1:`

### Ranges and random ports

```yaml
ports:
  - "127.0.0.1:9000-9010:9000-9010"     # a range
  - "127.0.0.1::8080"                   # host port chosen by Docker
```

- A Docker-assigned port is unusable by a host Nginx that needs a fixed upstream. Page 18-03 covers the correct way to scale behind a proxy

### Checking what is actually exposed

```bash
docker compose ps --format "table {{.Service}}\t{{.Ports}}"
sudo ss -tulpn | grep docker-proxy
```

- Anything on `0.0.0.0` in that output that is not 80 or 443 is a finding

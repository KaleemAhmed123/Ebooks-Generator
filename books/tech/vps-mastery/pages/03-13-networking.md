## Networking from the box

### What is listening

```bash
sudo ss -tulpn
```

```text
Netid State  Local Address:Port   Process
tcp   LISTEN 0.0.0.0:22          sshd
tcp   LISTEN 0.0.0.0:80          nginx
tcp   LISTEN 0.0.0.0:443         nginx
tcp   LISTEN 127.0.0.1:4000      docker-proxy
```

- **The address before the port is the security boundary.** `0.0.0.0` means every interface, reachable from outside. `127.0.0.1` means this machine only
- Anything on `0.0.0.0` other than 22, 80 and 443 needs a reason

### Is the port answering

```bash
curl -I http://127.0.0.1:4000            # from the box
curl -sS -o /dev/null -w "%{http_code}\n" https://example.com
# 200
nc -zv 127.0.0.1 5432                    # open or not, no HTTP
```

### DNS

```bash
dig +short example.com                   # 203.0.113.10
dig +short api.example.com
dig example.com @1.1.1.1                 # ask a specific resolver
resolvectl status                        # what this box uses
```

### Where is the latency

```bash
curl -w "dns %{time_namelookup}s  connect %{time_connect}s  tls %{time_appconnect}s  total %{time_total}s\n" \
  -o /dev/null -s https://example.com
```

- Splits a slow request into lookup, TCP, TLS and response. Usually settles an argument in one command

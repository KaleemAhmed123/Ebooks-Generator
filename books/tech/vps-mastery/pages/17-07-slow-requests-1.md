## Slow requests and 504s

- First, find out **where** the time goes. Guessing produces the wrong fix

```bash
curl -w "dns %{time_namelookup}  connect %{time_connect}  tls %{time_appconnect}  ttfb %{time_starttransfer}  total %{time_total}\n" \
  -o /dev/null -s https://api.example.com/orders
```

| Slow phase | Cause |
|---|---|
| `time_namelookup` | DNS. Page 08-05 |
| `time_connect` | Network, or Nginx saturated |
| `time_appconnect` | TLS handshake. Missing session cache |
| `time_starttransfer` | **The application. Usually the database** |

### Split Nginx from the backend

- With the log format from page 07-18:

```bash
awk '{print $0}' /var/log/nginx/access.log | grep "ureq=" | tail -20
```

- `req` high and `ureq` low means a slow client, not a slow server. This distinction ends most arguments

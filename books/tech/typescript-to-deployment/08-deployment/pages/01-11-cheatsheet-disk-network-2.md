### Testing an endpoint

```bash
curl -sS -o /dev/null -w '%{http_code} %{time_total}s\n' https://api.example.com/health
curl -svo /dev/null https://api.example.com 2>&1 | grep -E '^[<>]'   # headers both ways
curl --resolve api.example.com:443:10.0.1.5 https://api.example.com/health
nc -zv db.internal 5432               # is the port open from here
openssl s_client -connect api.example.com:443 </dev/null | head
```

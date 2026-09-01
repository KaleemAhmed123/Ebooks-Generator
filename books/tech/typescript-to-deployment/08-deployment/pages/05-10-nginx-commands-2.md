### A log format worth using

```nginx
log_format json escape=json '{"time":"$time_iso8601","ip":"$remote_addr",'
  '"method":"$request_method","uri":"$uri","status":$status,'
  '"bytes":$body_bytes_sent,"rt":$request_time,"urt":"$upstream_response_time",'
  '"rid":"$request_id","ua":"$http_user_agent"}';

access_log /var/log/nginx/access.log json;
```

- **`$request_time` against `$upstream_response_time` is the key comparison.** A large gap means the client is slow, not your application

### Checking from outside

```bash
curl -svo /dev/null https://api.example.com/health 2>&1 | grep -E '^[<>]'
curl -H 'Host: api.example.com' http://127.0.0.1/health      # bypass DNS
curl -sI https://api.example.com | head
```

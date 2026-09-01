## Reading the Nginx logs

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### A log format that answers questions

```nginx
log_format timed '$remote_addr - $status "$request" '
                 'upstream=$upstream_addr '
                 'ureq=$upstream_response_time req=$request_time '
                 'bytes=$body_bytes_sent "$http_user_agent"';

access_log /var/log/nginx/access.log timed;
```

| Variable | Answers |
|---|---|
| `$request_time` | Total time, including the client's own slowness |
| `$upstream_response_time` | Time the backend took |
| `$upstream_addr` | Which backend served it. Essential with several |
| `$upstream_status` | The backend's status, which can differ from `$status` |

- **`request_time` high with `upstream_response_time` low means the client is slow, not the server.** That distinction ends most performance arguments

### Quick analysis

```bash
# slowest requests
awk '{print $NF, $0}' access.log | sort -rn | head

# status code distribution
awk '{print $3}' access.log | sort | uniq -c | sort -rn

# noisiest addresses
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head
```

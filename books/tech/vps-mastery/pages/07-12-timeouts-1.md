## Timeouts

```nginx
http {
    client_body_timeout   12s;
    client_header_timeout 12s;
    send_timeout          20s;
    keepalive_timeout     65s;

    proxy_connect_timeout 5s;
    proxy_send_timeout    60s;
    proxy_read_timeout    60s;
}
```

| Directive | Clock starts | Default |
|---|---|---|
| `proxy_connect_timeout` | Opening the TCP connection to the backend | 60s |
| `proxy_send_timeout` | Between successive writes **to** the backend | 60s |
| `proxy_read_timeout` | Between successive reads **from** the backend | 60s |
| `keepalive_timeout` | Idle client connection held open | 75s |

### `proxy_connect_timeout` should be short

- Connecting to a container on the same host takes a millisecond. Waiting 60 seconds to discover it is down means 60 seconds of held connections during a restart
- **5 seconds is generous.** It cannot exceed 75 seconds regardless of what is written

### `proxy_read_timeout` is not a request budget

- It measures the gap between reads, not total duration. A backend streaming a response every 10 seconds runs indefinitely under a 60 second timeout

### Nginx or a service

| | Nginx routes directly | A gateway service |
|---|---|---|
| Adding a service | Edit Nginx, reload | Deploy the gateway |
| Auth | Duplicated per service | Central |
| Per-user rate limits | Not possible | Straightforward |
| Failure blast radius | One service | Everything |

- Under about five services, route in Nginx. Past that, a gateway pays for itself

### Timeouts must decrease inward

- If Nginx waits 60 seconds and the gateway waits 60 seconds and the service waits 60 seconds, a slow call holds three workers for a minute
- Nginx 60s, gateway 30s, service 10s. **The inner timeout must be shorter than the outer one**, or the outer one never gets a chance to fail cleanly

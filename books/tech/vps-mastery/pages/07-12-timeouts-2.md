### Raise it per location, not globally

```nginx
location /api/reports/export {
    proxy_pass http://api_gateway;
    proxy_read_timeout 300s;         # this endpoint only
}
```

- A global 300 second timeout means every hung request occupies a worker slot for five minutes

### What the client sees when it expires

- `504 Gateway Time-out`. Page 17-07 covers separating a slow backend from a slow network

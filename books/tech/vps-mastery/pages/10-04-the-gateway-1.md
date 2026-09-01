## The gateway

- With fifteen services, Nginx should not know about all of them. One service becomes the single entry point for the API

```nginx
location /api/ {
    proxy_pass http://api_gateway;
    include /etc/nginx/snippets/proxy.conf;
}
```

- Nginx routes by hostname and by two or three coarse paths. The gateway routes by resource

### What the gateway owns

| Concern | Why it belongs here |
|---|---|
| Authentication | One place validates the token, so twelve services do not each implement it |
| Request identity | Attaches a request ID that every downstream log line carries |
| Routing | `/api/orders` to `orders`, `/api/catalog` to `catalog` |
| Aggregation | One client call fanning out to three services |
| Version handling | `/api/v2/` routed differently without touching Nginx |

### What it must not become

- **Business logic.** A gateway holding rules is a monolith with extra network hops
- **A single point of slowness.** Every request passes through it, so its timeouts and connection pool sizing matter more than any other service

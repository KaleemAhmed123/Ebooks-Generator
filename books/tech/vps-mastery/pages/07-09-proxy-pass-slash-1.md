## proxy_pass and the trailing slash

- One character changes the path the backend receives. This is the single most common Nginx mistake

```nginx
location /api/ {
    proxy_pass http://api_gateway;      # NO trailing slash
}
# request  /api/orders
# backend gets  /api/orders
```

```nginx
location /api/ {
    proxy_pass http://api_gateway/;     # trailing slash
}
# request  /api/orders
# backend gets  /orders
```

- **With a slash, the matched prefix is stripped.** Without one, the full path is passed through

### Which to use

| The backend expects | Write |
|---|---|
| Routes already prefixed with `/api` | no trailing slash |
| Routes at the root, prefix is a routing detail | trailing slash |

### The double prefix symptom

```text
GET /api/api/orders  404
```

- The frontend already prepends `/api`, and Nginx passed the prefix through as well. Fix it in one place, in the frontend base URL, rather than papering over it with a rewrite

## Location matching order

- Nginx does not read `location` blocks top to bottom. It applies a fixed set of rules

| Modifier | Meaning | Priority |
|---|---|---|
| `=` | Exact match | 1. Wins immediately |
| `^~` | Prefix, and stop looking at regular expressions | 2 |
| `~` | Regular expression, case-sensitive | 3, first match in file order |
| `~*` | Regular expression, case-insensitive | 3 |
| none | Prefix match | 4. Longest prefix wins |

```nginx
location = /healthz        { return 200 "ok\n"; }
location ^~ /_next/static/ { proxy_pass http://shop_ui; expires 1y; }
location ~* \.(jpg|png|webp)$ { expires 30d; proxy_pass http://shop_ui; }
location /api/             { proxy_pass http://api_gateway; }
location /                 { proxy_pass http://shop_ui; }
```

### The rule that catches people

- **A regular expression beats a longer prefix.** `location /api/` loses to `location ~* \.(jpg)$` for `/api/thumb.jpg`
- `^~` exists to stop that. It says "this prefix wins, do not consider regular expressions"

### Order inside the file matters only for regular expressions

- Prefix blocks can be written in any order. Nginx finds the longest. Regular expressions are tried in the order written, and the first match wins

### Debugging which one was chosen

```nginx
add_header X-Debug-Location "api" always;
```

```bash
curl -sI https://example.com/api/orders | grep X-Debug
# X-Debug-Location: api
```

- Remove it before going live. It tells anyone reading headers how routing is arranged

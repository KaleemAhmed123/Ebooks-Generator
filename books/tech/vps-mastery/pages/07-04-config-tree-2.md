## The configuration tree - continued

| Directive belongs in | Examples |
|---|---|
| `http` | `upstream`, `limit_req_zone`, `gzip`, `log_format`, `map` |
| `server` | `listen`, `server_name`, `ssl_certificate`, `root` |
| `location` | `proxy_pass`, `try_files`, `limit_req`, `expires` |

- Putting `upstream` inside a `server` block is the most common syntax error. It only exists at `http` level

### Directives are inherited downward

- `client_max_body_size 50M;` in `http` applies to every server and location, unless one overrides it
- The nearest definition wins. This is why a setting that "does nothing" is usually being overridden further in

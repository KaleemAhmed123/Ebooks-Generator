### Failing over

```nginx
proxy_next_upstream error timeout http_502 http_503;
proxy_next_upstream_tries 2;
```

- **Never include `non_idempotent` in that list.** Retrying a `POST` on another backend can charge a card twice

### Node's own clustering

- `node --run` with the cluster module, or a process manager, can bind several workers to one port instead
- **Prefer separate ports behind Nginx.** Restarting one worker is then a visible, controllable step rather than a signal to a master process

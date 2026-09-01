### Balancing methods

```nginx
upstream orders {
    least_conn;                       # fewest active connections
    # ip_hash;                        # same client to the same replica
    server orders-1:8083;
}
```

- `least_conn` is the better default for requests of uneven cost
- **`ip_hash` is a workaround for state that should not exist.** Fix the session store instead

### Do not publish replica ports

- The old advice to map replicas to 5000, 5001, 5002 by hand does not survive `--scale`, and every published port reopens the problem on page 02-09

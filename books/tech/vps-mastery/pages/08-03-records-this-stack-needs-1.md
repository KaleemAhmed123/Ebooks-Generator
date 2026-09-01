## The records this stack needs

- One IP address, several names, all pointing at the same box. Nginx separates them by `Host` header

```text
Type  Name      Value           TTL
A     @         203.0.113.10    300
A     www       203.0.113.10    300
A     api       203.0.113.10    300
A     seller    203.0.113.10    300
A     admin     203.0.113.10    300
A     monitor   203.0.113.10    300
```

### A wildcard instead

```text
A     *         203.0.113.10    300
```

- One record covers every subdomain. Convenient, and it means a typo like `sellr.example.com` resolves and serves something
- The `default_server` block on page 07-07 returning `444` is what makes a wildcard safe

### Keep the TTL low before a move

- **TTL** (time to live) is how long a resolver may cache the answer
- Set it to 300 seconds a day before changing the address, then raise it to 3600 afterwards. A record still cached at 86400 seconds takes a day to move

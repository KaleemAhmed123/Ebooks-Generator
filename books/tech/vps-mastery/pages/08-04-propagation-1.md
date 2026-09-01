## TTL and propagation

- "Propagation" is not a push. Nothing is distributed. Every resolver simply holds the old answer until its cached copy expires
- **The maximum wait is the TTL that was in force before the change**, not the new one

| Old TTL | Worst case wait |
|---|---|
| 300 | 5 minutes |
| 3600 | 1 hour |
| 86400 | 24 hours |

### Which is why the order matters

1. Lower the TTL to 300
2. Wait for the **old** TTL to pass
3. Change the address
4. Wait 5 minutes
5. Raise the TTL back to 3600

### Checking without a cache in the way

```bash
dig +short example.com                    # through the local resolver
dig +short example.com @1.1.1.1           # ask Cloudflare directly
dig +short example.com @8.8.8.8           # ask Google directly
dig +trace example.com                    # the full path from the root
```

- Different answers from different resolvers means the change is in progress, not that something is broken

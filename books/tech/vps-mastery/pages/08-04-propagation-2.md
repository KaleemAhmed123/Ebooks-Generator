### The authoritative answer

```bash
dig NS example.com +short
# ns1.provider.example.

dig @ns1.provider.example example.com +short
# 203.0.113.10
```

- Asking the nameserver directly bypasses every cache. If this is wrong, the record itself is wrong

### Clearing local caches

```bash
sudo resolvectl flush-caches      # Ubuntu
ipconfig /flushdns                # Windows
```

- Browsers keep their own cache as well. Chrome exposes it at `chrome://net-internals/#dns`

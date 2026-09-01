### Heredocs

```dockerfile
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends curl ca-certificates
rm -rf /var/lib/apt/lists/*
EOF
```

- One layer, and readable. **The `rm` must be in the same `RUN`**, or the earlier layer still carries the package lists

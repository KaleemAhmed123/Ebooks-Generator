### If you run the container yourself

```bash
docker run --rm \
  --network none \
  --read-only \
  --memory 512m --cpus 0.5 --pids-limit 128 \
  --user 65534:65534 \
  --cap-drop ALL --security-opt no-new-privileges \
  -v "$WORK:/work" \
  sandbox:latest timeout 30 python /work/script.py
```

- **`--network none` is the single most important flag.** Without it, generated code can call anything, including your internal services
- One container per run, destroyed after. Reuse means one run can leave something for the next
- Everything here is covered properly in Booklet 8. **The default Docker configuration is not a sandbox**

### The rules

- **No credentials in the sandbox environment.** Not the database URL, not the provider key, not an instance role
- **A hard timeout and a memory cap**, or an infinite loop is a stuck worker
- Log the code that ran, always. It is the audit trail when something goes wrong

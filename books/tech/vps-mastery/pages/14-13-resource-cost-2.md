### The honest recommendation

- **Option 3 for most deploys, option 5 when the stack genuinely is fifteen services**
- Trying to run two full copies of a 15-service stack on 8 GB produces a deploy that fails unpredictably under load, which is worse than the two seconds of downtime it was meant to prevent

### Watch it during the first attempt

```bash
watch -n1 'free -h; docker stats --no-stream --format "{{.Name}} {{.MemUsage}}" | head -20'
```

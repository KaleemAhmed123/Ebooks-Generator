### Watching it

```bash
docker stats --no-stream --format 'table {{.Name}}\t{{.MemUsage}}\t{{.CPUPerc}}'
free -h
dmesg -T | grep -i 'killed process'      # what the OOM killer took
```

- **An out-of-memory kill leaves exit code 137 and no stack trace.** Module 2 covers reading it
- **Swap from Module 3 buys time, not capacity.** If swap is being used steadily, the box is too small

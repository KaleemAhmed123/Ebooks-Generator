### The failure that follows

- Memory spikes, the kernel picks the largest process, and it is usually the database

```bash
dmesg -T | grep -i "killed process"
# Out of memory: Killed process 2841 (postgres)
```

- The deploy took the site down, and the logs say the database crashed. The two look unrelated at 3am

### The fix is not a bigger box

- Building elsewhere removes the spike entirely. The server downloads a finished image, which costs bandwidth and no memory
- That is model 3, on page 13-06

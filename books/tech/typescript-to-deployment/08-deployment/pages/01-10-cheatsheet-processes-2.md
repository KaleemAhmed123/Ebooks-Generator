### Memory and CPU

```bash
free -h                               # total, used, available
vmstat 1 5                            # five one-second samples
uptime                                # load average: 1, 5, 15 minutes
nproc                                 # cores
cat /proc/<pid>/status | grep -i vm    # one process in detail
dmesg -T | grep -i 'killed process'   # was it the OOM killer
```

- **Load average above the core count means work is queuing.** Load 8 on 4 cores is a problem; load 3 on 8 cores is not
- **`available` in `free -h` is the number that matters**, not `free`. Linux uses spare memory as cache and gives it back on demand

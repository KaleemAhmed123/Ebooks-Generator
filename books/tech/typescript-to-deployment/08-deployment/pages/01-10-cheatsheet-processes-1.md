## Cheatsheet: processes, memory, CPU

### What is running

```bash
ps aux --sort=-%mem | head            # heaviest by memory
ps aux --sort=-%cpu | head            # heaviest by CPU
ps -ef --forest | grep -A5 node       # the process tree
pgrep -fa node                        # pids and full command lines
pidof node
htop                                  # interactive. F6 sorts, F9 kills
```

### Stopping something

```bash
kill -TERM <pid>          # ask it to shut down cleanly. Always try this first
kill -HUP <pid>           # reload config, for daemons that support it
kill -QUIT <pid>          # graceful stop, for Nginx
kill -9 <pid>             # forced. In-flight work is lost
pkill -f 'node dist'      # by command line pattern
```

| Signal | Means |
|---|---|
| `SIGTERM` (15) | shut down cleanly. **The one your app handles** |
| `SIGINT` (2) | Ctrl-C |
| `SIGHUP` (1) | reload configuration |
| `SIGKILL` (9) | cannot be caught. Last resort |

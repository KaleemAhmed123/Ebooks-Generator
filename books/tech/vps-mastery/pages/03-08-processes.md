## Processes and signals

```bash
ps aux | grep node          # find by name
pgrep -af node              # same, shorter
top                         # live view, q to quit
htop                        # nicer, sudo apt install htop
```

### Reading `top`

| Field | Meaning |
|---|---|
| `load average: 2.10 1.80 1.20` | Runnable processes over 1, 5, 15 minutes |
| `%Cpu(s) ... 12.0 wa` | Time waiting on disk. High `wa` means the disk is the bottleneck |
| `RES` | Real memory a process holds. The number that matters |
| `VIRT` | Address space reserved. Usually huge and meaningless |

- Load average compares against core count. `2.10` on two cores is fully busy. On eight cores it is idle

### Signals

```bash
kill 4052            # SIGTERM. Asks the process to shut down cleanly
kill -9 4052         # SIGKILL. Kernel removes it. No cleanup runs
```

- **Always try SIGTERM first.** A Node process handling SIGTERM closes its server, finishes open requests, and releases the database connection. SIGKILL skips all of that and can leave a lock file behind

```bash
pkill -f "node dist/main.js"     # by command line
```

### The process that will not die

- A process in uninterruptible sleep, state `D` in `ps`, is blocked in the kernel waiting on hardware. SIGKILL will not touch it. Only the blocking operation finishing, or a reboot, clears it

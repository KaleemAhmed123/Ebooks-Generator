## Cheatsheet: disk and network

### Disk

```bash
df -h                                 # free space per filesystem
df -i                                 # inodes. A full inode table looks like a full disk
du -sh /var/log/* | sort -h | tail    # what is filling it
du -sh --max-depth=1 / 2>/dev/null | sort -h
ncdu /var                             # interactive, much faster to explore
lsof +L1                              # deleted files still held open by a process
iostat -x 1 5                         # per-disk utilization
```

- **`df -h` first on any mystery outage.** A full disk presents as a hundred unrelated symptoms
- **`lsof +L1` is the follow-up** when `df` says full and `du` says empty. A deleted log still held open by Nginx keeps its space until the process restarts

### Network

```bash
ss -tulpn                             # every listening socket, with the process
ss -tn state established | wc -l      # how many open connections
lsof -i :3000                         # what holds this port
ip a                                  # addresses
ip r                                  # routes
ping -c 3 8.8.8.8                     # is anything reachable at all
traceroute api.example.com
mtr api.example.com                   # ping and traceroute combined, live
```

### DNS

```bash
dig +short api.example.com
dig api.example.com @1.1.1.1          # bypass the local resolver
dig +trace api.example.com            # where resolution actually goes
resolvectl status                     # what this machine uses
```

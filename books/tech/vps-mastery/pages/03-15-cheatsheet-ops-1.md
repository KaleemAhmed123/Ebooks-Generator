## Cheatsheet: processes, disk, network

### Processes

```bash
ps aux --sort=-%mem | head        # biggest memory users
pgrep -af node                    # find by command line
kill 4052                         # ask nicely
kill -9 4052                      # last resort
pkill -f "node dist/main.js"
htop                              # live, sortable
uptime                            # load averages
```

### Disk

```bash
df -h                             # space
df -i                             # inodes
du -sh /var/lib/docker/* | sort -h
ncdu /var                         # interactive
sudo lsof +L1                     # deleted files still held open
```

### Memory

```bash
free -h                           # read the available column
vmstat 1 5                        # si and so mean swapping
docker stats --no-stream
dmesg -T | grep -i "killed process"
```

### Network

```bash
sudo ss -tulpn                    # what is listening, and where
curl -I http://127.0.0.1:4000
dig +short api.example.com
sudo ufw status verbose
nc -zv 203.0.113.10 443           # run this from another machine
```

### When nothing appears to hold it

```bash
sudo ss -tulpn | grep ':80 '     # nothing
sudo netstat -tulpn | grep ':80'  # nothing
```

- The socket is in `TIME_WAIT` from a process that just exited. It clears within a minute

```bash
sudo ss -tan state time-wait | head
```

### The one that wastes an afternoon

- A `docker-proxy` process left behind by a container that was force-removed

```bash
ps aux | grep docker-proxy
sudo systemctl restart docker
```

- Restarting the daemon clears it. Every container restarts, so this is not a quiet operation

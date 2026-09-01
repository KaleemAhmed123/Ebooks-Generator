## Hardening a container

- The default configuration is convenient, not safe. Six flags remove most of what an attacker would use after getting code execution

```bash
docker run -d \
  --user 1000:1000 \
  --read-only --tmpfs /tmp:rw,noexec,nosuid,size=64m \
  --cap-drop ALL \
  --security-opt no-new-privileges \
  --pids-limit 256 \
  --memory 512m --cpus 1 \
  myapp:1.4.2
```

| Flag | Removes |
|---|---|
| `--user` | root inside the container, which is real root on some mounts |
| `--read-only` | writing a payload to disk |
| `--cap-drop ALL` | every Linux capability, including raw sockets |
| `--security-opt no-new-privileges` | privilege escalation through setuid binaries |
| `--pids-limit` | a fork bomb taking the host down |
| `--memory`, `--cpus` | one container starving its neighbours |

### In the Dockerfile

```dockerfile
USER node                        # the node images ship a non-root `node` user
```

- **`USER` is the one line that matters most**, and it is the one most often missing

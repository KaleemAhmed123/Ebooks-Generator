## Debugging a container

### It will not start

```bash
docker ps -a                                    # the exit code is the first clue
docker logs --tail 100 api
docker inspect api --format '{{.State.ExitCode}} {{.State.OOMKilled}} {{.State.Error}}'
docker events --since 10m                       # what the daemon did
```

| Exit code | Usually |
|---|---|
| `0` | it finished. The command was not a long-running server |
| `1` | the application threw during startup. Read the logs |
| `125` | the `docker run` command itself was wrong |
| `126` | the entrypoint is not executable |
| `127` | the command does not exist in the image |
| **`137`** | **killed. Almost always out of memory** |
| `139` | segmentation fault, usually a native module built for the wrong architecture |
| `143` | `SIGTERM`. A normal stop |

### It started and is wrong

```bash
docker exec -it api sh
docker exec api env | sort                      # is the config what you think
docker exec api cat /etc/resolv.conf            # DNS inside the container
docker exec api wget -qO- localhost:3000/health
docker top api                                  # processes inside
docker stats --no-stream api                    # CPU and memory right now
```

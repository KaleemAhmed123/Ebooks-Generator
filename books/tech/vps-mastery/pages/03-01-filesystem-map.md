## The filesystem map

- Linux has one tree starting at `/`. There are no drive letters. A second disk is mounted at a path inside the same tree

| Path | Holds |
|---|---|
| `/etc` | Configuration. Nginx, ssh, systemd units, cron |
| `/srv` or `/opt` | Application code and data you put there |
| `/home/kaleem` | The human user's files |
| `/root` | The root user's home |
| `/var/log` | Logs, when not going to the journal or a container |
| `/var/lib/docker` | Every image, container layer and volume |
| `/tmp` | Scratch space, cleared on reboot |
| `/usr/bin`, `/usr/local/bin` | Installed programs. `/usr/local/bin` for hand-installed ones |
| `/proc`, `/sys` | Not files. Live kernel state exposed as a filesystem |
| `/dev` | Devices. Disks, terminals, `/dev/null` |

### The three that fill up

- `/var/lib/docker` - images and build cache. The usual cause of a full disk
- `/var/log` - journal and Nginx access logs
- A database volume, which is also under `/var/lib/docker/volumes`

### Where this booklet puts an application

```text
/srv/app/
├── docker-compose.yml
├── .env                 # 600, owned by the deploy user
├── nginx/
└── backups/
```

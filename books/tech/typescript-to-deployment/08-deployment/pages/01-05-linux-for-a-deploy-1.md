## Enough Linux to deploy

- A server is a Linux machine, and four ideas cover almost everything a deploy touches

### Users and permissions

- **Never run an application as `root`.** A compromised process then owns the machine rather than one directory
- Create a dedicated user with no login shell, owning only what the application needs

```bash
sudo useradd --system --shell /usr/sbin/nologin --home /srv/app appuser
sudo chown -R appuser:appuser /srv/app
```

- Permissions read as three groups of three: owner, group, everyone. `chmod 640` is owner read and write, group read, others nothing

### Ports below 1024 are privileged

- Only `root` may bind port 80 or 443, which is one reason Node listens on 3000 and something else listens on 443

### The filesystem layout that is expected

| Path | Holds |
|---|---|
| `/srv/app` or `/opt/app` | your application |
| `/etc/nginx` | Nginx configuration |
| `/etc/systemd/system` | your service units |
| `/var/log` | logs, when they are not going to stdout |
| `/etc/environment` | machine-wide environment variables |

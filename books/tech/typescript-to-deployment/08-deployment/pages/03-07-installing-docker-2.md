### Configure the daemon before you need to

```json
// /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": { "max-size": "20m", "max-file": "5" },
  "live-restore": true,
  "default-address-pools": [{ "base": "172.20.0.0/16", "size": 24 }]
}
```

```bash
systemctl restart docker
```

- **The log limits are the important two lines.** Without them, one chatty container fills the disk and takes the whole box down. This is the most common single-server outage there is
- **`live-restore` keeps containers running while the daemon restarts**, so a Docker upgrade is not an outage

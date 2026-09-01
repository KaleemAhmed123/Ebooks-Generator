## The daemon setting that stops the disk filling

- By default Docker writes container output to a JSON file **with no size limit**
- A chatty service producing 50 MB of logs a day fills a 40 GB disk in under a year, and the whole box stops. This is the most common way a small VPS dies

```bash
sudo nano /etc/docker/daemon.json
```

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "builder": {
    "gc": {
      "enabled": true,
      "defaultKeepStorage": "10GB"
    }
  }
}
```

| Setting | Effect |
|---|---|
| `max-size: 10m` | Rotate after 10 MB |
| `max-file: 3` | Keep three files, so 30 MB per container maximum |
| `builder.gc` | Build cache is trimmed automatically above 10 GB |

```bash
sudo systemctl restart docker
```

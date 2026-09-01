## Bind mounts against named volumes

| | Named volume | Bind mount |
|---|---|---|
| Written as | `pgdata:/var/lib/postgresql/data` | `./nginx.conf:/etc/nginx/nginx.conf` |
| Lives at | `/var/lib/docker/volumes/...` | A path you choose |
| Managed by | Docker | You |
| Ownership | Docker sets it on first use | Host ownership, unchanged |
| Backup | Through a helper container | Copy the directory |
| Use for | Database data | Configuration files, TLS certificates |

### Read-only bind mounts

```yaml
volumes:
  - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
  - /etc/letsencrypt:/etc/letsencrypt:ro
```

- `:ro` means the container cannot modify the file. Use it for every configuration mount

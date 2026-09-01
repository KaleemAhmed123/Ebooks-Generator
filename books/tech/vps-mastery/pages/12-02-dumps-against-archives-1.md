## Dumps against volume archives

| | Logical dump | Volume archive |
|---|---|---|
| Made with | `pg_dump`, `mongodump` | `tar` of the volume directory |
| Database running | Yes | **Must be stopped** |
| Restores to | Any compatible version | The same major version only |
| Size | Smaller, compresses well | Larger |
| Selective restore | One table possible | All or nothing |
| Speed on large data | Slower | Faster |

### Use dumps for databases

- A dump is consistent, portable across versions, and can be inspected. It is the right default for Postgres and MongoDB

### Use archives for everything else

- MinIO data, RabbitMQ definitions, anything without a dump tool

### Copying the volume directory of a running database is not a backup

```bash
# WRONG on a running database
sudo tar -czf pgdata.tar.gz /var/lib/docker/volumes/app_pgdata/_data
```

- Files change while `tar` reads them. The result is a torn copy which usually restores, sometimes appears to work, and occasionally reveals corruption weeks later
- Either stop the container first, or use the dump tool. There is no third option

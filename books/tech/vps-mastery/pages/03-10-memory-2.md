### Per-container

```bash
docker stats --no-stream
```

```text
NAME            CPU %   MEM USAGE / LIMIT    MEM %
orders-service  2.14%   312MiB / 512MiB      60.9%
catalog-service 0.87%   198MiB / 512MiB      38.7%
```

- Without a limit set, the `LIMIT` column shows the whole machine. Page 06-11 sets real limits

### Swap in constant use is a signal

```bash
vmstat 1 5
# watch the si and so columns. Sustained non-zero means active swapping
```

- Occasional swap during a build is fine. Continuous swapping means the box is undersized, and every request is now waiting on disk

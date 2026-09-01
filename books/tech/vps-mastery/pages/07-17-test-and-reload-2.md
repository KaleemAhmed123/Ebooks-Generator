### How reload works

- The master process re-reads the config, starts new workers with it, and tells the old workers to stop accepting new connections
- Old workers finish what they are serving and exit. Both generations run side by side until then

```bash
ps aux | grep nginx
# root     812  nginx: master process
# www-data 998  nginx: worker process
# www-data 813  nginx: worker process is shutting down
```

### When a restart is genuinely required

- Changing `worker_processes`, `user`, or adding a `listen` on a new port. Everything else reloads

### `CMD` in bracket form, always

```dockerfile
CMD ["node", "dist/main.js"]     # exec form. Node becomes PID 1
CMD node dist/main.js            # shell form. /bin/sh becomes PID 1
```

- In shell form, `sh` receives the stop signal and Node never does. The container ignores `docker stop` and gets killed after ten seconds
- That lost signal is a broken graceful shutdown, an interrupted request, and a database connection left open

### `EXPOSE` publishes nothing

- It records intent for humans and for `docker run -P`. Reaching a port from the host needs a `ports` entry in Compose

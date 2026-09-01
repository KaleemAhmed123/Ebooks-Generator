## Node inside a container

- A container runs one process as **PID 1**, which is the init process. The kernel treats PID 1 specially, and that causes two real problems
- **PID 1 does not get default signal handlers.** A process with no `SIGTERM` handler ignores it entirely, so `docker stop` waits ten seconds then kills it
- **PID 1 must reap orphaned child processes**, or every subprocess that exits becomes a zombie

### The shell form is the usual cause

```dockerfile
CMD npm start                    # runs /bin/sh -c "npm start"
```

- The shell becomes PID 1, Node becomes its child, and **the shell does not forward `SIGTERM`**
- Every deploy then kills the process mid-request, and the symptom is intermittent 502s during a rollout

```dockerfile
CMD ["node", "dist/index.js"]     # Node is PID 1, and gets the signal
```

- **Never start the process through `npm start` in a container.** npm adds another layer with the same problem

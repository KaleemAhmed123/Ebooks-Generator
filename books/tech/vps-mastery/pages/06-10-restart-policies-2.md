### Limiting attempts

```yaml
restart: on-failure:5
```

- Gives up after five tries. Useful for a one-off task, wrong for a service, because a service should keep trying to come back

### Restart is not a substitute for a health check

- A restart policy reacts to a process exiting. It does nothing for a process that is running and broken. That is what page 05-15 is for

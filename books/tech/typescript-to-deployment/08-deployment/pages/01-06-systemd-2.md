## systemd - continued

| Directive | Does |
|---|---|
| `Restart=always` | brings it back after any exit, including a crash |
| `KillSignal=SIGTERM` | the signal your shutdown handler listens for |
| `TimeoutStopSec=30` | how long it waits before `SIGKILL` |
| `ProtectSystem=strict` | the filesystem is read-only except what you allow |
| `EnvironmentFile` | configuration, kept out of the unit file |

- **`TimeoutStopSec` must exceed your longest in-flight request**, or a deploy cuts requests off mid-response
- `Restart=always` with a fast crash loop is throttled by systemd. `StartLimitBurst` controls when it gives up

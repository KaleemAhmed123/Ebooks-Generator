### Preventing it

```text
Smallest change that works. No new interfaces, no new classes, no new files
unless there is no alternative. One function is fine.
```

### Reviewing for it

- **Count the implementations of every interface.** One means delete the interface
- **Count the users of every configuration option.** Zero means delete the option
- **Ask whether removing a layer changes any behavior.** If not, remove it

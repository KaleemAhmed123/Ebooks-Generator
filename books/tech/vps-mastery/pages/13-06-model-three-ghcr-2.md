### What this makes possible

| | Before | After |
|---|---|---|
| Deploy duration on the box | 8 to 20 minutes | 30 to 90 seconds |
| Memory spike during deploy | 2 GB or more | None |
| Rollback | Rebuild the old commit | `IMAGE_TAG=<old>` and up |
| Same artifact in staging and production | No | Yes |

- **Rollback becoming a tag change is the largest single gain.** It turns a fifteen-minute rebuild under pressure into a thirty-second command

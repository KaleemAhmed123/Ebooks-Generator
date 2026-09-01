### The rules

- **A secret never reaches a log.** Redact by key name in the logger, and never log the whole environment on startup
- **A secret never reaches an image or a build argument.** `docker history` shows every build argument
- **A secret never reaches the frontend bundle.** Anything prefixed for the client is public by definition
- **A restart is the rotation mechanism** unless the code re-fetches. Decide which, and write it down

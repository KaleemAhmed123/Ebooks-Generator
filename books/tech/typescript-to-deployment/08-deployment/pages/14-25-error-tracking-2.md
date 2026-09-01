### Self-hosted

- **GlitchTip is a lightweight, Sentry-compatible server** that runs in about 1 GB. The official Sentry self-hosted stack needs closer to 16 GB
- The SDK is unchanged. Only the DSN points somewhere else

### The rules

- **Alert on a new issue, not on every event.** The point of grouping is that ten thousand occurrences are one notification
- **Resolve issues.** An unresolved list of four hundred is the same as no error tracking at all
- **Set `NODE_ENV` correctly.** Development errors flooding the production project is the usual first mistake

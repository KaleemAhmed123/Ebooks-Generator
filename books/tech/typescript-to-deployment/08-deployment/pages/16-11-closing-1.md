## The twelve things worth remembering

### 1. One artifact, promoted

- Build once, tag with the commit SHA, and run the same bytes in staging and production

### 2. Configuration from the environment, validated at boot

- A missing variable crashes at startup, not at 2am on the one endpoint that reads it

### 3. The exec form, and handle `SIGTERM`

- `CMD ["node", "index.js"]`. The shell form swallows the signal and every deploy cuts requests

### 4. Liveness and readiness are different checks

- Confusing them turns a database blip into a restart storm

### 5. `.dockerignore`, and non-root

- The first keeps your `.env` and `.git` out of the image. The second limits what a compromise reaches

### 6. `nginx -t` before every reload

- And `proxy_buffering off` for anything that streams

### 7. No long-lived AWS keys, anywhere

- OIDC for the pipeline, roles for everything that runs. The `sub` condition is the security boundary

### 8. Security groups reference other security groups

- Not address ranges. The rule then stays correct with no maintenance

### 9. Drain longer than your slowest request

- Deregistration delay, then `SIGTERM`, then exit. In that order, every time

### 10. Migrations expand before they contract

- Never rename or drop in the deploy that changes the code, or there is nothing to roll back to

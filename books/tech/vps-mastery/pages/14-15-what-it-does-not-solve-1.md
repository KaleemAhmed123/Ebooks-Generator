## What blue-green does not solve

| Problem | Why it survives |
|---|---|
| A bad migration | Applied once, shared by both colors |
| A bug that only shows under real traffic | Both colors have the bug once the flip happens |
| A slow query added in this release | Same database, same plan |
| A dependency outage | Nothing to do with the deploy |
| The box running out of disk | Blue-green makes this worse |
| An expired TLS certificate | Nginx never restarted, so it never reloaded the certificate |

### The last one is worth dwelling on

- A blue-green setup reloads Nginx on every deploy, which quietly renews the certificate in memory
- **A stack that has not deployed for two months has an Nginx holding a certificate that expired.** The renewal hook on page 09-06 is what prevents this, and it is easy to omit because deploys mask the problem

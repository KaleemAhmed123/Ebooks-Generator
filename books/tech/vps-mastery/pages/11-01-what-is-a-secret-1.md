## What counts as a secret

| Value | Secret | Where it belongs |
|---|---|---|
| Database password | Yes | `.env` on the box, encrypted copy off it |
| JWT signing key | Yes | Same |
| Payment provider live key | Yes | Same, and rotated on any suspicion |
| SMTP password | Yes | Same |
| OAuth client secret | Yes | Same |
| OAuth client **ID** | No | Public by design |
| `PUBLIC_BASE_URL` | No | Configuration, not a secret |
| Internal service URLs | No | `http://catalog:8080` reveals nothing useful |
| A database schema | No | |

### The distinction that matters

- **A secret is a value that grants access.** Configuration merely describes the environment
- Treating everything as a secret makes the real ones harder to find and rotate

### The rules

1. A secret never enters Git. Not in a commit, not in a branch, not in history
2. A secret never appears in a Docker image. `docker history` is readable by anyone with the image
3. A secret never appears in a log line, an error message, or a URL query string
4. Every secret has a known way to be rotated, written down before it is needed

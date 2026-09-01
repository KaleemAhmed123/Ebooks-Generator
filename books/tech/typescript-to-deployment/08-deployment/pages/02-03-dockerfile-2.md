### The details that matter

- **`npm ci`, never `npm install`.** It installs exactly the lockfile and fails if the lockfile disagrees with `package.json`
- **`--omit=dev`** leaves TypeScript, Vitest and the rest of the toolchain out of the runtime image
- **Use the exec form**, `CMD ["node", "index.js"]`. The shell form wraps the process in `/bin/sh`, which does not forward signals
- **Pin the base image tag.** `node:24-alpine` is a moving target; `node:24.9.0-alpine` or a digest is reproducible
- `# syntax=docker/dockerfile:1` opts into the current BuildKit frontend, which enables cache and secret mounts

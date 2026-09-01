## Semver and lockfiles

```
MAJOR . MINOR . PATCH
  8   .   3   .   1
```

- MAJOR breaks things, MINOR adds things, PATCH fixes things

| Range | Allows | Means |
|---|---|---|
| `^8.3.1` | 8.3.1 up to 9.0.0 | minor and patch |
| `~8.3.1` | 8.3.1 up to 8.4.0 | patch only |
| `8.3.1` | exactly that | pinned |
| `*` | anything | never do this |

- `^` is the npm default and it lets a **minor** version in without you asking
- A minor version has broken production more than once

### The lockfile is what actually protects you

```bash
npm ci         # installs exactly the lockfile, deletes node_modules first
npm install    # may update the lockfile
```

- **Use `npm ci` in CI and Docker.** `npm install` in a Dockerfile can build a different tree than your laptop
- Commit the lockfile. Always. Even for a library

### Overriding a transitive dependency

```json
{ "overrides": { "semver": "^7.6.0" } }
```

- Forces a version deep in the tree when a dependency has not patched yet
- pnpm calls it `resolutions` under `pnpm.overrides`

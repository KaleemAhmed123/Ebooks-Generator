## Defending the Dependency Tree

Six defenses, in the order they pay off. None is sufficient alone. Together they
close most of what happened in 2026.

### 1. Install from the lockfile, always

```bash
npm ci          # not npm install
pnpm install --frozen-lockfile
yarn install --immutable
```

`npm install` is allowed to resolve a newer version and rewrite the lockfile.
`npm ci` installs exactly what the lockfile says and fails if the lockfile and
`package.json` disagree. On a CI runner there is no reason to ever use the first
one, and using it means your build is not reproducible.

### 2. Wait before installing anything new

This is the single highest-value change, and it is one line.

Most malicious releases are caught quickly. **Shai-Hulud was detected in about
12 hours.** The September 2025 compromise of `debug` and `chalk` was resolved in
about **2.5 hours**. A cooldown of one day would have blocked both, on every
machine, with no analysis and no tooling.

pnpm added `minimumReleaseAge` in v10.16, September 2025, and **made it default
to 1440 minutes, one full day, in v11**.

```
# .npmrc
minimum-release-age=1440
```

```yaml
# pnpm-workspace.yaml
minimumReleaseAge: 1440
minimumReleaseAgeExclude:
  - my-own-internal-package
```

By default pnpm falls back to an older version that satisfies the age
requirement rather than failing. `minimumReleaseAgeStrict: true` makes it fail
instead. npm shipped its own `min-release-age` config in 11.10.0, February 2026,
off by default.

You give up nothing real. Almost nobody needs a package that was published four
minutes ago.

### The release pull request

The pattern almost everyone runs. A bot keeps an open pull request that
accumulates every pending changeset. Merging it is the release.

```yaml
name: Release
on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      id-token: write            # OIDC, so no long-lived npm token
    steps:
      - uses: actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0  # v7.0.0
      - uses: pnpm/action-setup@v6
      - uses: actions/setup-node@v7
        with: { node-version: '24', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: changesets/action@v1
        with:
          version: pnpm changeset version
          publish: pnpm changeset publish
```

The result is that `main` is always releasable, and the release is a merge. The
open pull request doubles as a preview of the next changelog, which product and
support can read.

Note `id-token: write` and the absence of an `NPM_TOKEN`. That is OIDC trusted
publishing from Module 21: the workflow proves its identity to npm directly, so
there is no long-lived credential in the repository to steal.

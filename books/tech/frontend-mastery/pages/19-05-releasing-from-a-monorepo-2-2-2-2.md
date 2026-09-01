### Internal packages that are never published

Most monorepo packages are private. They still need versions in `package.json`,
but they are consumed through the workspace protocol:

```json
{
  "dependencies": {
    "@acme/ui": "workspace:*"
  }
}
```

`workspace:*` tells pnpm to always link the local copy. There is no publish step
and no version to bump, and the applications get changes the moment they land.

The trade is that a breaking change in `packages/ui` breaks every application in
the repository at once, in the same commit. That is usually what you want: the
person who broke it fixes it, immediately, rather than three teams discovering
it separately over a fortnight.

### What good looks like

- Every pull request that changes a published package carries a changeset, and
  CI fails if one is missing.
- `main` is always releasable.
- Releasing is merging a pull request, not running commands on a laptop.
- The changelog is written by the person who made the change.
- Nothing is published from a developer's machine.

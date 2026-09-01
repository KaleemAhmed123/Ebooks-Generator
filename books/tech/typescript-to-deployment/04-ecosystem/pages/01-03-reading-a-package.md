## Judging a package in two minutes

```bash
npm view express
npm view express time.modified
npm view express dependencies
```

### What to look at

- **Weekly downloads.** Under a thousand means you are the maintainer if it breaks
- **Last publish.** Two years quiet is fine for a stable utility, alarming for anything touching HTTP or crypto
- **Dependency count.** `npm view <pkg> dependencies`. Every one is inherited
- **Open issues versus closed.** A thousand open and forty closed is a warning
- **Types.** Bundled `.d.ts`, a `@types/` package, or neither

### Useful commands

```bash
npx howfat express          # install size and dependency tree
npm ls <package>            # who pulled this in
npm explain <package>       # the exact path to it
npm view <pkg> repository   # is it even on GitHub
```

### The provenance check

```bash
npm audit signatures
```

- Verifies packages were published from the repository they claim
- Not everything is signed yet, and a missing signature on a popular package is worth a look

## Caching and matrices

### Caching dependencies

```yaml
- uses: actions/setup-node@v7
  with:
    node-version: 24
    cache: npm                 # caches ~/.npm, keyed on the lockfile
```

- That one line usually takes `npm ci` from ninety seconds to fifteen

```yaml
- uses: actions/cache@v6
  with:
    path: |
      .next/cache
      node_modules/.cache
    key: build-${{ runner.os }}-${{ hashFiles('package-lock.json') }}-${{ github.sha }}
    restore-keys: |
      build-${{ runner.os }}-${{ hashFiles('package-lock.json') }}-
      build-${{ runner.os }}-
```

- **`restore-keys` is the part that matters.** An exact key miss falls back to the closest prefix, so a partial cache is still used
- **Never cache `node_modules` itself.** Cache the package manager's store and let `npm ci` link from it, or a platform-specific binary leaks between runs

### Caching Docker layers

```yaml
- uses: docker/build-push-action@v7
  with:
    context: .
    push: true
    tags: ${{ steps.meta.outputs.tags }}
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

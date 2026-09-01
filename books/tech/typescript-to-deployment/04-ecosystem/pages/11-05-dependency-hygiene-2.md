### Staying current

```bash
npx npm-check-updates -i      # interactive, pick what to bump
npx taze major -I             # the newer alternative, same idea
```

- `npm outdated` reports. These two actually update `package.json`
- Bump patch and minor often and in small batches. A yearly upgrade of everything at once is where days disappear

### Security

```bash
npm audit --omit=dev
npm audit fix
```

- `--omit=dev` filters out advisories in build tooling that never ships
- Not every advisory applies to how you use the package. Read before you rewrite anything

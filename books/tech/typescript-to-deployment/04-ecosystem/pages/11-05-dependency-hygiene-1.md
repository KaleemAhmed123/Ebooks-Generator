## Keeping dependencies honest

- Four tools most teams have never run, each of which finds something on the first try

### knip 6.33.0, the highest value of the four

```bash
npx knip
```

- Reports unused dependencies, unused files, and **unused exports**
- The export list is the interesting one. Dead code that nothing imports has been passing code review for years

### depcheck and madge

```bash
npx depcheck                    # dependencies you install and never import
npx madge --circular src/       # circular imports
```

- A circular import in CommonJS silently gives you a half-initialized module, which Booklet 3 covers

### syncpack 15.3.3, for a monorepo

```bash
npx syncpack list-mismatches
npx syncpack fix-mismatches
```

- Finds the package pinned to three different versions across your workspaces
- That mismatch is why a shared type "does not exist" in one app and does in another

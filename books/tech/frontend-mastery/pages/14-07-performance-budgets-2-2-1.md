### Find out what got big

When a budget fails, you need the cause in one command.

```bash
# Next.js
ANALYZE=true npm run build

# Vite
npx vite-bundle-visualizer

# anything, from the stats file
npx source-map-explorer 'dist/assets/*.js'
```

The recurring culprits are the same everywhere:

| Symptom | Usual cause |
|---|---|
| A large date module | `moment` or importing all of `date-fns` instead of the functions used |
| The whole icon set | `import { Icon } from 'lib'` where the package is not tree-shakeable |
| Duplicate React | two versions resolved in a monorepo |
| A locale bundle | a library shipping every language by default |
| A chart library on a page with no chart | a static import that should be `next/dynamic` or `React.lazy` |

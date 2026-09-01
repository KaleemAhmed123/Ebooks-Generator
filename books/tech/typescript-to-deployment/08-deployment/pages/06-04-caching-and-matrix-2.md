### Matrices

```yaml
strategy:
  fail-fast: false
  matrix:
    node: [22, 24, 26]
```

- **`fail-fast: false` runs every combination** even after one fails, which is what you want when the question is which versions break
- Matrices are for libraries. **An application pins one Node version** and testing three is wasted minutes

### Route-based splitting is the baseline

- Split at route boundaries first. Every route is a natural chunk boundary
- Only add component-level splitting after measuring — the overhead of a waterfall (main bundle loads, then lazy bundle loads) can be worse than a larger initial bundle
- Preload chunks on hover using `prefetch` directives or manually calling `import()` on `mouseenter`

### Bundle analysis

- `vite-bundle-visualizer` or `@next/bundle-analyzer` shows what is in each chunk
- Look for: libraries duplicated across chunks, large dependencies that could be lazy loaded, and `node_modules` in client chunks that belong server-side
- A chart library included in the initial bundle but used only on an admin-only page is a common finding

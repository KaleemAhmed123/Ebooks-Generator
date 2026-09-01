## Performance Budgets

Every performance improvement in this module decays. Someone adds a date picker
that pulls in a locale bundle, someone imports the whole icon library to use two
icons, and six months later the page is slower than before you started.

A **budget** is a number in CI that fails the build when it is exceeded. It
converts performance from something a person remembers to care about into
something the pipeline enforces.

### Budget the bundle

```bash
npm install -D size-limit @size-limit/preset-app
```

```json
// .size-limit.json
[
  { "name": "entry",     "path": ".next/static/chunks/main-*.js", "limit": "95 kB" },
  { "name": "framework", "path": ".next/static/chunks/framework-*.js", "limit": "48 kB" },
  { "name": "route: /checkout", "path": ".next/static/chunks/app/checkout/*.js", "limit": "38 kB" }
]
```

```yaml
- run: npm run build
- run: npx size-limit
```

Two rules that make this useful rather than annoying.

**Budget compressed size, not raw.** The user downloads the Brotli-compressed
bytes. A 40kB raw file that compresses to 9kB is not a problem. `size-limit`
reports compressed by default.

**Budget per route, not just the entry point.** A total-bundle number hides the
thing you care about, which is what a specific page has to download before it is
usable. If `/checkout` grows 30kB while `/blog` shrinks 30kB, a total budget
sees nothing and your revenue page got slower.

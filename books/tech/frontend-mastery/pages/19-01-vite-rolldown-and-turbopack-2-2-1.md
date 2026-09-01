### Turbopack

Vite optimizes for the client. Next.js needed a bundler that also understands Server Components, the server and client graphs, and code that runs in Node.

Vercel wrote **Turbopack** in Rust for that job. Two ideas carry it:

- **Incremental computation.** Turbopack remembers the result of every unit of work. Change one file and it recomputes only what depended on that file. With filesystem caching enabled it keeps those results on disk, so restarting the dev server tomorrow starts warm.
- **Lazy evaluation.** It compiles only what the page you are looking at needs. A site with 5,000 routes compiles one of them.

As of Next.js 16, Turbopack is **stable and the default** for both `next dev` and `next build`: 2 to 5 times faster production builds, up to 10 times faster Fast Refresh. Projects with a custom Webpack configuration can opt out.

```bash
next dev --webpack
next build --webpack
```

Filesystem caching in development is still behind a flag.

```ts
// next.config.ts
const nextConfig = {
  experimental: { turbopackFileSystemCacheForDev: true },
};
```

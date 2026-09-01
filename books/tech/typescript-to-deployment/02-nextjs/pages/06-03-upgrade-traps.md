## The upgrade traps

- Things that break quietly rather than loudly

### Parallel routes need `default.tsx`

- Every parallel route slot now requires one. The build fails without it

```tsx
// app/@modal/default.tsx
export default function Default() {
  return null
}
```

### Image defaults changed

| Setting | Was | Now |
|---|---|---|
| `minimumCacheTTL` | 60 seconds | 4 hours |
| `qualities` | any | `[75]` only |
| `maximumRedirects` | unlimited | 3 |
| `imageSizes` | included 16 | 16 removed |

- A `quality={90}` prop is now silently coerced to 75 unless you list it in `images.qualities`
- `images.domains` is deprecated. Use `images.remotePatterns`

### Scroll behavior

- Next.js no longer overrides your `scroll-behavior: smooth` during navigation
- If navigations now scroll slowly, add `data-scroll-behavior="smooth"` to `<html>`

### The codemod does most of it

```bash
npx @next/codemod@canary upgrade latest
npx @next/codemod@canary next-async-request-api .
```

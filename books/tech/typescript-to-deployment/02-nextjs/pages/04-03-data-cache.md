## The Data Cache

- Stores the result of a fetch on the server
- Survives requests, and survives deploys. That surprises people

### `fetch` is not cached by default any more

```ts
// hits the API every time
const res = await fetch("https://api.internal/catalog")

// cached until something invalidates it
const res = await fetch("https://api.internal/catalog", {
  cache: "force-cache",
})

// cached, refreshed at most every 60 seconds
const res = await fetch("https://api.internal/catalog", {
  next: { revalidate: 60 },
})

// never cached
const res = await fetch("https://api.internal/orders", {
  cache: "no-store",
})
```

- Next.js 14 cached `fetch` by default. Next.js 15 stopped
- If you are reading an older article, that is the single biggest thing it will get wrong

### Tagging

```ts
const res = await fetch("https://api.internal/catalog", {
  next: { tags: ["catalog"] },
})
```

- A tag is a label you can invalidate later from a Server Action

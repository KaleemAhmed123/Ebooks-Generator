### One upgrade detail that catches everybody

In Next.js 16 the route props are promises. `params` and `searchParams` must be awaited, and so must `cookies()`, `headers()`, and `draftMode()`.

```tsx
// Next 14
export default function Page({ params }) {
  return <Post id={params.id} />;
}

// Next 16
export default async function Page({ params }) {
  const { id } = await params;
  return <Post id={id} />;
}
```

The reason is streaming. A route can start rendering before the router has finished resolving every segment, and a promise is how the framework hands you a value that is not ready yet. The official codemod handles the mechanical part:

```bash
npx @next/codemod@canary upgrade latest
```

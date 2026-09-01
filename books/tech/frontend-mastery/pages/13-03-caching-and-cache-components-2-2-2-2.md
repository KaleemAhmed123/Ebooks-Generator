### Everything else is still async

Next 16 removed the synchronous versions of the request APIs. These all return promises now, and forgetting the `await` is the most common upgrade error.

```tsx
export default async function Page({ params, searchParams }) {
  const { id } = await params;
  const { sort } = await searchParams;
  const cookieStore = await cookies();
  const headerList = await headers();
}
```

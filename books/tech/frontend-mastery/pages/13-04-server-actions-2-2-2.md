### Two things a Server Action is not

**It is not private.** A Server Action compiles to a POST endpoint with a generated id. Anyone can call it with any arguments. Validate the input and check the caller's permissions inside the action, every time, exactly as you would in an API route.

```ts
'use server';
export async function deletePost(id: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  if (!(await canDelete(session.user, id))) throw new Error('Forbidden');
  await db.posts.delete(id);
}
```

**It is not free.** Server Actions run one at a time in submission order, so they are the wrong tool for something like a search-as-you-type query. Use a route handler for reads that fire often, and Server Actions for writes.

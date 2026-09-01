### Invalidating: three functions, three jobs

```ts
'use server';
import { revalidateTag, updateTag, refresh } from 'next/cache';
```

**`revalidateTag(tag, profile)`** marks tagged entries stale and revalidates in the background. Users keep getting the cached copy while the refresh happens. Note the second argument, which is **required** in Next 16. The single argument form is deprecated.

```ts
revalidateTag('blog-posts', 'max');      // recommended default
revalidateTag('news-feed', 'hours');
revalidateTag('products', { expire: 3600 });
```

**`updateTag(tag)`** expires and re-reads immediately, in the same request. This is the read-your-writes case: the user saved a form and must see their own change on the very next screen. Server Actions only.

```ts
export async function saveProfile(userId: string, data: Profile) {
  await db.users.update(userId, data);
  updateTag(`user-${userId}`);           // they see it right away
}
```

**`refresh()`** refreshes uncached data only and never touches the cache. Use it for a notification count or a live status pill that sits beside content you want to leave cached. Server Actions only.

### Choosing between them

| You want | Use |
|---|---|
| Content that can be a few seconds stale | `revalidateTag(tag, 'max')` |
| The user must see their own edit at once | `updateTag(tag)` |
| Refresh a live number, leave the page cached | `refresh()` |
| Nuke a specific URL | `revalidatePath('/blog')` |

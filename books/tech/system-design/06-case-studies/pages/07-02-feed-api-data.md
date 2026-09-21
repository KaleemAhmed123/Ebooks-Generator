## API and data model

- `POST /posts {text, mediaIds}` → 201 with the post id; `PUT` and `DELETE /follows/{userId}`; `GET /feed?cursor=&limit=20` → the page and the next cursor. The idempotency key on `POST /posts` is booklet 01's
- Three stores. `posts`, keyed by a time-ordered id (booklet 05) and partitioned by it. `follows`, stored twice, as `(follower, followee)` and as `(followee, follower)`: fan-out needs "who follows Alice", the pull path needs "whom does Bob follow", and one index cannot serve both cheaply (booklet 02 owns the partitioning). `feed:{userId}`, a list of post ids in the cache, page 3

```typescript
// GET /feed?cursor=<smallest post id on the previous page>&limit=20
// ids are fixed-width and time-ordered, newest first, so "older than the cursor" is a compare
async function feedPage(userId: string, cursor?: string, limit = 20) {
  const ids = await cache.lrange(`feed:${userId}`, 0, 799);
  const start = cursor ? ids.findIndex((id) => id < cursor) : 0;
  if (start < 0) return { posts: [], nextCursor: null };
  const page = ids.slice(start, start + limit);
  const posts = await postStore.getMany(page);      // hydrate; a deleted id returns nothing
  return { posts, nextCursor: page.at(-1) ?? null };
}
```

- The list holds ids, never post bodies. A post edited once would otherwise be rewritten in every follower's list; with ids, the body lives in the posts store and its cache (Module 4), and every feed hydrates it at read time. A deleted post disappears from every feed by returning nothing
- The cursor is the last id the client saw, not a page number. A post that arrives while the user is reading goes to the front of the list and shifts nothing behind the cursor

### The failure

- `GET /feed?page=2`. Two posts arrive while page 1 is read; `OFFSET 20` now starts two posts earlier, and page 2 repeats the last two of page 1. On a list that grows at the top, an offset is a moving target. The cursor costs one comparison and removes the bug

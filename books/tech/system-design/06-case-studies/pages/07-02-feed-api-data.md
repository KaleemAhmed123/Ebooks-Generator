## API and data model

- The API is simple, but pagination is a trap. You cannot use `OFFSET/LIMIT` for a feed. If I read 10 posts, and while I read them 2 new posts arrive, requesting `OFFSET 10` will shift the window and show me duplicates
- **Cursor-based pagination:** You must use a cursor (usually the `post_id` or timestamp). `GET /feed?max_id=98765`

```typescript
POST /v1/posts
Body: { content: "Hello world" }

GET /v1/feed?max_id=12345&limit=20
Response: {
  posts: [...],
  next_cursor: "12300"
}
```

- **The Cache List:** We do not query the database for the feed. Every user has a Redis List (or Sorted Set) holding the IDs of the posts in their feed. 
- `User123_feed: [post_9, post_7, post_2]`

### The failure

- Storing the actual post content in the Redis feed list. If a post is edited, you have to find and update it in millions of lists. Store only the `post_id` in the list, and fetch the content from a separate cache (→04) at read time

:::interview
A user requests page 2 of their feed using `?page=2&limit=20`. They complain they are seeing posts they already saw on page 1. What caused this?

Offset pagination. New posts were added to the top of the feed while they were reading page 1, pushing the old posts down into the page 2 offset window. Always use cursor pagination.
:::

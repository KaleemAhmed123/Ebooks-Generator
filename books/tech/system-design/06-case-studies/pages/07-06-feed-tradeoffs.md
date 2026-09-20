## What the interviewer probes

- **"I posted but do not see it" (Consistency):** If I post, and immediately refresh, my post might not be in my Redis feed yet due to queue lag. Fix: The client injects the post locally, or the API explicitly writes to the author's own Redis feed synchronously
- **Edits and Deletes:** Because the Redis feed only stores `post_id`, deleting a post just means deleting it from the core DB. When the edge aggregator fetches the content for the IDs, the DB returns nothing, and the aggregator drops the ID
- **Media:** Images and videos are served via CDN (→05). The post payload contains URLs to the CDN, never base64 encoded bytes

### The failure

- Storing images in the primary database. Your storage costs will bankrupt the company. Write binary blobs to Object Storage (S3) and serve them via a CDN. The DB only stores the URL string

:::interview
Your feed queue is currently lagging by 30 seconds. A user creates a post and is redirected to their feed, but they don't see their post, so they submit it again. How do you prevent this?

Always write a user's own post synchronously to their personal feed cache before returning 200 OK. Queue the fan-out for their followers asynchronously.
:::

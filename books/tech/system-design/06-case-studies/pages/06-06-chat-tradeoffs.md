## What the interviewer probes

- **End-to-End Encryption (E2EE):** "Can we implement server-side full-text search?" — If it is WhatsApp (E2EE), no. The server only sees ciphertext. Search must happen entirely on a local SQLite database on the user's phone
- **Request Coalescing:** "A popular public channel gets 1,000 reads per second." — Discord uses request coalescing. If 1,000 clients ask the data service for the same channel history simultaneously, the service executes exactly one database query and copies the result to all 1,000 callers (→04)
- **Media attachments:** Images do not go through WebSockets. The client HTTP POSTs the image to S3 (via a presigned URL, →09), gets an `image_url`, and sends that URL as the text content of the chat message

### The failure

- Trying to write read-receipts as database row updates (e.g., `UPDATE messages SET read=true`). In a wide-column store, an update creates a tombstone. Discord found they were creating 12 tombstones per message, killing read performance. Write receipts as append-only events.

:::interview
You store chat history in Cassandra. A user edits a message. You execute an `UPDATE` statement. Over time, reads become extremely slow. Why?

Cassandra is append-only. An `UPDATE` writes a new row and a "tombstone" (deletion marker) for the old row. When reading, Cassandra must scan and filter out all these tombstones, causing severe disk IO and latency.
:::

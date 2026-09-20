## What the interviewer probes

- **Notifications:** How does Bob know Alice updated the file? Long polling or WebSockets. The notification just says "File 123 changed". Bob's client then queries the API for the new metadata
- **Security:** "Can you build End-to-End Encryption?" Yes, but it breaks deduplication. If Alice and Bob encrypt the same MP3 with their own private keys, the ciphertexts are completely different, resulting in different block hashes
- **Cold storage:** How do you delete old blocks? A garbage collection job periodically scans the metadata database. Any block hash in S3 that is no longer referenced by any active file version or snapshot is deleted

### The failure

- Polling. If you have 100 million desktop clients making an HTTP GET every 5 seconds to check for changes, you will DDoS your own API. Clients must maintain a persistent connection (WebSocket/SSE) to receive push notifications

:::interview
Your sync clients HTTP GET `/changes` every second. The API is burning millions of dollars in compute. How do you fix it?

Move to a push architecture. Clients open a long-lived WebSocket or Server-Sent Events (SSE) connection, and the server pushes a tiny notification when a file changes.
:::\n
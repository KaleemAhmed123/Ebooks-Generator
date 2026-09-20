## Content-addressed blocks

- Files are split into **4 MB blocks**
- Each block is run through a hashing algorithm (SHA-256) to generate a unique string. This hash becomes the block's ID
- A file is no longer a blob. A file is a **Blocklist**: a JSON array of block hashes
  - `File V1: [HashA, HashB, HashC]`
  - User edits the middle of the file
  - `File V2: [HashA, HashX, HashC]`
- **Deduplication:** Because blocks are named by their hash (content addressing), deduplication happens automatically. If 1,000 users upload the exact same 4 MB MP3 file, they all generate the exact same hash. The server only stores it once

### The failure

- Splitting blocks by strict 4 MB offsets. If a user inserts 1 byte at the very beginning of the file, every single byte shifts down. Every single 4 MB block changes, forcing a full re-upload. Advanced systems (Rsync) use rolling hashes to find block boundaries based on content, not fixed offsets

:::interview
You implemented block chunking. A user uploads a popular 2 GB movie. How does your server ensure it doesn't store this 2 GB movie 1 million times?

Because blocks are content-addressed by their SHA-256 hash. When the client attempts to upload the blocks, the server checks its database, sees the hashes already exist, and tells the client to skip the upload.
:::\n
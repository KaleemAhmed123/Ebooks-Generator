## The sync protocol

- **The upload flow:**
  1. Client calculates the hashes of the new blocks
  2. Client asks the server: "Do you have these hashes?"
  3. Server replies: "I have A and C. I need B."
  4. Client uploads B to the Block Store
  5. Client commits the new blocklist `[A, B, C]` to the Metadata Store
- **Streaming Sync (Dropbox):** If Alice uploads a block, and Bob's client is listening, Bob's client can start downloading block B *before* Alice has finished uploading block C and committed the metadata. This drastically reduces end-to-end sync time

### The failure

- Committing the metadata before the blocks are durable in S3. If the metadata says the file has blocks A, B, C, but B failed to upload, anyone who downloads the file gets a corrupted chunk

:::interview
A user complains their file is corrupted. The metadata database shows their file requires block X, but block X does not exist in S3. What race condition occurred?

The client updated the metadata database before confirming the Object Store successfully saved the block. You must always upload blocks first, and commit metadata second.
:::\n
# File Sync

### Requirements and numbers

- File sync (Dropbox, Google Drive) keeps files updated across multiple devices and users
- **In scope:** Upload, download, sync across devices, conflict resolution
- **Out of scope:** Real-time collaborative typing (Google Docs, →18)

| Metric | Requirement |
|---|---|
| **Storage** | 100s of PB, high durability |
| **Bandwidth** | Must aggressively minimise bandwidth |
| **Concurrency** | Multiple users editing the same file |

- **The core constraint:** Users frequently edit small parts of large files. If a user changes one word in a 100 MB PowerPoint, uploading the entire 100 MB file every time they press save is catastrophic for mobile networks and server bandwidth

### The failure

- Treating the file as a single immutable blob in S3. If the file is 1 GB, a 1 KB edit forces a 1 GB upload. You must split files into smaller blocks

:::interview
A user makes a 10-byte change to a 500 MB file. Your client uploads the new 500 MB file, destroying the user's mobile data cap. How do you solve this?

You must chunk the file into blocks (e.g., 4 MB). The client only uploads the single 4 MB block that changed, and tells the server to reconstruct the file using the new block alongside the old ones.
:::\n
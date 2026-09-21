## Content-addressed blocks

- A file is cut into 4 MB blocks, each named by the SHA-256 of its bytes, and the file itself becomes a **blocklist**, the ordered list of those hashes. Dropbox's 2014 post describes exactly this: 4 MB blocks, SHA-256 per block, a file identified by its blocklist. The name of a block is its content, so two identical blocks anywhere in the system have one name and are stored once

```typescript
import { createHash } from "node:crypto";
const BLOCK = 4 * 1024 * 1024;

function blocklist(bytes: Buffer): string[] {
  const hashes: string[] = [];
  for (let off = 0; off < bytes.length; off += BLOCK)
    hashes.push(createHash("sha256").update(bytes.subarray(off, off + BLOCK)).digest("hex"));
  return hashes;                          // the file is this list; the bytes live under these names
}

// v1 = [a, b, c]; edit inside block 2 → v2 = [a, x, c]: one new block to upload (page 4)
```

- Dedupe falls out for free. A block already stored under that hash, by this user or any other, is not uploaded and not stored again; the server answers "have it" from a lookup on the block name (page 4). A popular 200 MB installer shared by a million users is 50 blocks, once
- Versions are cheap for the same reason: two versions of a file share every block they did not change, so history costs the changed blocks plus a blocklist per version
- The hash is also the integrity check: a block downloaded and rehashed must produce its own name, so a corrupt copy is detected by the client, not the user

### The failure

- Fixed 4 MB boundaries and an insert at byte 0. Every byte shifts, every block after the insert hashes differently, and the "one-line edit" uploads the whole file. Fixed boundaries are what Dropbox chose, and the trade is honest: simple, and wrong only for prepends and inserts. **Content-defined chunking**, cutting at boundaries chosen by a rolling hash of the content so an insert shifts only the block it lands in, is the fix, at the cost of a variable block size. Name the trade; do not claim fixed blocks have no failure

## Hashing

- A **hash** turns any input into a fixed-length fingerprint, and the same input always produces the same output
- It only works one way. From the output you cannot recover the input, and that asymmetry is what makes it useful
- Two different inputs producing the same hash is a **collision**, and a hash is considered broken once collisions can be produced deliberately
- MD5 and SHA-1 are both broken in that sense and must not be used for anything security related
- SHA-256 is the sensible default for everything in this section

```js
import { createHash } from "node:crypto"

createHash("sha256").update("kaleem").digest("hex")
// "2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881"
```

- `update` can be called repeatedly, which is how you hash a file without loading it into memory

```js
import { createReadStream } from "node:fs"
import { pipeline } from "node:stream/promises"

const hash = createHash("sha256")
await pipeline(createReadStream("orders.csv"), hash)
const checksum = hash.digest("hex")
```

### What hashing is for, and what it is not for

- **Yes:** file checksums, deduplicating content, cache keys, ETags, detecting whether a record changed
- **No: passwords.** SHA-256 is built to be fast, and fast is exactly wrong there. Booklet 4 covers argon2 and why a password hash must be slow
- **No: comparing secrets.** A hash comparison with `===` returns early on the first differing byte, which leaks information one byte at a time

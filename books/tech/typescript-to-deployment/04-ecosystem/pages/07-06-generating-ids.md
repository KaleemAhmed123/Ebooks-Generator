## Generating ids

- Every row needs an identifier, and letting the database hand out `1, 2, 3` leaks information
- A competitor reading `/orders/847` knows you have taken 847 orders, and can walk backwards through all of them
- Sequential ids also make merging data from two systems painful, because both started at one
- A **random id** fixes both. It is generated in the application, so it exists before the insert, which matters when you need to reference a row you have not written yet
- **UUID** is the standard format, 128 bits written as 36 characters. Version 4 is entirely random
- Its weakness is database performance. Random values land anywhere in the index, so every insert touches a different page
- **UUIDv7** solves that by putting a timestamp in the high bits, so new ids sort near each other and inserts stay local
- **nanoid** takes a different route: 21 characters instead of 36, a larger alphabet, and no format standard to honor
- Use UUIDv7 when the id goes in a database column, and nanoid when it goes in a URL a human might type

```ts
import { randomUUID } from "node:crypto"
import { nanoid } from "nanoid"
import { uuidv7 } from "uuid"

randomUUID()   // "9f1c3e2a-..."  v4, built into Node, nothing to install
uuidv7()       // "01927f3a-..."  time-ordered, index friendly
nanoid()       // "V1StGXR8_Z5jdHi6B-myT"  21 chars, url safe
```

- PostgreSQL 18 added a native `uuidv7()` function, so the database can generate them too
- Never use `Math.random()` for an id. It is not cryptographically random and collisions are reachable

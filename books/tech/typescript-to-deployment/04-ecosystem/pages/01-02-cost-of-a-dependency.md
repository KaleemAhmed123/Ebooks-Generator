## What a dependency actually costs

- Installing is free. Everything after is not

| Cost | What it means |
|---|---|
| Attack surface | its code runs with your process's full access |
| Upgrade work | a major version bump becomes your problem |
| Build time | more to resolve, download and compile |
| Debugging | a stack trace through code you did not write |
| Abandonment | the maintainer stops, and now you maintain it |

### The ladder before you install

1. Does Node already do this? `fetch`, `structuredClone`, `parseArgs`, `glob`, `randomUUID`, `node:test`, `--watch`, `--env-file`
2. Does a package you already have do this?
3. Is it under twenty lines to write?
4. Only then, install

### The one that proves the point

- `left-pad` was eleven lines and broke thousands of builds when it was unpublished
- `is-odd` depends on `is-number`. Both are one line

### Where the ladder does not apply

- Cryptography, authentication, parsing untrusted input, date and time zone math
- Write those yourself and you will get them wrong

## The seven things worth remembering

### 1. One thread runs your JavaScript

- libuv has its own threads. Yours is still one, and blocking it stops every request

### 2. Microtasks outrank everything

- `nextTick`, then promises, then the loop moves on. A `nextTick` loop starves it entirely

### 3. Only four thread pool threads by default

- File reads, DNS lookups, `scrypt` and `zlib` share them. Network IO does not

### 4. Ignoring what `write()` returns is a memory leak

- Use `pipeline`, never `pipe`. It handles backpressure and destroys the chain on error

### 5. Three awaits in a row is usually a bug

- If they do not depend on each other, `Promise.all` them

### 6. `SIGTERM` needs a handler

- Fail readiness, close the server, drain, close resources, and keep a hard timer so a stuck request cannot hold the deploy

### 7. Check what Node already ships before adding a package

- `--watch`, `--env-file`, `node:test`, `fetch`, `structuredClone`, `parseArgs`, `glob`, `randomUUID`

### Next booklet

- **The Node Ecosystem.** Around fifteen libraries in depth and thirty more as one-pagers, from Express and zod to BullMQ, Prisma, pino and OpenAPI

<p class="verified">Verified against node 24 LTS and node 26.8.1, express 5.2.1, undici 8.10.0, on 2026-08-30</p>

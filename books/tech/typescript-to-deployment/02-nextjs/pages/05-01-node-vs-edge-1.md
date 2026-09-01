# Module 5 - Runtime, config and deployment

## Node runtime vs Edge runtime

- Server code has to run somewhere, and Next.js offers two very different somewheres
- The **Node runtime** is a normal Node process in one region, with the whole standard library available
- The **Edge runtime** is a stripped-down JavaScript environment running in many locations close to users, built for near-zero startup
- It gets that startup time by not being Node. There is no `fs`, no TCP sockets, no native modules
- No TCP is the one that matters, because `pg`, `mysql2` and `mongodb` all open TCP connections and none of them work there
- So the choice is not really about speed. It is about whether the code needs anything Node provides

```ts
export const runtime = "nodejs"   // the default
export const runtime = "edge"
```

| | Node | Edge |
|---|---|---|
| Cold start | slower | near zero |
| Location | one region | close to the user |
| Node APIs | all of them | none |
| `fs`, `crypto`, `net` | yes | no |
| TCP database drivers | yes | no |
| Size limit | generous | a few megabytes |

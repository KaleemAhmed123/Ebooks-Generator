## The permission model

- Every dependency you install runs with the full authority of your process. It can read any file, open any socket, spawn any program
- Nothing in Node has historically been able to stop that, which is what makes a single compromised package a total compromise
- The **permission model** restricts what the process itself is allowed to touch, enforced by the runtime rather than by trust
- Turn it on and everything is denied, then you grant back the specific paths and capabilities the program genuinely needs
- It will not stop a determined attacker who can already run code, and it does raise the cost of a supply chain compromise considerably
- The natural place to start is build and CI scripts, where the set of files that should be touched is small and obvious

```bash
node --permission app.js
```

- With `--permission` on, everything is denied until you allow it

```bash
node --permission \
  --allow-fs-read=./config \
  --allow-fs-write=./logs \
  --allow-child-process \
  app.js
```

| Flag | Allows |
|---|---|
| `--allow-fs-read=...` | reading those paths |
| `--allow-fs-write=...` | writing those paths |
| `--allow-child-process` | spawning processes |
| `--allow-worker` | worker threads |
| `--allow-addons` | native addons |

```js
process.permission.has("fs.write", "/tmp")   // true or false
```

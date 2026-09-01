## Source maps and readable stack traces

- Your server runs `dist/index.js`, but you wrote `src/index.ts`
- Without a source map, a crash points at a line you never typed

```bash
// no source map
at handler (/app/dist/index.js:1:2043)

// with source map
at handler (/app/src/routes/user.ts:41:11)
```

### Turning them on

- Set `sourceMap: true` in `tsconfig.json`
- `tsc` then writes an `index.js.map` beside every `index.js`

### Making Node use them

- Node reads source maps automatically from v12.12 with a flag, and by default from v20
- If your traces still look wrong, force it

```bash
node --enable-source-maps dist/index.js
```

### The production question

- Source maps expose your original source to anyone who can read the files
- On a **backend** that is fine - the files were already on your server
- On a **browser bundle** it is a real decision, and usually you upload the map to your error tracker instead of shipping it

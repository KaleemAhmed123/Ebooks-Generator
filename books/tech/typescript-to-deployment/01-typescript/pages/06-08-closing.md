## The five things worth remembering

### 1. Types vanish at runtime

- Everything you wrote is erased before Node sees it
- `as` is a claim, `parse` is a check

### 2. Validate at the boundary, trust inside it

- One `zod` schema per entry point - body, queue message, webhook, env
- Derive the type from the schema so the two cannot drift

### 3. Discriminated unions beat optional fields

- Make impossible states impossible to construct
- Then `never` in a `default` branch tells you every place to update

### 4. Something must run `tsc`

- `tsx`, `esbuild`, `swc` and Node all strip types without checking them
- `tsc --noEmit` in CI, or you are writing annotations for decoration

### 5. Turn `strict` on before the first commit

- Retrofitting `strictNullChecks` into a live codebase is a project
- Starting with it is free

### Next booklet

- **Next.js - the backend half.** Route handlers, server actions, caching layers, Node versus Edge runtime, and when not to use it as your backend

<p class="verified">Verified against typescript 7.0.2, zod 4.5.4, node 24 LTS, on 2026-08-30</p>

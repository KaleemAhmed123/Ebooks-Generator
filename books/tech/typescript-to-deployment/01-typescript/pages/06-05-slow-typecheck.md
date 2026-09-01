## Why your type-check got slow

- TypeScript 7's Go compiler removed most of the old pain
- What is left is usually one of five things

### 1. `skipLibCheck` is off

- Without it, every `.d.ts` in `node_modules` is checked on every run
- Turn it on. You are not going to fix a library's types anyway

### 2. `include` is too wide

- Point it at `src`, not at `.`

### 3. Very large union or mapped types

- A union of a few thousand string literals, or a deeply recursive conditional type
- Usually generated code - an ORM schema, an OpenAPI client

### 4. Missing return type annotations on exported functions

- The compiler must infer the type before anyone can use the module
- Annotating exported functions cuts that work

### 5. One monolithic project

- Split into project references so unchanged packages are not re-checked

```bash
tsc --noEmit --extendedDiagnostics
```

- Start there. It prints where the time actually went, so you fix the real cause

```bash
tsc --noEmit --checkers 4      # tune parallelism
tsc --noEmit --singleThreaded  # for constrained CI runners
```

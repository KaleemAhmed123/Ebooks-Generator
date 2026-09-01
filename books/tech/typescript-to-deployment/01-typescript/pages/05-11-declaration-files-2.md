### Writing your own

- For a library with no types at all, a stub is enough to get moving

```ts
// src/types/legacy-sdk.d.ts
declare module "legacy-sdk" {
  export function connect(url: string): Promise<void>
  export function close(): void
}
```

- Only declare what you actually use. Do not model the whole library

### The escape hatch

```ts
// src/types/legacy-sdk.d.ts
declare module "legacy-sdk"
```

- That types the whole module as `any`
- It silences the error, and it silences every check with it. Use it to unblock, then replace it

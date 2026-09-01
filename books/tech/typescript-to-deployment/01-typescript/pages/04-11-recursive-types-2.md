### The two limits

- **Depth.** TypeScript stops at roughly 50 levels of instantiation and reports `Type instantiation is excessively deep`
- **Cost.** A recursive type over a large object is real work on every type-check, and it is a common reason a build slows down

```ts
type DeepReadonly<T> = T extends (infer U)[]
  ? readonly DeepReadonly<U>[]
  : T extends Function ? T
  : T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T
```

- Handling arrays and functions explicitly avoids mangling them, which the naive version does

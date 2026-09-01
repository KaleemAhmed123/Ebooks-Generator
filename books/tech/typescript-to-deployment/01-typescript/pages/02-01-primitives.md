# Module 2 - The type system you actually use

## Primitives and inference

- The primitive types are `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`
- There is one `number` - no `int`, no `float`, no `double`

```ts
let name: string = "kaleem"
let age: number = 27
let admin: boolean = false
```

### You usually should not write those annotations

- TypeScript **infers** the type from the value
- `name` below is `string` without you saying so

```ts
let name = "kaleem"    // string
const city = "noida"   // "noida"  <- a literal type
```

- `let` infers the **wide** type, because you can reassign it
- `const` infers the **literal** type, because you cannot

### The rule of thumb

- Annotate what you **receive** - function parameters, config, request bodies
- Let TypeScript infer what you **produce**. Locals, return values

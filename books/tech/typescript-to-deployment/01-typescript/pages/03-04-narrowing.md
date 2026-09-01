## Narrowing

- **Narrowing** is TypeScript following your control flow to work out a more specific type
- It happens automatically. You just write normal JavaScript checks

### `typeof` - for primitives

```ts
function print(x: string | number) {
  if (typeof x === "string") x.toUpperCase()   // x is string
  else x.toFixed(2)                            // x is number
}
```

### `instanceof` - for classes

```ts
function report(e: Error | string) {
  if (e instanceof Error) console.log(e.stack)
  else console.log(e)
}
```

### `in` - for object shapes

```ts
type Dog = { bark(): void }
type Cat = { meow(): void }

function speak(pet: Dog | Cat) {
  if ("bark" in pet) pet.bark()
  else pet.meow()
}
```

### Truthiness - and its one trap

```ts
function len(s: string | null) {
  if (s) return s.length    // narrows out null
  return 0
}
```

- Careful: `""` and `0` are falsy too
- If an empty string is valid input, check `s !== null` instead

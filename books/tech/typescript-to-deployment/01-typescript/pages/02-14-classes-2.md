### `private` against `#private`

- TypeScript's `private` is checked at compile time only. At runtime the field is a normal property anyone can read
- `#balance` is a JavaScript private field, genuinely inaccessible from outside, and it survives to runtime
- Use `#` when the privacy has to be real rather than advisory

### Abstract classes

```ts
abstract class Provider {
  abstract send(to: string, body: string): Promise<void>
  log(msg: string) { console.log(msg) }
}
```

- Cannot be instantiated, and any subclass must implement every abstract member

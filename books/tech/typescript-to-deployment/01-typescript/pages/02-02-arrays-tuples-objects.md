## Arrays, tuples and objects

### Arrays

```ts
const ids: number[] = [1, 2, 3]
const names: Array<string> = ["kaleem", "rabiya"]   // same thing
```

- `number[]` and `Array<number>` are identical. Pick one and stay consistent

### Tuples

- A tuple is an array with a **fixed length and a type per position**

```ts
const point: [number, number] = [10, 20]
const entry: [string, number] = ["age", 27]

point[2]   // Tuple type has no element at index 2
```

- Useful for a pair returned from a function, and for `Object.entries` results

### Objects

```ts
const user: { name: string; age: number } = {
  name: "kaleem",
  age: 27,
}
```

## Arrays, tuples and objects - continued

- Writing the shape inline gets old fast
- That is what `interface` and `type` are for, on the next page

## Typing functions

```ts
function addMe(a: number, b: number): number {
  return a + b
}

const sum = addMe(1, 2)
console.log(sum)   // 3
```

- `a` and `b` are the parameters, both annotated as `number`
- The `: number` after the brackets is the **return type**
- You can usually leave the return type off and let it be inferred

### Optional and default parameters

```ts
function greet(name: string, greeting = "hello", loud?: boolean): string {
  const out = `${greeting} ${name}`
  return loud ? out.toUpperCase() : out
}

greet("kaleem")                  // hello kaleem
greet("rabiya", "hi", true)      // HI RABIYA
```

- `greeting = "hello"` gives a default, and the type is inferred as `string`
- `loud?` is optional, so its type is `boolean | undefined`
- Optional parameters must come after required ones

### Rest parameters

```ts
function total(...amounts: number[]): number {
  return amounts.reduce((a, b) => a + b, 0)
}

total(10, 20, 30)   // 60
```

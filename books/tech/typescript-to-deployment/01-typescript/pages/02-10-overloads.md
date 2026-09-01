## Function overloads

- Sometimes one function genuinely has two shapes
- An overload declares each shape separately, then one implementation serves both

```ts
function find(id: string): User
function find(ids: string[]): User[]
function find(arg: string | string[]): User | User[] {
  return Array.isArray(arg) ? arg.map(get) : get(arg)
}

const one = find("u1")          // User
const many = find(["u1", "u2"]) // User[]
```

- The first two lines are the **overload signatures**, the ones callers see
- The third is the **implementation signature**. Callers never see it
- Without overloads, both calls would return `User | User[]` and you would be casting

### Prefer a union first

- Overloads are easy to get subtly wrong
- If a plain union or a generic does the job, use that instead

```ts
function first<T>(items: T[]): T | undefined {
  return items[0]
}
```

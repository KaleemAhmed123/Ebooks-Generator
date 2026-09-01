# Module 3 - Unions, narrowing and guards

## Union types

- A union means "one of these"
- Written with `|`

```ts
type Id = string | number

function get(id: Id) {
  console.log(id)
}

get("u1")   // fine
get(1)      // fine
get(true)   // Argument of type 'boolean' is not assignable
```

### You can only use what every member has

```ts
function shout(id: Id) {
  return id.toUpperCase()
  // Property 'toUpperCase' does not exist on type 'number'
}
```

- `toUpperCase` exists on `string` but not on `number`
- So the union does not allow it until you prove which one you have

```ts
function shout(id: Id) {
  return typeof id === "string" ? id.toUpperCase() : String(id)
}
```

- That `typeof` check is **narrowing**, and it is the whole subject of this module

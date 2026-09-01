### `satisfies`, and why it is not `as`

Three ways to attach a type to a literal, with three different outcomes.

```ts
type Route = { path: string; title: string };

// 1. annotation: checked, but the value is widened
const routes: Record<string, Route> = {
  home: { path: '/', title: 'Home' },
  about: { path: '/about', title: 'About' },
};
routes.hoem;        // no error. the key type is `string`.

// 2. assertion: not checked at all
const bad = { path: '/', ttile: 'Home' } as Route;   // typo compiles

// 3. satisfies: checked, and the literal type is kept
const routes2 = {
  home: { path: '/', title: 'Home' },
  about: { path: '/about', title: 'About' },
} satisfies Record<string, Route>;

routes2.hoem;       // Error: property 'hoem' does not exist
type RouteKey = keyof typeof routes2;   // 'home' | 'about'
```

`satisfies` says "check this against that type, then forget the type and keep
what I actually wrote." It is the right tool for config objects, route maps,
theme tokens, and anything where you want both validation and the exact keys.

**`as` is not a cast, it is a promise.** It silences the compiler and produces no
runtime check. Reserve it for the two cases where you genuinely know more than
the compiler: narrowing a DOM query result, and `as const`.

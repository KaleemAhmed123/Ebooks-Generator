### Generic constraints

An unconstrained generic accepts anything and therefore lets you do nothing with
it. A constraint tells the compiler what is safe.

```ts
// K is guaranteed to be a key of T, so the return type is exact
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const out = {} as Pick<T, K>;
  for (const k of keys) out[k] = obj[k];
  return out;
}

const small = pick(user, ['id', 'name']);   // { id: string; name: string }
pick(user, ['id', 'nmae']);                 // Error, caught at the call site
```

The pattern that shows up most in real code is constraining a component prop to
the keys of the data it renders:

```ts
type Column<T> = {
  key: keyof T & string;
  header: string;
  render?: (row: T) => React.ReactNode;
};

function DataTable<T>({ rows, columns }: { rows: T[]; columns: Column<T>[] }) {
  // ...
}
```

Now a column whose `key` does not exist on the row type is a compile error,
which is the single most useful table-component guarantee there is.

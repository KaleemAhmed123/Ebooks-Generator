### The skeleton

```ts
function go(start: number) {
  out.push([...cur]);                             // a copy, never cur itself
  for (let i = start; i < a.length; i++) {
    if (i > start && a[i] === a[i - 1]) continue; // equal sibling (sorted)
    cur.push(a[i]);                               // choose
    go(i + 1);                                    // i: reuse · 0: order counts
    cur.pop();                                    // undo
  }
}
```

### The trap

- **Listing when only a count or a best value is asked.** The states `(index, remaining)` repeat: memoise them, it is DP (17-01)

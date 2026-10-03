### The skeleton: pick the key

```ts
iv.sort((a, b) => a[0] - b[0]);                // union, cover, merge → by start
iv.sort((a, b) => a[1] - b[1]);                // keep the most, fewest arrows → by end
ev.sort((a, b) => a[0] - b[0] || a[1] - b[1]); // how many open at once → events
```

### The trap

- **Default `sort()` compares strings.** `[10, 2, 1].sort()` is `[1, 10, 2]`; pass `(a, b) => a - b`
- **Not every order problem sorts.** Insert Interval arrives sorted and runs in O(n); positions in a small range use a difference array (03-07)

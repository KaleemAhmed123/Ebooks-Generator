### The skeleton

```ts
while (lo < hi) {                       // minimise: the first x that works
  const mid = lo + ((hi - lo) >> 1);
  if (works(mid)) hi = mid; else lo = mid + 1;
}
while (lo < hi) {                       // maximise: the last x that works
  const mid = lo + ((hi - lo + 1) >> 1); // round up, or lo = mid never moves
  if (works(mid)) lo = mid; else hi = mid - 1;
}
```

### The trap

- **A test that is not monotone.** If `works(x)` can go true, false, true, halving returns an arbitrary boundary. Prove "x works ⇒ x + 1 works" (or the mirror) first

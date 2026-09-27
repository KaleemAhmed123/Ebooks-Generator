# Chapter 4 - In-Place & Index Tricks

## In-Place Tricks <span class="lv lv1"></span>

- **What it is:** the array is the only memory you get. Positions become storage: an index is a hash slot, a sign is a flag, a reversal is a rotation
- **Signal:** "O(1) extra space", "in place", "values in 1..n", "the next arrangement", "rotate by k", "more than half"
- **Mechanism:** a hash set costs O(n). When values are bounded by n, the array already has one slot per value; every move borrows those slots or rearranges them under an invariant

### The moves

| Move | When to use | What it exploits |
|---|---|---|
| **04-02** | 1..n, missing or repeated | v lives at index v − 1 |
| **04-03** | rotate by k in place | three reversals |
| **04-04** | the next arrangement | a falling suffix is maxed |
| **04-05** | more than n/2 or n/3 | different values cancel |
| **04-06** | a circular array | `i % n` reads it twice |

Reader and writer, and the three-way Dutch flag, live in 02-09.

### The skeleton

```ts
for (const v of a) {                    // values in 1..n
  const home = Math.abs(v) - 1;
  a[home] = -Math.abs(a[home]);         // mark v as seen
}
const missing = [];
for (let i = 0; i < a.length; i++) if (a[i] > 0) missing.push(i + 1);
```

### The trap

- **Destroying input the caller still needs.** These moves overwrite values and signs. Ask whether mutation is allowed; if not and space must stay O(1), look for another invariant, such as the array as a linked list (12-04)

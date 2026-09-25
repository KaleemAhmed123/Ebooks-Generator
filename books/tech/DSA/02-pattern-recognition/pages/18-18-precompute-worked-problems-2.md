### Problem 2: Range Minimum Query (Static)

- **Problem:** Given a static array, answer Q queries of the form "What is the minimum element between index L and R?"
- **Why it is a precompute problem:** Large Q, static data. Minimum is idempotent. We need a Sparse Table

**Derivation:**
1. **Precompute:** Build a table where `st[i][j]` is the minimum of a block starting at `i` of length 2ʲ
2. **Base case:** `st[i][0] = arr[i]` (length 2⁰ = 1)
3. **Transition:** `st[i][j] = min(st[i][j-1], st[i + 2^(j-1)][j-1])`. Two blocks of length 2ʲ⁻¹ combine to form a block of length 2ʲ

```ts
function buildSparseTable(arr: number[]): number[][] {
  const n = arr.length;
  const k = Math.floor(Math.log2(n)) + 1;
  const st = Array.from({ length: n }, () => new Array(k).fill(0));

  for (let i = 0; i < n; i++) st[i][0] = arr[i];

  for (let j = 1; j < k; j++) {
    for (let i = 0; i + (1 << j) <= n; i++) {
      st[i][j] = Math.min(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
    }
  }
  return st;
}

function queryMin(st: number[][], L: number, R: number): number {
  const j = Math.floor(Math.log2(R - L + 1));
  return Math.min(st[L][j], st[R - (1 << j) + 1][j]); // O(1) overlap query
}
```

### The pattern across both

- Neither problem uses complex traversal logic
- Both transform the query into an O(1) lookup against a pre-built structure
- The choice of structure is dictated purely by the math of the operation (Sum = invertible → Prefix Map; Min = idempotent → Sparse Table)

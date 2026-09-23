## Derivation worked example: Range Sum

- Let's walk the derivation path for a query problem
- **Problem:** Given an array of n numbers, answer Q queries. Each query provides `L` and `R` and asks for the sum of `arr[L...R]`

### Step 1: Brute Force

- For each query, run a loop from `L` to `R` and sum the elements
- **Complexity:** Each query takes O(n) in the worst case. For Q queries, total time is O(Q × n)

### Step 2: What is repeated?

- If Query 1 asks for sum `0...5` and Query 2 asks for sum `1...4`, we are adding `arr[1] + arr[2] + arr[3] + arr[4]` twice
- The sub-range sums are being re-calculated constantly

### Step 3: Can we remember it?

- Can we just cache the answer for every possible `(L, R)` pair in a 2D matrix?
- `matrix[L][R] = sum`
- **Complexity:** Lookup is O(1). But building the matrix takes O(n²) time and O(n²) space. If n = 10⁵, an O(n²) matrix requires 40GB of RAM. We cannot afford the space

### Step 4: Can we preprocess more efficiently?

- We don't need every `(L, R)` sum. We just need a way to derive it
- The sum from L to R is the sum from 0 to R, minus the sum from 0 to L-1
- **Transformation:** Preprocess the array into a Prefix Sum array, where `prefix[i]` stores the sum from 0 to i. This only takes O(n) space
- **The code:**
```ts
// Preprocessing
const prefix = new Array(n);
prefix[0] = arr[0];
for (let i = 1; i < n; i++) prefix[i] = prefix[i - 1] + arr[i];

// Query
const sum = L === 0 ? prefix[R] : prefix[R] - prefix[L - 1];
```

### The Derivation

- You started with brute force. You saw the repeated sums. You tried to cache them, hit a space limit, and realised you only needed to cache the *prefixes* to compute the rest. The algorithm was derived, not memorised

## Prefix Sums as Precompute

- Prefix Sums are the simplest form of the Precompute pattern. They rely on the mathematical property of **invertibility**

### The mechanism

- You precompute a cumulative array where `prefix[i]` is the sum of all elements from index 0 to `i-1`
- To find the sum of range `[L, R]`, you query `prefix[R+1] - prefix[L]`
- **Why it works:** `prefix[R+1]` contains the sum of everything from 0 to R. `prefix[L]` contains the sum of everything from 0 to L-1. By subtracting the latter from the former, you "chop off" the unwanted prefix, leaving exactly `[L, R]`

### The requirement: Invertibility

- The `-` operator is the inverse of the `+` operator. You can add something, and then reliably "un-add" it later
- Prefix precomputation **only works for invertible operations**:
  - ✅ **Sum:** Inverse is subtraction
  - ✅ **Multiplication:** Inverse is division (if no zeros)
  - ✅ **XOR:** Inverse is XOR (XORing the same number twice cancels it out)
  - ❌ **Minimum:** There is no inverse. If the minimum of a range is 2, and you "chop off" a 2, you have no idea what the new minimum is
  - ❌ **Maximum:** There is no inverse

### Prefix counts and states

- The pattern is not limited to summing numbers. It is incredibly powerful for tracking states
- **Example:** "How many vowels are in the substring `s[L..R]`?"
- Map vowels to 1 and consonants to 0. Build a prefix sum. Now `prefix[R+1] - prefix[L]` answers the query in O(1)

```ts
// Precomputing states
function buildVowelPrefix(s: string): number[] {
  const prefix = new Array(s.length + 1).fill(0);
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  
  for (let i = 0; i < s.length; i++) {
    const isVowel = vowels.has(s[i]) ? 1 : 0;
    prefix[i + 1] = prefix[i] + isVowel;
  }
  return prefix;
}

// Querying in O(1)
function countVowelsInRange(prefix: number[], L: number, R: number): number {
  return prefix[R + 1] - prefix[L];
}
```

:::interview
"Can we use a Prefix Array for range minimum queries?"

No. Prefix arrays rely on the ability to "subtract" or invert a value to isolate a specific range. Addition and XOR are invertible. The minimum operation is not. To answer range minimum queries in O(1) on static data, we need a Sparse Table, which relies on overlap rather than subtraction.
:::

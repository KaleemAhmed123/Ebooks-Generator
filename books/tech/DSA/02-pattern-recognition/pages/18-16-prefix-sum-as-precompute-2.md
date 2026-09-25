### Prefix counts and states

- The pattern is not limited to summing numbers. It also tracks states
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

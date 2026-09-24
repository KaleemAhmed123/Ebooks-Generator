## Counting Structures: Arrays vs Hash Maps

- **What it is:** Using an Array instead of a Hash Map to store frequencies
- **When to reach for it:** The keys are integers within a small, known range (e.g., characters `a-z`, or numbers `1-1000`)
- **Why it works:** An Array is just a Hash Map with a perfect, collision-free hash function: `hash(x) = x`

### The Array Speed Advantage

If you are counting the frequencies of lowercase English letters, you have a choice:
1. `const map = new Map<string, number>()`
2. `const arr = new Array(26).fill(0)`

You should **always** choose the Array.
- **No Hashing Overhead:** A Hash Map must run a string through a hash function and handle potential collisions. The Array does `char.charCodeAt(0) - 97` and accesses memory directly.
- **No Object Allocation:** Hash Maps constantly allocate small nodes in memory for new keys. The Array is allocated once.
- **Spatial Locality:** Array elements are contiguous. CPU caches love them.
- In competitive programming or strict interviews, the Array will execute roughly 10x faster than the Hash Map for character counting.

### When Arrays Fail (Sparse Keys)

- You cannot use an Array if the keys are massive or negative.
- If the problem states: "Array contains numbers between -10^9 and 10^9", you cannot allocate an Array of size 2 billion. It will Memory Limit Exceed.
- If the keys are sparse (e.g., you only have 5 numbers, but their values are in the billions), an Array wastes gigabytes of memory. A Hash Map only allocates memory for the 5 keys that actually exist.

### The Rolling Hash / Sliding Window Count

- Counting Arrays are the backbone of string-based Sliding Window problems.
- **Problem:** "Find all anagrams of string P in string S".
- You maintain a 26-element array for the target frequencies of P.
- You maintain a second 26-element array for the current sliding window in S.
- As the window slides, you do exactly two O(1) operations: `window[newChar]++` and `window[oldChar]--`.
- You then compare the two arrays. Comparing two 26-element arrays takes O(26) = O(1) time.

```ts
function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;
  
  const target = new Array(26).fill(0);
  const window = new Array(26).fill(0);
  
  const aCode = 'a'.charCodeAt(0);
  
  // Initialise target and first window
  for (let i = 0; i < s1.length; i++) {
    target[s1.charCodeAt(i) - aCode]++;
    window[s2.charCodeAt(i) - aCode]++;
  }
  
  // Slide the window
  for (let i = s1.length; i < s2.length; i++) {
    if (arraysEqual(target, window)) return true;
    
    // Add new char on the right
    window[s2.charCodeAt(i) - aCode]++;
    // Remove old char on the left
    window[s2.charCodeAt(i - s1.length) - aCode]--;
  }
  
  return arraysEqual(target, window);
}

function arraysEqual(a: number[], b: number[]): boolean {
  for (let i = 0; i < 26; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
```

:::interview
"Why did you use an array instead of a Map for these character counts?"

Because the alphabet size is bounded to 26 lowercase letters. An array gives us direct memory addressing without the overhead of hashing algorithms or object allocation. It guarantees strict O(1) time and exactly O(26) space, avoiding Hash Map worst-case collision degradations.
:::

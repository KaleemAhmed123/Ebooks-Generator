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

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Permutation in String](https://leetcode.com/problems/permutation-in-string/) (LeetCode 567) | Sliding window with two 26-element count arrays |
| [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/) (LeetCode 438) | Rolling count array comparison in a window |
| [Ransom Note](https://leetcode.com/problems/ransom-note/) (LeetCode 383) | Bounded-key frequency array over letters |

:::interview
"Why did you use an array instead of a Map for these character counts?"

Because the alphabet size is bounded to 26 lowercase letters. An array gives us direct memory addressing without the overhead of hashing algorithms or object allocation. It guarantees strict O(1) time and exactly O(26) space, avoiding Hash Map worst-case collision degradations.
:::

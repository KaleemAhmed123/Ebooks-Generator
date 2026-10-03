### Grouping by signature

- Frequency maps are often used to group items that share a common trait. The key to the map is the "signature", and the value is an array of items.
- **Group Anagrams:** Given an array of strings `["eat","tea","tan","ate","nat","bat"]`, group the anagrams together.
- The signature of an anagram is its sorted string. "eat", "tea", and "ate" all sort to "aet".
- We build a `Map<string, string[]>()`.
- For each string, sort it. Use the sorted string as the key. Push the original string into the array for that key.

```ts
function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  
  for (const str of strs) {
    // Creating the signature (O(K log K) where K is string length)
    const signature = str.split('').sort().join('');
    
    if (!map.has(signature)) map.set(signature, []);
    map.get(signature)!.push(str);
  }
  
  return Array.from(map.values());
}
```

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Valid Anagram](https://leetcode.com/problems/valid-anagram/) (LeetCode 242) | Compare two frequency maps for equality |
| [Group Anagrams](https://leetcode.com/problems/group-anagrams/) (LeetCode 49) | Frequency signature as hash map key |
| [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) (LeetCode 347) | Build frequency map, then extract top K |
| [Longest Palindrome](https://leetcode.com/problems/longest-palindrome/) (LeetCode 409) | Count even/odd frequencies to build palindrome |

:::interview
"Can we optimize Group Anagrams to avoid sorting?"

Yes. Instead of sorting the string to create the signature, we can build a 26-element frequency array for the string. We then join those 26 numbers with a delimiter (like `1,0,0,2...`) and use THAT string as the key. Creating this signature takes O(K) instead of O(K log K), making the whole algorithm strictly O(N × K).
:::

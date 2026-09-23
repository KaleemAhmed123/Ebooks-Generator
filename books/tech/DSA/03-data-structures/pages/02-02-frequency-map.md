## The Frequency Map

- **What it is:** A Hash Map where the keys are elements from the input, and the values are the count of how many times that element appears
- **When to reach for it:** "Anagrams", "Find the majority element", "Sort characters by frequency", "Longest palindrome that can be built"
- **Why it works:** It acts as an **Order Destroyer**. It throws away the spatial sequence of the array and compresses it into pure counts.

### The Mechanism

Building a frequency map is always an O(N) traversal. 

```ts
const freq = new Map<string, number>();

for (const char of str) {
  freq.set(char, (freq.get(char) || 0) + 1);
}
```

Once built, you solve the problem by iterating over the *keys* of the map, not the original array. If a string has 1,000,000 characters but only uses the 26 lowercase letters, iterating over the frequency map takes O(26) time.

### The String Anagram Canonical

- **Problem:** Given two strings `s` and `t`, return true if `t` is an anagram of `s`.
- **Brute force:** Sort both strings and compare them. Sorting takes O(N log N).
- **Frequency Map:** Anagrams have the exact same character frequencies. 
  1. Build a frequency map for `s` (adding counts)
  2. Iterate through `t`, decrementing counts in the map. If a count goes below 0, or the character doesn't exist, return false
  3. Time complexity becomes strict O(N). Space is O(1) because the map size is bounded by the alphabet (max 26 keys).

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

:::interview
"Can we optimize Group Anagrams to avoid sorting?" — Yes. Instead of sorting the string to create the signature, we can build a 26-element frequency array for the string. We then join those 26 numbers with a delimiter (like `1,0,0,2...`) and use THAT string as the key. Creating this signature takes O(K) instead of O(K log K), making the whole algorithm strictly O(N × K).
:::

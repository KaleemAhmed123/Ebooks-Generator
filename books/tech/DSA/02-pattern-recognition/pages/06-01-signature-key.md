# Chapter 6 - Strings

## Signature Key 🟢

- **What it is:** Reduce each string to a *signature* that is equal exactly when two strings are "the same" under the problem's rule. Then grouping, matching and counting are one hash-map pass over signatures
- **Signal:** "group anagrams", "same letters in any order", "follows the same pattern", "is a rotation of", "print all anagrams together"
- **Why it works:** Comparing every pair of strings is O(n²) comparisons. A signature turns the relation into equality, and equality is what hash maps are built for. The skill is choosing a signature that is cheap to compute and loses nothing the rule cares about

:::mint
<svg viewBox="0 0 470 104" role="img" aria-label="Group anagrams. Words eat, tea, tan, ate, nat, bat map to signatures by letter counts. eat, tea and ate share one signature; tan and nat share another; bat is alone. Words with the same signature land in the same bucket." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .a { stroke: #6b6b6b; stroke-width: 0.9; fill: none; }
  </style>
  <text x="20" y="20" class="lb">eat  tea  ate</text><text x="20" y="52" class="lb">tan  nat</text><text x="20" y="84" class="lb">bat</text>
  <path class="a" d="M 110 16 L 150 16"/><path class="a" d="M 110 48 L 150 48"/><path class="a" d="M 110 80 L 150 80"/>
  <rect class="bx" x="152" y="6" width="150" height="20"/><text x="227" y="20" class="lb" text-anchor="middle">a1 e1 t1</text>
  <rect class="bx" x="152" y="38" width="150" height="20"/><text x="227" y="52" class="lb" text-anchor="middle">a1 n1 t1</text>
  <rect class="bx" x="152" y="70" width="150" height="20"/><text x="227" y="84" class="lb" text-anchor="middle">a1 b1 t1</text>
  <path class="a" d="M 304 16 L 330 16"/><path class="a" d="M 304 48 L 330 48"/><path class="a" d="M 304 80 L 330 80"/>
  <rect class="hi" x="332" y="6" width="120" height="20"/><text x="392" y="20" class="lb" text-anchor="middle">[eat, tea, ate]</text>
  <rect class="hi" x="332" y="38" width="120" height="20"/><text x="392" y="52" class="lb" text-anchor="middle">[tan, nat]</text>
  <rect class="hi" x="332" y="70" width="120" height="20"/><text x="392" y="84" class="lb" text-anchor="middle">[bat]</text>
  <text x="152" y="100" class="sm">signature: 26 letter counts, O(L) per word</text>
</svg>
:::

```ts
// Group Anagrams (LeetCode 49)
function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();
  for (const s of strs) {
    const count = new Array(26).fill(0);
    for (const ch of s) count[ch.charCodeAt(0) - 97]++;
    // "#" keeps 1,11 apart from 11,1
    const key = count.join("#");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(s);
  }
  return [...groups.values()];
}
```

### Signatures for other rules

- **Same letters, any order:** sorted string (O(L log L)) or letter counts (O(L)). Counts win for long strings over a small alphabet
- **Same shape ("abb" ~ "egg" ~ "foo"):** replace each character by the index of its first occurrence: `"egg" → 0,1,1`. Used by Find and Replace Pattern (LeetCode 890) and Isomorphic Strings (page 06-03 shows the one-pass version)
- **Rotation of each other:** `t` is a rotation of `s` exactly when `s.length === t.length` and `(s + s).includes(t)`. The doubled string contains every rotation, the same idea as page 04-06
- **Same up to a shift ("abc" ~ "bcd"):** the sequence of differences between neighbouring letters, taken mod 26
- **Anagram inside a longer string:** a fixed window of letter counts that slides (page 02-02); comparing 26 counts per step keeps it O(26 · n)

### The failure

- **Joining counts without a separator.** `[1, 11]` and `[11, 1]` both join to `"111"`. Two different words then share a bucket. Always put a separator between counts
- **Sorting to compare two strings once.** For a single "is t an anagram of s?" question, sorting both is O(L log L) and fine; the signature pays off only when many strings are compared, because each is reduced once

:::interview
"How do you group anagrams in linear time?" — Each word maps to a key that is equal exactly for anagrams: its 26 letter counts. Building a key is O(L), so n words cost O(n · L) plus hashing. Sorting each word as the key also works, at O(n · L log L); I would pick counts when words are long and the alphabet is fixed.
:::

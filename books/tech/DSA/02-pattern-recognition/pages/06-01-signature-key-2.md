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

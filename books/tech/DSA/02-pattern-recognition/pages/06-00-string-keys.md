# Chapter 6 - Strings

## String Keys <span class="lv lv1"></span>

- **What it is:** the moves that belong to strings. A *canonical key* turns "same under a rule" into equality; *growing from the centre* finds palindromes; a *trie* shares prefixes; a *stack* parses nesting; a *rolling hash* compares windows fast
- **Signal:** "anagram", "same pattern", "rotation of", "isomorphic", "palindromic substring", "starts with", "decode / evaluate", "find the pattern in the text"
- **Mechanism:** a key computed once per string groups in one hash-map pass; a palindrome is symmetric about its centre; a trie walks a prefix once; a stack folds nested groups; a rolling hash slides in O(1)

### The moves

| Move | When to use | What it exploits |
|---|---|---|
| **06-01** | group or match under one rule | equal keys = "the same" |
| **06-03** | "follows the same pattern" | two maps check a bijection |
| **06-02** | a contiguous palindrome | palindromes on a centre nest |
| **06-04** | "starts with", autocomplete | a trie shares prefixes |
| **06-06** | nested `k[...]`, expressions | a stack holds the outer context |
| **06-07** | pattern search, repeated substrings | a hash that slides in O(1) |

**Owned elsewhere:** at most k of something → 02-03 · an anagram of p inside s → 02-02 · brackets → 10-02 · subsequence, fewest edits → 17-02.

### The skeleton

```ts
const groups = new Map<string, string[]>();
for (const s of words) {
  const key = signature(s);          // equal exactly when the rule says "same"
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key)!.push(s);
}
```

### The trap

- **"Palindrome" names three problems.** Contiguous → centres (06-02). Characters may be skipped → range DP (17-02). Characters may be rearranged → at most one letter with an odd count

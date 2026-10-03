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

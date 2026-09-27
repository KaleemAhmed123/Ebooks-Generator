LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
DELETE = ['06-00', '06-01', '06-02', '06-03', '06-05']
PAGES = [
('06-00', '06-00-string-keys.md', '# Chapter 6 - Strings\n\n## String Keys ' + LV1, [
 '- **What it is:** two patterns belong to strings alone. A *canonical key* turns "these strings are the same under a rule" into plain equality; *growing from the centre* finds contiguous palindromes',
 '- **Signal:** "anagram", "same pattern", "rotation of", "isomorphic", "palindromic substring"',
 '- **Mechanism:** a key computed once per string makes grouping one hash-map pass instead of comparing every pair. A palindrome is symmetric about its centre, so 2n − 1 centres find them all',
], [
 '### The moves',
 '',
 '| Move | When to use | What it exploits |',
 '|---|---|---|',
 '| **06-01** | group or match under one rule | equal keys = "the same" |',
 '| **06-03** | "follows the same pattern" | two maps check a bijection |',
 '| **06-02** | a contiguous palindrome | palindromes on a centre nest |',
 '',
 '**Owned elsewhere:** at most k of something → 02-03 · an anagram of p inside s → 02-02 · brackets → 10-02 · subsequence, fewest edits → 17-02.',
 '',
 '### The skeleton',
 '',
 '```ts',
 'const groups = new Map<string, string[]>();',
 'for (const s of words) {',
 '  const key = signature(s);          // equal exactly when the rule says "same"',
 '  if (!groups.has(key)) groups.set(key, []);',
 '  groups.get(key)!.push(s);',
 '}',
 '```',
 '',
 '### The trap',
 '',
 '- **"Palindrome" names three problems.** Contiguous → centres (06-02). Characters may be skipped → range DP (17-02). Characters may be rearranged → at most one letter with an odd count',
], None, None),

('06-01', '06-01-signature-key.md', '## Signature Key ' + LV1, [
 '- **What:** reduce each string to a *signature* that is equal exactly when two strings are "the same" under the rule. Grouping, matching and counting become one hash-map pass',
 '- **Spot it:** many strings under one rule: "same letters in any order", "same shape", "rotation of", "same up to a shift". An anagram inside a longer string → 02-02',
 '- **Why:** comparing every pair is O(n²). A signature turns the rule into equality, which a map checks in O(1). Pick one that is cheap and loses nothing the rule cares about',
], [
 '- **Watch out:** joining counts without a separator. `[1, 11]` and `[11, 1]` both join to `"111"`, and two different words share a bucket',
 '- **Other keys:** shape: first-occurrence indices, `"egg" → 0,1,1` · rotation: `(s + s).includes(t)` · shift: letter differences mod 26',
 '- **Also solves:** {LC 242} · {LC 796} · {LC 1657} (same set of letters, same sorted counts)',
], '06-01', '06-01'),

('06-02', '06-02-grow-from-the-centre.md', '## Grow from the Centre ' + LV1, [
 '- **What:** every palindrome has a centre: a character or a gap. Try all 2n − 1 centres and expand while the two ends match',
 '- **Spot it:** a *contiguous* palindrome: the longest, how many, or one deletion allowed. Characters may be skipped → 17-02; rearranged → letter counts',
 '- **Why:** palindromes on one centre are nested, so one expansion finds the longest. 2n − 1 centres × n/2 steps: O(n²) time, O(1) space',
], [
 '- **Watch out:** odd centres only. `"cbbd"` finds `"bb"` only from the gap between the two b\'s',
 '- **Also solves:** {LC 647} (count each successful step) · {LC 680} (at the first mismatch, skip the left or the right character once)',
 '- **Follow-up (O(n)):** Manacher\'s algorithm reuses mirrored radii inside the rightmost palindrome found so far. Name it, then write the centres version',
], '06-02', '06-02'),

('06-03', '06-03-two-way-map.md', '## Two-Way Map ' + LV1, [
 '- **What:** "follows the same pattern" is a *bijection* (a one-to-one pairing). Keep two maps, left → right and right → left, and fail on the first conflict in either',
 '- **Spot it:** each symbol stands for exactly one other and no two share one: "same pattern", "isomorphic", "each letter maps to a unique word". Same letters in any order → 06-01',
 '- **Why:** the forward map catches "a maps to two things". Only the reverse map catches "two things map to one"',
], [
 '- **Watch out:** one map only. `"abba"` against `"dog dog dog dog"` passes a forward check: a → dog and b → dog each look fine',
 '- **Also solves:** {LC 205} · {LC 890} (check each word against the pattern)',
], '06-03', '06-03'),

('06-05', '06-05-string-drills.md', '## Drills: Strings ' + LV1, [
 'The most-asked problems for this chapter. Cover the right column and name the page first.',
 '',
 '| Problem | Page · the deciding fact |',
 '|---|---|',
 '| {LC 49} | 06-01 · key = letter counts with a separator |',
 '| {LC 242} | 06-01 · equal letter counts |',
 '| {LC 796} | 06-01 · `t` is inside `s + s` |',
 '| {LC 1657} | 06-01 · same letter set, same sorted counts |',
 '| {LC 5} | 06-02 · expand from 2n − 1 centres |',
 '| {LC 647} | 06-02 · count each expansion step |',
 '| {LC 680} | 06-02 · one skip at the first mismatch |',
 '| {LC 205} | 06-03 · two maps, characters both sides |',
 '| {LC 290} | 06-03 · two maps, check lengths first |',
 '| {LC 890} | 06-03 · each word against the pattern |',
], [], None, None),
]

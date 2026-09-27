LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
DELETE = ['04-01', '04-02', '04-03', '04-04', '04-05', '04-06', '04-07', '04-08']
PAGES = [
('04-01', '04-01-in-place-tricks.md', '# Chapter 4 - In-Place & Index Tricks\n\n## In-Place Tricks ' + LV1, [
 '- **What it is:** the array is the only memory you get. Positions become storage: an index is a hash slot, a sign is a flag, a reversal is a rotation',
 '- **Signal:** "O(1) extra space", "in place", "values in 1..n", "the next arrangement", "rotate by k", "more than half"',
 '- **Mechanism:** a hash set costs O(n). When values are bounded by n, the array already has one slot per value; every move borrows those slots or rearranges them under an invariant',
], [
 '### The moves',
 '',
 '| Move | When to use | What it exploits |',
 '|---|---|---|',
 '| **04-02** | 1..n, missing or repeated | v lives at index v − 1 |',
 '| **04-03** | rotate by k in place | three reversals |',
 '| **04-04** | the next arrangement | a falling suffix is maxed |',
 '| **04-05** | more than n/2 or n/3 | different values cancel |',
 '| **04-06** | a circular array | `i % n` reads it twice |',
 '',
 'Reader and writer, and the three-way Dutch flag, live in 02-09.',
 '',
 '### The skeleton',
 '',
 '```ts',
 'for (const v of a) {                    // values in 1..n',
 '  const home = Math.abs(v) - 1;',
 '  a[home] = -Math.abs(a[home]);         // mark v as seen',
 '}',
 'const missing = [];',
 'for (let i = 0; i < a.length; i++) if (a[i] > 0) missing.push(i + 1);',
 '```',
 '',
 '### The trap',
 '',
 '- **Destroying input the caller still needs.** These moves overwrite values and signs. Ask whether mutation is allowed; if not and space must stay O(1), look for another invariant, such as the array as a linked list (12-04)',
], None, None),

('04-02', '04-02-send-each-value-home.md', '## Send Each Value Home ' + LV2, [
 '- **What:** when values belong to `1..n`, value `v` lives at index `v − 1`. Swap each value home until every slot holds its owner or a stranger; one scan then reads what is missing or doubled',
 '- **Spot it:** "values in the range 1..n", "find the missing / repeated value", "smallest missing positive", "O(1) extra space". The array must stay unchanged → 12-04',
 '- **Why:** every swap settles at least one value for good, so there are at most n swaps in total, though the loop looks nested',
], [
 '- **Watch out:** ask "does the *home* already hold this value?", not "is this slot right?". Guarded by `a[i] !== i + 1`, `[1, 1]` swaps a 1 for a 1 forever',
 '- **Also solves:** {LC 448} (sign flag: negate `a[|v| − 1]`) · {LC 442} (an already-negative slot is a repeat) · {LC 645} (the one misplaced slot holds the repeat)',
], '04-02', '04-02'),

('04-03', '04-03-reverse-to-rotate.md', '## Reverse to Rotate ' + LV1, [
 '- **What:** a rotation is three reversals: the whole array, then each of the two parts. No buffer; each element moves twice',
 '- **Spot it:** "rotate right by k in place", "reverse the order of words", "cyclically shift". Searching an already-rotated sorted array → 09-03',
 '- **Why:** write the array as `A B`, with `B` the last k items. Reversing all gives `Bᴿ Aᴿ`; reversing each block undoes the inner flip: `B A`',
], [
 '- **Watch out:** forgetting `k %= n`. With k = 10 on 7 items, `reverse(nums, 0, 9)` writes past the end and grows the array',
 '- **Also solves:** {LC 151} (reverse all, then each word) · {LC 48} (a 2-D rotation is transpose, then reverse each row → 05-02)',
], '04-03', '04-03'),

('04-04', '04-04-find-the-dip.md', '## Find the Dip ' + LV2, [
 '- **What:** for the next larger arrangement, change as far right as possible. Find the first dip `a[i] < a[i + 1]` from the right, swap `a[i]` with the smallest larger value to its right, reverse the suffix',
 '- **Spot it:** "next permutation", "next greater number with the same digits", "lexicographically next". The first larger value to the right of *each* position → 10-05',
 '- **Why:** a falling suffix is already its own largest arrangement, so the change must happen at the dip. After the swap the suffix still falls, so reversing sorts it in O(n)',
], [
 '- **Watch out:** duplicates need `>=` in step 1 and `<=` in step 2. With `<` in step 2, `[2, 3, 2]` swaps the dip with the equal 2 and returns `[2, 2, 3]`; the answer is `[3, 2, 2]`',
 '- **Also solves:** {LC 556} (−1 above 2³¹ − 1) · {LC 1053} (the mirror image, no reverse) · {LC 60} (jump there with the factorial number system)',
], '04-04', '04-04'),

('04-05', '04-05-vote-and-cancel.md', '## Vote and Cancel ' + LV1, [
 '- **What:** the Boyer–Moore majority vote. One candidate and a counter: a match adds a vote, a different value cancels one',
 '- **Spot it:** "appears more than ⌊n/2⌋ times", "more than ⌊n/3⌋", "O(1) extra space", "one pass over a stream". Most frequent, with no majority promised → count with a map',
 '- **Why:** each cancellation removes two votes, at most one of them the majority\'s. A value above half can never be cancelled out',
], [
 '- **Watch out:** with no majority promised, verify in a second pass. On `[1, 2, 3]` the vote leaves 3, which appears once',
 '- **Also solves:** {LC 229} (two candidates; test both matches before a zero counter, then verify) · {LC 2780} (vote, then a prefix count)',
], '04-05', '04-05'),

('04-06', '04-06-wrap-around.md', '## Wrap Around ' + LV2, [
 '- **What:** a circular array is a linear array read twice. Walk `0 .. 2n − 1` and read `a[i % n]`: no copy',
 '- **Spot it:** "circular", "the last element is next to the first", "search circularly". Houses in a circle that cannot both be robbed: split into two cases → Module 06',
 '- **Why:** every circular run starts in `0..n − 1` and has length ≤ n, so it appears once in the doubled view',
], [
 '- **Watch out:** for windows of length L, stop at `n + L − 1`. Running 2n steps counts each wrapped window twice: harmless for a max, wrong for a count',
 '- **Also solves:** {LC 503} (monotonic stack; push only in the first lap) · {LC 1652} · {LC 1752} (at most one descent, counted circularly)',
], '04-06', '04-06'),

('04-07', '04-07-in-place-drills.md', '## Drills: In-Place & Index Tricks ' + LV1, [
 'The most-asked problems for this chapter. Cover the right column and name the page first.',
 '',
 '| Problem | Page · the deciding fact |',
 '|---|---|',
 '| {LC 41} | 04-02 · the answer is in 1..n + 1: send values home, scan for a gap |',
 '| {LC 448} | 04-02 · values 1..n: a positive slot at the end is missing |',
 '| {LC 442} | 04-02 · an already-negative slot is a repeat |',
 '| {LC 189} | 04-03 · three reversals, `k %= n` |',
 '| {LC 151} | 04-03 · reverse all, then each word |',
 '| {LC 31} | 04-04 · dip, swap, reverse the suffix |',
 '| {LC 556} | 04-04 · next permutation of the digits |',
 '| {LC 169} | 04-05 · more than half: vote |',
 '| {LC 229} | 04-05 · more than n/3: two candidates, then verify |',
 '| {LC 503} | 04-06 · circular: two laps, push in the first |',
], [], None, None),
]

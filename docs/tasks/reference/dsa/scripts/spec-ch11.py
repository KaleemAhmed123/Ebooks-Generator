LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
DELETE = ['11-00', '11-01', '11-02', '11-03', '11-04', '11-05']
PAGES = [
('11-00', '11-00-bits.md', '# Chapter 11 - Bits\n\n## Bit Manipulation ' + LV1, [
 '- **What it is:** three moves cover most interview bit problems, and the statement picks one by how often values repeat and what it asks to count',
 '- **Signal:** "appears once / twice / three times" next to "O(1) extra space", "count the 1 bits", "power of two", "without using `+` or `−`"',
 '- **Mechanism:** bitwise operators act on each of the 32 columns separately, with no carry between them. So the question is: do whole values cancel, does each column\'s count decide, or is the work once per set bit?',
], [
 '### The moves',
 '',
 '| The statement says | Move | Page |',
 '|---|---|---|',
 '| all but one appear an **even** number of times | XOR everything; pairs cancel | **11-01** |',
 '| all but one appear **k** times, k odd | count each bit column mod k | **11-02** |',
 '| a total over **all pairs** of numbers | `ones · zeros` per column | **11-02** |',
 '| work **per set bit**: count 1s, power of two | peel with `n & (n − 1)` | **11-03** |',
 '',
 '### The skeleton',
 '',
 '```ts',
 'x ^ x;          // 0: pairs cancel, order does not matter      (11-01)',
 '(n >>> b) & 1;  // bit b of n: count one column at a time      (11-02)',
 'n & (n - 1);    // n without its lowest set bit                (11-03)',
 'n & -n;         // only the lowest set bit',
 '```',
 '',
 '### The trap',
 '',
 '- **Values above 32 bits.** JS bitwise operators truncate to 32-bit integers: `(2 ** 32 + 5) | 0` is 5 and `1 << 31` is −2147483648. Masks over 31 items or values up to 10¹⁸ need `BigInt` (`1n << 40n`)',
], None, None),

('11-01', '11-01-let-pairs-cancel.md', '## Let Pairs Cancel ' + LV1, [
 '- **What:** XOR every value together. Anything that appears an even number of times cancels (`x ^ x = 0`, `x ^ 0 = x`), so only the odd-count values remain',
 '- **Spot it:** "every element appears twice except one", "the missing number from 0..n", "the extra character", "two numbers appear once", "O(1) extra space". Others appear three times → 11-02',
 '- **Why:** XOR is addition without carry, per bit. A bit ends up 1 exactly when an odd number of inputs have a 1 there, so pairs vanish',
], [
 '- **Watch out:** XOR when the others appear three times. `[2, 2, 3, 2]` XORs to 1, not the single value 3',
 '- **Also solves:** {LC 136} · {LC 268} (XOR every index and every value) · {LC 389} (XOR the character codes)',
], '11-01', '11-01'),

('11-02', '11-02-count-each-bit-column.md', '## Count Each Bit Column ' + LV2, [
 '- **What:** treat 32-bit numbers as 32 independent columns of 0s and 1s. "All pairs" and "all numbers" questions become one count per column',
 '- **Spot it:** "every element appears three times except one", "sum of Hamming distances over all pairs", "minimum flips so that a OR b equals c". Others appear an even number of times → 11-01',
 '- **Why:** if every value but one repeats k times, each column\'s count is a multiple of k plus the single bit: `count % k` recovers it. For pairs, a column adds `ones · zeros`',
], [
 '- **Watch out:** the sign. Build the answer with `|=`, which stays signed 32-bit. Adding `2 ** b` instead turns a single value of −4 into 4294967292',
 '- **Also solves:** {LC 477} (`ones · (n − ones)` per column) · {LC 1318} (per column: flips needed to reach c\'s bit)',
], '11-02', '11-02'),

('11-03', '11-03-peel-the-lowest-bit.md', '## Peel the Lowest Bit ' + LV1, [
 '- **What:** `n & (n − 1)` deletes the lowest set bit; `n & −n` keeps only it. Loops that peel bits run once per *set* bit, not once per position',
 '- **Spot it:** "count the 1 bits", "is n a power of two", "counting bits for every number up to n", "reverse the bits", "add without + or −". Counts per *position* across many numbers → 11-02',
 '- **Why:** subtracting 1 turns the lowest 1 into 0 and the 0s below it into 1s; AND with the original wipes that tail. A power of two is left with 0',
], [
 '- **Watch out:** `n & (n − 1) === 0` without brackets parses as `n & ((n − 1) === 0)`. And check `n > 0`: 0 passes the test',
 '- **Also solves:** {LC 191} · {LC 231} · {LC 190} (`r = (r << 1) | (n & 1)`, read `r >>> 0`) · {LC 371} (`a ^ b` is the sum, `(a & b) << 1` the carry)',
], '11-03', '11-03'),

('11-04', '11-04-bit-drills.md', '## Drills: Bits ' + LV1, [
 'The most-asked problems for this chapter. Cover the right column and name the page first.',
 '',
 '| Problem | Page · the deciding fact |',
 '|---|---|',
 '| {LC 136} | 11-01 · all others twice: XOR |',
 '| {LC 268} | 11-01 · XOR indices and values |',
 '| {LC 260} | 11-01 · split by the lowest set bit of the XOR |',
 '| {LC 389} | 11-01 · the extra character survives |',
 '| {LC 137} | 11-02 · all others three times: columns mod 3 |',
 '| {LC 477} | 11-02 · `ones · zeros` per column |',
 '| {LC 1318} | 11-02 · compare column by column |',
 '| {LC 191} | 11-03 · peel until 0 |',
 '| {LC 338} | 11-03 · `bits[i] = bits[i & (i − 1)] + 1` |',
 '| {LC 231} | 11-03 · `n > 0 && (n & (n − 1)) === 0` |',
 '| {LC 371} | 11-03 · XOR sums, AND carries |',
], [], None, None),
]

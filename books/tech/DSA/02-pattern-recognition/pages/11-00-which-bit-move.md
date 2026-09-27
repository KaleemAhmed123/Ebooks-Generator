# Chapter 11 - Bits

## Which Bit Move? <span class="lv lv1"></span>

- **What it is:** Three moves cover most interview bit problems. The statement picks one by how often values repeat and what it asks you to count
- **Signal:** "appears once / twice / three times" next to "O(1) extra space", "count the 1 bits", "power of two", "without using `+` or `−`"
- **Why it works:** Bitwise operators act on each of the 32 columns separately, with no carry between them. So every problem is one of three questions: do whole values cancel, does each column's count decide, or is the work once per set bit?

| The statement says | Move | Page |
|---|---|---|
| every value but one appears an **even** number of times | XOR everything; pairs cancel | 11-01 |
| every value but one appears **k** times, k odd | count each bit column mod k | 11-02 |
| a total over **all pairs** ("sum of Hamming distances") | `ones · zeros` per column | 11-02 |
| work **per set bit**: count 1s, "power of two", lowest set bit | peel with `n & (n − 1)` or `n & −n` | 11-03 |
| reverse the bits, or add without `+` | move one bit, or one carry, at a time | 11-03 |

### This chapter, by pattern

- **Pattern 27 · Bit Identities:** 11-01 Let Pairs Cancel, 11-03 Peel the Lowest Bit
- **Pattern 28 · Bit Columns:** 11-02 Count Each Bit Column

### The trap

- **Values above 32 bits.** JS bitwise operators truncate to 32-bit integers first: `(2 ** 32 + 5) | 0` is 5, and `1 << 31` is −2147483648. Masks over more than 31 items, or values up to 10¹⁸, need `BigInt` (`1n << 40n`)

## Bitmask DP 🔴

Standard DP uses an integer `i` to represent "we have processed items 0 through i". 
But what if the problem allows you to process items in *any arbitrary order*? You can't just use `i`. You need to know exactly which specific combination of items you have used so far.

- If you have N items, you could pass around a `Set` or an `Array` of booleans `[true, false, true...]`. 
- **The Problem:** You cannot use a `Set` or an `Array` as an index in a `dp` grid. 
- **The Solution:** A Bitmask. 

### The Bitmask Concept

A bitmask is just a standard integer, but we look at its binary representation to store boolean states.
If N = 4, the integer `5` in binary is `0101`.
- This means item 0 is `true` (used)
- Item 1 is `false` (unused)
- Item 2 is `true` (used)
- Item 3 is `false` (unused)

Instead of a multi-dimensional array or a Hash Map, our state is just a single integer `mask`. We can create a perfectly contiguous `dp` array of size 2^N.

### Essential Bitwise Operations

You must memorize these 4 operations to write Bitmask DP.

1. **Check if the ith item is used:**
   `(mask & (1 << i)) !== 0`
   *(Shifts a 1 to the ith position and performs a logical AND. If the result is not 0, the bit was set).*

2. **Mark the ith item as used (Set the bit):**
   `newMask = mask | (1 << i)`

3. **Mark the ith item as UNUSED (Clear the bit):**
   `newMask = mask & ~(1 << i)`

4. **Toggle the ith item:**
   `newMask = mask ^ (1 << i)`

### Complexity Warning

Bitmask DP state spaces grow at exactly O(2^N). 
Because 2²⁰ is roughly 1 million, Bitmask DP is strictly limited to problems where **N ≤ 20**. 
If you see an interview problem where the input array length is strangely small (like `nums.length <= 16`), it is a massive, screaming red flag that you must use Bitmask DP or Backtracking.

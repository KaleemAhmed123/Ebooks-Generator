## The Wrong Structure Library <span class="lv lv1"></span>

Choosing the *almost* correct data structure is the most common way to fail a technical interview. The code compiles, the logic is sound, but it Time Limit Exceeds (TLE) or Memory Limit Exceeds (MLE). 

Here is a library of the most common structural mistakes and why they fail.

### 1. The "Shift" Queue Trap
- **The Mistake:** Using a JavaScript or Python Array as a Queue (`arr.shift()` or `arr.pop(0)`).
- **The Reality:** Removing the first element of a contiguous array requires physically shifting every remaining element one slot to the left. 
- **The Consequence:** $O(N)$ time per dequeue. If you process $10^5$ elements in BFS, it takes $10^{10}$ operations. TLE.
- **The Fix:** Use a true Linked-List-based Queue, or maintain two pointers (a `head` index) in an oversized array.

### 2. The Unbounded Array Trap
- **The Mistake:** Using an Array for a frequency map when the keys are sparse or massive (e.g., IDs up to $10^9$).
- **The Reality:** `arr[1000000000] = 1` forces the language engine to allocate contiguous memory (or fallback to a slow dictionary mode) for a billion empty slots.
- **The Consequence:** MLE (Memory Limit Exceeded) or crash.
- **The Fix:** Use a Hash Map. Only allocate memory for keys that actually exist.

### 3. The String Key Hash Trap
- **The Mistake:** Using an array of numbers `[A, B]` as a key in a JavaScript/Python Hash Set to track visited grid cells.
- **The Reality:** Sets compare by *reference*, not value. `[1, 2] !== [1, 2]`. The Set will never register a collision, and your BFS will revisit the same cells infinitely.
- **The Consequence:** Infinite loop / TLE.
- **The Fix:** Serialize the state into a string with a delimiter: `"1,2"`.

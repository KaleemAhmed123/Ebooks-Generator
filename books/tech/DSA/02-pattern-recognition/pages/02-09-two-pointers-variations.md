## Two Pointers Variations <span class="lv lv1"></span>

- The standard two pointer techniques (Collision and Read/Write) are the foundation. Interviewers often twist them by applying them to different data structures or adding a second dimension

### Fast/slow pointers

- On linked lists, `slow` moves 1 and `fast` moves 2: the middle (12-03) and cycle detection (12-04)

### Three Pointers (Dutch National Flag)

- **The bottleneck:** "Sort an array of 0s, 1s, and 2s in O(n) time and O(1) space."
- **The insight:** We need three regions: 0s on the left, 2s on the right, and 1s in the middle. We need a pointer for the boundary of each
- **Mechanism:** `low` tracks the boundary for 0s. `high` tracks the boundary for 2s. `mid` explores the unknown elements
- If `arr[mid] === 0`, swap with `low`, increment both
- If `arr[mid] === 1`, it's already in the right place, increment `mid`
- If `arr[mid] === 2`, swap with `high`, decrement `high` (do *not* increment `mid` yet, the swapped element is still unknown)

### The trap

- **Missing the `mid` logic in Three Pointers.** The most common failure is incrementing `mid` when you swap with `high`. You just pulled an unknown number from the end of the array into the `mid` position. You must evaluate it on the next loop iteration, so `mid` must stay where it is

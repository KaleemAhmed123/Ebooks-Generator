### Variations

- **Find the Duplicate Number (LeetCode 287):** values are in `1..n` across `n + 1` slots, so `i → nums[i]` is a function with a cycle, and the cycle's entrance is the duplicated value. Run the same two phases on indices; no mutation, O(1) space
- **Find length of loop (GFG):** after the first meeting, keep one pointer still and walk the other around until it returns; the step count is `c`
- **Remove loop in a linked list (GFG):** find the entrance, then walk from it to the last node of the cycle (the one whose `next` is the entrance) and set its `next` to `null`
- **Happy Number (LeetCode 202):** the sequence `n → sum of squared digits` either reaches 1 or cycles. Slow/fast on numbers detects the cycle without a visited set

### The failure

- **Using a `Set` of visited nodes.** It works, and it is O(n) memory. The question usually adds "O(1) space", which only Floyd meets
- **Restarting both pointers.** Phase 2 moves one pointer from the head and one from the *meeting point*. Restart both from the head and they are equal before the first step, so phase 2 returns the head whatever the real entrance is. And for loop removal, when the entrance is the head itself, "the node before the entrance" must be found by walking the cycle, not by stepping from the head

:::interview
"Why does resetting one pointer to the head find the start of the cycle?" — If the tail has length a and the pointers meet b steps into a cycle of length c, then fast has walked a + b + k·c steps and slow a + b, and fast walked twice as far, so a = k·c − b. From the meeting point, a steps is k full laps minus b, which lands exactly on the entrance; from the head, a steps also lands there. So stepping both one at a time, they meet at the entrance.
:::

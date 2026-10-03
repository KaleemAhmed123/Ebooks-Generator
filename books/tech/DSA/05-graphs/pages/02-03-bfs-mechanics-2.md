### The Layer-by-Layer Trick

Notice the `const levelSize = queue.length - head;` block. 
- If you just pop from the queue and push neighbors indiscriminately, you lose track of which "radius" or "distance level" you are currently processing. 
- By taking a snapshot of the queue size before the inner loop, you guarantee that the inner `for` loop processes *exactly* the nodes at the current distance, and leaves the newly pushed neighbors for the next iteration of the `while` loop.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Word Ladder](https://leetcode.com/problems/word-ladder/) (LeetCode 127) | BFS over implicit word graph for shortest transformation |
| [Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/) (LeetCode 1091) | Layer-by-layer BFS on a grid with 8-directional moves |
| [Open the Lock](https://leetcode.com/problems/open-the-lock/) (LeetCode 752) | BFS on state-space to find minimum turns |
| [Jump Game III](https://leetcode.com/problems/jump-game-iii/) (LeetCode 1306) | BFS to check reachability from a starting index |

### The trap

- **Delayed Visited Marking:** A catastrophic mistake is adding a node to the queue, but waiting to mark it `visited` until you *pop* it off the queue.
- **Why it breaks:** If node `A` and node `B` both point to `C`, `A` pushes `C` to the queue. If `C` isn't marked visited immediately, `B` will also push `C` to the queue. `C` gets processed twice. In dense graphs, this causes the queue to explode exponentially, resulting in Memory Limit Exceeded.
- **The fix:** Always `visited.add()` in the exact same block of code where you `queue.push()`.

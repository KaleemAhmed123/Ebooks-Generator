### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Reconstruct Itinerary](https://leetcode.com/problems/reconstruct-itinerary/) (LeetCode 332) | Hierholzer's on a directed flight graph for Eulerian path |
| [Cracking the Safe](https://leetcode.com/problems/cracking-the-safe/) (LeetCode 753) | De Bruijn sequence via Eulerian circuit on overlap graph |
| [Valid Arrangement of Pairs](https://leetcode.com/problems/valid-arrangement-of-pairs/) (LeetCode 2097) | Chain pairs end-to-start, direct Eulerian path construction |

### The trap

- **Stuck early:** A naive candidate will just do a standard DFS and return the path. 
- **Why it breaks:** If there are two loops attached to the start node, a standard DFS might take Loop A, get back to start, think it's "done" because the path connects, and completely miss Loop B. 
- **The fix:** The post-order traversal (`path.push` happens *after* the `while` loop finishes) is the key insight of Hierholzer's. It ensures that if the algorithm gets stuck on Loop A, it puts Loop A at the end of the path array, and seamlessly splices Loop B into the middle as it backtracks.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Word Ladder](https://leetcode.com/problems/word-ladder/) (LeetCode 127) | Classic optimization: expand smaller frontier from both ends |
| [Open the Lock](https://leetcode.com/problems/open-the-lock/) (LeetCode 752) | Known start and target state, bidirectional cuts branching |
| [Minimum Genetic Mutation](https://leetcode.com/problems/minimum-genetic-mutation/) (LeetCode 433) | Fixed start and end gene, bidirectional BFS prunes search |

### The trap

- **When it doesn't work:** You can only use Bidirectional BFS if you explicitly know the exact target state (or target states) in advance. If the problem asks "Find the shortest path to *any* cell containing the number 9", you cannot run it backward, because you don't have a single defined starting point for the backward search (unless you do a multi-source backward BFS from all 9s, but that gets complicated).

## Frontier worked problems <span class="lv lv2"></span>

### Problem 1: Word Ladder (BFS frontier)

- **Problem:** Given two words and a dictionary, find the shortest transformation sequence from `beginWord` to `endWord`, changing one letter at a time. Each intermediate word must exist in the dictionary
- **Why it is a frontier problem:** Each word is a node. Two words that differ by one letter are connected by an edge. All edges cost 1. This is BFS on an implicit graph

**Derivation:**
1. **Brute force:** Try all possible sequences recursively. Exponential
2. **What's repeated?** We visit the same word from different paths. The first visit is always the shortest (unit-cost edges)
3. **Frontier pattern:** Use BFS. The frontier is a queue of words at the current distance. Each expansion generates all 1-letter variants. Mark visited to avoid reprocessing

```ts
function ladderLength(begin: string, end: string, dict: Set<string>): number {
  const frontier: string[] = [begin];
  const visited = new Set<string>([begin]);
  let depth = 1;
```

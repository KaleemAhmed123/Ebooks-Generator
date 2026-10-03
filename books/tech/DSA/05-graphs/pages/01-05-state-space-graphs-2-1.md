### Implementation Concept

```ts
// Using BFS to find the shortest path in a State-Space
function solvePuzzle(startState: string, targetState: string): number {
  const queue = [{ state: startState, moves: 0 }];
  const visited = new Set<string>();
  visited.add(startState);

  let head = 0;
  while (head < queue.length) {
    const { state, moves } = queue[head++];

    if (state === targetState) return moves;

    // generateNeighbors handles the logic of finding '0' and swapping it
    // with valid adjacent indices based on 2x3 math
    const neighbors = generateNeighbors(state);
    
    for (const next of neighbors) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push({ state: next, moves: moves + 1 });
      }
    }
  }
  return -1;
}
```

### The trap

- **Copy overhead:** State-space BFS is extremely prone to TLE because every edge traversal requires copying/mutating a string or array.
- **The fix:** Ensure your state representation is as minimal as possible. If the state can fit into a 32-bit integer (e.g., bitmasking), use an integer. It is exponentially faster than string slicing.

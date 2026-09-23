## State-Space Graphs

- A **State-Space Graph** is the final boss of implicit graphs. The nodes aren't `(r, c)` coordinates. The nodes are the *entire state* of a system.
- **Example: The Sliding Puzzle.** You are given a 2 times 3 board with tiles 1 through 5 and one empty space (`0`). You can slide an adjacent tile into the empty space. What is the minimum number of moves to solve the puzzle?

### Recognizing the State

- The "Node" is the arrangement of the board: `[[1,2,3], [4,0,5]]`.
- The "Edges" are the valid board states you can reach by sliding one tile.
- Minimum number of moves = BFS on this massive, invisible graph.

### Flattening the State

- An array of arrays `[[1,2,3], [4,0,5]]` is annoying to pass around, copy, and hash in a Set.
- **The Trick:** Flatten it into a single string: `"123405"`.
- Now, sliding the `0` with the `5` just means swapping two characters in a string. The string `"123450"` is a node. The string `"123045"` is another node.

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

:::interview
"Could we use DFS to solve the Sliding Puzzle?" — No. DFS dives deep. It might find a path that takes 50,000 moves, and it will eventually explore the shortest path, but keeping track of the absolute shortest path while avoiding cycles in a massive state-space is incredibly inefficient with DFS. If you need the *minimum* operations on an unweighted graph, it must be BFS.
:::

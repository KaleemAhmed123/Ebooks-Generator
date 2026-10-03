## State-Space Graphs <span class="lv lv2"></span>

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

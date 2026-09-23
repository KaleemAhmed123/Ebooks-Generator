## Bidirectional BFS 🟡

- **The Problem:** You are running a BFS from node `A` to node `B` in a massive implicit graph (e.g., finding the shortest path in a Rubik's Cube state space). The branching factor is large (e.g., B = 10 choices per state). 
- If the shortest path is depth D = 6, standard BFS explores B^D = 10⁶ = 1,000,000 nodes.
- **The Solution:** Run two simultaneous BFS traversals—one starting from `A` moving forward, and one starting from `B` moving backward. When their `visited` sets intersect, you have found the shortest path.
- The new depth for each search is D/2 = 3. Each search explores 10³ = 1,000 nodes. Total nodes explored: 2,000. You just sped up the search by a factor of 500x.

:::mint
<svg viewBox="0 0 470 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bidirectional BFS intersection">
  <!-- Forward search -->
  <circle cx="50" cy="70" r="10" fill="#1d4e89" />
  <path d="M 50 20 A 50 50 0 0 1 50 120" fill="none" stroke="#1d4e89" stroke-width="2" />
  <path d="M 50 0 A 70 70 0 0 1 50 140" fill="none" stroke="#1d4e89" stroke-width="2" />
  <text x="35" y="65" class="s" fill="#ffffff">A</text>
  
  <!-- Backward search -->
  <circle cx="420" cy="70" r="10" fill="#ef476e" />
  <path d="M 420 20 A 50 50 0 0 0 420 120" fill="none" stroke="#ef476e" stroke-width="2" />
  <path d="M 420 0 A 70 70 0 0 0 420 140" fill="none" stroke="#ef476e" stroke-width="2" />
  <text x="415" y="65" class="s" fill="#ffffff">B</text>
  
  <!-- Intersection -->
  <circle cx="235" cy="70" r="15" fill="#e2fcf3" stroke="#12121a" stroke-width="2" stroke-dasharray="4" />
  <text x="215" y="105" class="s">Intersection!</text>
</svg>
:::

### Implementation Strategy

Instead of using a standard array `Queue`, Bidirectional BFS is often implemented using two `Set`s (representing the frontiers of the two searches) because checking for intersections between two sets is O(1) per node.

1. Initialize `forwardSet = { A }` and `backwardSet = { B }`.
2. Determine which set is smaller. (Always expanding the smaller frontier minimizes the branching factor).
3. Create a `nextFrontier` set. Iterate through all nodes in the smaller set.
4. For each neighbor:
   - If it exists in the *other* set, you're done! Return `currentDistance + 1`.
   - If it hasn't been globally visited, add it to `nextFrontier`.
5. Replace the smaller set with `nextFrontier`. Increment `distance`.
6. Repeat until sets intersect or one set becomes empty (meaning no path exists).

### The trap

- **When it doesn't work:** You can only use Bidirectional BFS if you explicitly know the exact target state (or target states) in advance. If the problem asks "Find the shortest path to *any* cell containing the number 9", you cannot run it backward, because you don't have a single defined starting point for the backward search (unless you do a multi-source backward BFS from all 9s, but that gets complicated).

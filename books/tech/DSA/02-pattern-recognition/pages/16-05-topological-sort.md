## Topological Sort (Kahn's Algorithm)

- **What it is:** Ordering the vertices of a DAG such that for every directed edge U to V, vertex U comes before V in the ordering
- **Why it works (Kahn's approach):** It relies on **In-Degree** (the number of incoming edges). A node with an in-degree of 0 has no prerequisites. We can safely process it. Processing a node means removing its outgoing edges, which reduces the in-degree of its neighbors. This unlocks new nodes

### The visual mechanism

- Edges: `A -> C`, `B -> C`, `C -> D`

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Kahn's algorithm for Topological Sort. Nodes A and B have 0 in-degree. We process them, which removes their edges to C, reducing C's in-degree to 0. Then we process C." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>

  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <!-- Nodes -->
  <circle class="hi" cx="60" cy="40" r="15" />
  <text x="60" y="44" class="lb" text-anchor="middle">A</text>
  <text x="60" y="15" class="sm" text-anchor="middle" fill="#2d6a4f">In: 0</text>
  
  <circle class="hi" cx="60" cy="90" r="15" />
  <text x="60" y="94" class="lb" text-anchor="middle">B</text>
  <text x="60" y="118" class="sm" text-anchor="middle" fill="#2d6a4f">In: 0</text>

  <circle class="bx" cx="160" cy="65" r="15" />
  <text x="160" y="69" class="lb" text-anchor="middle">C</text>
  <text x="160" y="40" class="sm" text-anchor="middle">In: 2</text>

  <circle class="bx" cx="260" cy="65" r="15" />
  <text x="260" y="69" class="lb" text-anchor="middle">D</text>
  <text x="260" y="40" class="sm" text-anchor="middle">In: 1</text>

  <!-- Edges -->
  <path class="a" d="M 75 44 L 140 60" marker-end="url(#arrow)" />
  <path class="a" d="M 75 86 L 140 70" marker-end="url(#arrow)" />
  <path class="a" d="M 175 65 L 240 65" marker-end="url(#arrow)" />
  
  <!-- Explanation -->
  <text x="320" y="40" class="sm">1. Queue A and B (In-degree 0)</text>
  <text x="320" y="60" class="sm">2. Pop A, remove A->C. (C in-degree: 1)</text>
  <text x="320" y="80" class="sm">3. Pop B, remove B->C. (C in-degree: 0)</text>
  <text x="320" y="100" class="sm">4. Queue C.</text>
</svg>
:::

### The Template (Kahn's BFS)

```ts
function topologicalSort(numCourses: number, prerequisites: number[][]): number[] {
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);
  
  // 1. Build Graph and In-Degree array
  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course); // prereq -> course
    inDegree[course]++;
  }
  
  // 2. Initialise Queue with 0-in-degree nodes
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  
  const order: number[] = [];
  
  // 3. Process
  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);
    
    // "Remove" outgoing edges
    for (const neighbor of adj[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  // 4. Cycle Detection Check
  if (order.length !== numCourses) return []; // Cycle detected
  return order;
}
```

### The constraint fingerprint

- You are given a list of pairs `[u, v]` indicating a relationship.
- Total nodes V ≤ 10⁵, Total edges E ≤ 10⁵.
- You need to find an order, or check if an order is possible.
- Kahn's algorithm processes each vertex and edge exactly once: O(V + E) time and space.

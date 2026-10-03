## Implicit Graphs <span class="lv lv1"></span>

- An **Implicit Graph** is a graph that is too large or too infinite to store in memory.
- Instead of building an `adjList`, you calculate a node's neighbors *on the fly*.

### The 2D Grid

- The most common implicit graph in interviews is the 2D Grid (e.g., a maze, a map of islands).
- You do not need to build an adjacency list for a grid. Every cell `(r, c)` is a node. Its neighbors are mathematically defined as `(r+1, c)`, `(r-1, c)`, `(r, c+1)`, and `(r, c-1)`.

:::mint
<svg viewBox="0 0 470 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Implicit graph on a 2D grid">
  <!-- Grid -->
  <rect x="150" y="20" width="30" height="30" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  <rect x="180" y="20" width="30" height="30" fill="#e2fcf3" stroke="#12121a" stroke-width="1" />
  <rect x="210" y="20" width="30" height="30" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  
  <rect x="150" y="50" width="30" height="30" fill="#e2fcf3" stroke="#12121a" stroke-width="1" />
  <rect x="180" y="50" width="30" height="30" fill="#1d4e89" stroke="#12121a" stroke-width="2" />
  <rect x="210" y="50" width="30" height="30" fill="#e2fcf3" stroke="#12121a" stroke-width="1" />
  
  <rect x="150" y="80" width="30" height="30" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  <rect x="180" y="80" width="30" height="30" fill="#e2fcf3" stroke="#12121a" stroke-width="1" />
  <rect x="210" y="80" width="30" height="30" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  
  <text x="190" y="70" class="s" fill="#ffffff">u</text>
  
  <!-- Arrows -->
  <path d="M195 50 L195 35" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  <path d="M195 80 L195 95" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  <path d="M180 65 L165 65" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  <path d="M210 65 L225 65" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
</svg>
:::

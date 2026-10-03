## Linked List: When it actually matters <span class="lv lv1"></span>

- **What it is:** A sequence of nodes where each node contains a value and a pointer to the next node, scattered randomly across memory
- **The Contract:** O(1) insertion/deletion at any known pointer, but O(N) to find any index
- **Why it works:** Because memory is not contiguous, you do not have to shift elements when inserting. You simply rewrite two pointers to splice the new node into the chain

### The theoretical advantage

- In an Array, inserting at index 0 takes O(N) because N elements must physically move
- In a Linked List, inserting at the head takes O(1). You create a new node, point it to the current head, and declare the new node as the head
- This theoretical O(1) splice is why Linked Lists are taught: they solve the array's shifting bottleneck

### The devastating practical reality (Cache Misses)

- In modern computing, Linked Lists are almost never used in high-performance systems
- Because nodes are allocated one by one, they end up scattered across the RAM
- When you traverse an array, the CPU loads 64 bytes of contiguous memory into the ultra-fast L1 cache. Array traversal is screamingly fast
- When you traverse a Linked List, every single `node.next` is a random memory jump. This causes a **Cache Miss**, forcing the CPU to wait hundreds of cycles for the RAM to fetch the next node
- In practice, a Dynamic Array shifting 1,000 elements is often faster than a Linked List traversing 1,000 nodes, purely because of hardware caching

## Hash Maps & Hash Sets

- **What it is:** A data structure that maps keys to values (Map) or stores unique keys (Set) using a hash function
- **The Contract:** Average O(1) insertion, deletion, and lookup. Worst-case O(N)
- **Why it works:** A hash function takes an arbitrary key (like a string or object), mathematically scrambles it, and outputs an integer. That integer is used as a direct index into an underlying array, achieving O(1) spatial access

### Hash Map vs Hash Set

- **Hash Set:** Used when you only care about **existence**. "Have I seen this user ID before?" It stores only keys.
- **Hash Map:** Used when you care about **association**. "How many times have I seen this user ID?" or "What is the IP address for this domain?" It stores key-value pairs.
- Under the hood, a Hash Set is literally just a Hash Map where the values are dummy variables (like `true` or `null`).

### The Two-Sum Revolution

- Hash Maps fundamentally alter problem-solving because they act as **time machines**.
- In the classic Two-Sum problem (Find two numbers that sum to K), the brute force approach is to check every pair (O(N²)).
- With a Hash Map, you iterate through the array once. At number `X`, you ask the map: "Have I previously seen `K - X`?". If yes, you are done. If no, you store `X` in the map and continue.
- **The Insight:** A Hash Map allows you to query the entire history of your traversal in O(1) time. It turns a nested loop into a single loop with a lookup.

### The Worst-Case Reality (Collisions)

- The hash function must output an integer within the bounds of the underlying array (e.g., indices 0 to 999). 
- Because there are infinite possible keys and finite array indices, two different keys will eventually hash to the exact same index. This is a **Collision**.
- Most Hash Maps resolve this using **Chaining**: the array index stores a Linked List of all key-value pairs that collided there.
- If every single key you insert collides at index 0, you have built a Linked List. Your O(1) lookup just degraded to O(N).
- This is why the contract says *Average* O(1). In competitive programming, attackers can intentionally feed your Hash Map inputs designed to collide, causing TLE. (This is why CPers sometimes use custom hash functions).

:::interview
"How does a Hash Map resize itself?"

Similar to a Dynamic Array. When the map gets too full (measured by the 'Load Factor', usually around 70% capacity), it allocates a new, larger array. It must then re-hash every single key from the old map and place them into the new array, because the array bounds (and thus the modulo arithmetic of the hash function) have changed. This is an O(N) operation.
:::

### The failure

- A common interview mistake is describing a recursive algorithm that branches twice at each level as O(n²). It is O(2ⁿ).
- n² means doubling the input quadruples the time. 2ⁿ means adding **one** element to the input doubles the time. The difference is the universe exploding

:::interview
"What is the time complexity of looking up a value in a hash map?"

O(1) on average, assuming a good hash function and load factor. But O(n) in the worst case if every key collides and chains into a single linked list.
:::

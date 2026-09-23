## Space complexity

- Space complexity measures how much **extra** memory an algorithm needs as the input grows. It is measured in Big-O, exactly like time
- "Extra" is the key word. If a problem gives you an array of size n and you modify it in-place, your space complexity is O(1). You don't count the input itself
- If you create a new array of size n to return the answer, that is O(n) auxiliary space

### The call stack is not free

- The most common mistake candidates make is claiming O(1) space for recursive algorithms
- Every recursive function call adds a frame to the call stack containing local variables and return addresses
- The space used by the call stack is equal to the **maximum depth** of the recursion tree

```ts
// Time: O(n). Space: O(n) because the call stack gets n frames deep
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Time: O(n). Space: O(1) because it uses constant extra variables
function factorialIterative(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
```

### Common space constraints

- **O(1):** Two pointers, sliding window, in-place sorting (QuickSort is O(log n) due to stack, HeapSort is O(1))
- **O(log n):** The call stack space for a balanced divide-and-conquer algorithm (like Merge Sort or balanced QuickSort)
- **O(n):** Hash maps, visited arrays for graph traversal, dynamic programming arrays, the call stack for a skewed tree DFS
- **O(n²):** 2D dynamic programming tables, adjacency matrices for graphs

### The trap

- **Assuming garbage collection saves you.** If you create n objects inside a loop and discard them, the peak memory might still be O(n) if the garbage collector hasn't run yet. Space complexity is about the **peak** memory held at any one instant
- **Confusing output space with auxiliary space.** Some interviewers do not count the memory required to hold the returned answer. Clarify this immediately: "Are we counting the return array in the space complexity?"

:::interview
"Can you traverse this tree in O(1) space?" — Standard DFS is O(h) space where h is the height, due to the call stack. BFS is O(w) space where w is the max width, due to the queue. To achieve true O(1) space, we must use Morris Traversal, which temporarily modifies the tree's empty right pointers to trace its way back.
:::

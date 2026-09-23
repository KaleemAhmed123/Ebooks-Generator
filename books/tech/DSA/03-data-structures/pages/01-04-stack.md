## Stacks

- **What it is:** A Last-In, First-Out (LIFO) interface built on top of an array or linked list
- **The Contract:** O(1) to add to the top, O(1) to remove from the top. No access to the middle or bottom
- **Why it works:** By intentionally restricting what you can do (no random access), the stack perfectly models hierarchical dependency and chronological undo

### The Structural Meaning

- A Stack is not just a restricted array. It is the physical manifestation of **dependency resolution**
- Whenever an operation cannot complete until a future, unknown operation completes, you have a stack problem
- **Valid Parentheses:** When you see an open bracket `(`, it is an unresolved dependency. It must wait until you find a matching `)`. If you see `([`, the `[` must be resolved *before* the `(`. The most recent dependency must be resolved first. That is LIFO

### The Call Stack

- Every time a function calls another function, the computer pushes the current execution context onto a hardware Stack
- When the inner function finishes, it pops off, and the outer function resumes
- **The Insight:** Recursion is not magic. It is just a function using the hardware stack to pause its own execution. Any recursive algorithm (like DFS) can be rewritten iteratively by manually pushing state objects onto your own array-based stack

```ts
function isValid(s: string): boolean {
  // We use an array as a stack. We ONLY use push() and pop()
  const stack: string[] = [];
  const map: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  
  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char); // Unresolved dependency
    } else {
      // Must resolve the MOST RECENT dependency
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}
```

### The array vs linked list implementation

- In interviews, if asked to implement a Stack from scratch, use a Dynamic Array
- Appending to the end of an array (`push`) and removing from the end (`pop`) are O(1) amortised
- You *could* use a Linked List (inserting/removing at the head is strict O(1)), but allocating a new Node object for every push is significantly slower in practice than array appending

:::interview
"When would you use a Stack instead of an Array?" — When I want to enforce an architectural constraint. If a problem requires LIFO logic, using a raw array allows future developers (or me) to accidentally access the middle of the array, breaking the logic. Wrapping it in a Stack class guarantees only the correct operations are performed.
:::

### The trap

- **Assuming garbage collection saves you.** If you create n objects inside a loop and discard them, the peak memory might still be O(n) if the garbage collector hasn't run yet. Space complexity is about the **peak** memory held at any one instant
- **Confusing output space with auxiliary space.** Some interviewers do not count the memory required to hold the returned answer. Clarify this immediately: "Are we counting the return array in the space complexity?"

:::interview
"Can you traverse this tree in O(1) space?"

Standard DFS is O(h) space where h is the height, due to the call stack. BFS is O(w) space where w is the max width, due to the queue. To achieve true O(1) space, we must use Morris Traversal, which temporarily modifies the tree's empty right pointers to trace its way back.
:::

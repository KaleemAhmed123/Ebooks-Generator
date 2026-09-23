## Phase 6: Dry Run and Edge Cases

You finished writing the code. You say, "I think that's it."
The interviewer says, "Okay, let's trace it."
If you wait for the interviewer to prompt the trace, you lost a point. You must initiate it.

### The Manual Trace

Do not immediately hit the "Run Code" button (if you have one). 
1. Pick a small, trivial input. E.g., `[2, 4, 1]`.
2. Say, *"Let me dry-run this to be sure."*
3. Highlight line 1. *"Left is 0, right is 2."*
4. Highlight the `while` loop. *"0 is less than 2, we enter."*
5. Explicitly track variables. Write them as comments if you need to: `// mid = 1, arr[1] = 4`.

This proves you can mentally execute code—a crucial skill for debugging production systems without logging tools.

### Checking the Edge Cases

Go back to the edge cases you wrote down in Phase 1. Look at your code and verify it handles them.

- *"What if the array is empty?"* -> *"Ah, my `let right = arr.length - 1` will become `-1`. The `while (left <= right)` will evaluate to `0 <= -1` which is false, so it bypasses the loop and returns `-1`. That's correct."*
- *"What if the target is not in the tree?"* -> *"The DFS will eventually hit a `null` node and return `false`, which propagates up. Correct."*

### Finding a Bug

If you find a bug during your dry run, **rejoice**. This is a massive positive signal. 
*"Oh, wait. When `i` is at the last index, `i+1` will be out of bounds here. I need to change my loop condition to `i < arr.length - 1`."*

Finding your own bugs proves self-sufficiency. If the interviewer has to point out the out-of-bounds error, it counts against you.

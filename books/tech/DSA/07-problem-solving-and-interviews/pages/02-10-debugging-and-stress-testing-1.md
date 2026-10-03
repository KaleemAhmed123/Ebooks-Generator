## Debugging and Stress Testing <span class="lv lv1"></span>

In an interview, you write code, it fails the sample test case, and the interviewer says, "Can you debug this?"
Your response in the next 60 seconds determines if you get hired.

### The Wrong Way to Debug

- **Staring:** Staring at the code hoping the bug reveals itself.
- **Random mutation:** Changing `<` to `<=` or `i+1` to `i-1` and running it again to see if it passes. This screams "I don't know what my code is doing."
- **Overwhelming `console.log`:** Putting `console.log(dp)` inside a triple nested loop and trying to read 5,000 lines of output.

### The Right Way: The Hypothesis Method

1. **State a hypothesis out loud:** "The answer is returning 0, which means my `Math.min` is probably catching the default initialization value."
2. **Targeted logging:** Log the variables *right before* the critical transition. 
3. **Trace one edge case:** Pick the smallest possible input that fails (e.g., `arr = [2, 1]`) and manually trace it on the whiteboard.

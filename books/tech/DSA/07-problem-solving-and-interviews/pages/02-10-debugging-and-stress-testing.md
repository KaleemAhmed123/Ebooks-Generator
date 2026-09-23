## Debugging and Stress Testing

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

### Stress Testing (Competitive Programming)

If you are taking an online assessment (OA) or in a CP contest, you might get a "Wrong Answer" on a hidden test case. You can't see the input. How do you find the bug?
You use a **Stress Test**.

A stress test requires three things:
1. **Your fast algorithm** (that has a bug).
2. **A brute-force algorithm** (that is 100% correct but too slow).
3. **A random test case generator.**

```ts
// The Stress Tester
function runStressTest() {
  while (true) {
    // 1. Generate small random input
    const arr = generateRandomArray(length = 5, maxVal = 10);
    
    // 2. Run both
    const correctAns = bruteForce(arr);
    const myAns = myFastAlgorithm(arr);
    
    // 3. Compare
    if (correctAns !== myAns) {
      console.log("BUG FOUND!");
      console.log("Input:", arr);
      console.log("Expected:", correctAns);
      console.log("Got:", myAns);
      break; // Stop immediately so you can debug this specific input!
    }
  }
}
```

This script will churn through thousands of tiny arrays per second until it finds the exact edge case (like `[0, -1, 3]`) that breaks your math. You then trace that specific array to fix the bug.

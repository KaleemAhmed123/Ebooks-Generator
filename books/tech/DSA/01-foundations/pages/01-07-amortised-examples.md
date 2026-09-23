## Nested loops do not mean O(n²)

- The most dangerous trap in complexity analysis: assuming a `while` loop inside a `for` loop automatically multiplies the complexity to O(n²)
- If the inner loop's execution is bounded globally across the entire run of the outer loop, you must use amortised analysis to find the true complexity

### The Monotonic Stack trap

- Consider an algorithm that maintains a decreasing stack. For every element in an array, it pops smaller elements from the stack, then pushes the current element

```ts
function nextGreater(arr: number[]): void {
  const stack: number[] = [];
  
  for (let i = 0; i < arr.length; i++) {           // outer loop runs N times
    while (stack.length > 0 && stack[stack.length - 1] < arr[i]) {
      stack.pop();                                 // inner loop
    }
    stack.push(arr[i]);
  }
}
```

- A superficial analysis says: Outer loop runs n times. Inner loop can theoretically run n times (if the stack has n items). Therefore O(n²)
- **The structural reality:** Every element in `arr` is pushed onto the stack exactly once. Therefore, an element can be popped from the stack at most once
- Over the entire execution of the algorithm, the `stack.pop()` line executes at most n times in total, regardless of how they are distributed
- Total time = n (outer loop iterations) + n (maximum total pops) = 2n in O(n)

### Two Pointers

- Two pointer algorithms (like finding a subarray sum) move a `left` pointer in an inner `while` loop, while a `right` pointer iterates in a `for` loop
- Because `left` only ever moves forward and never resets, it travels a maximum distance of n across all iterations of the inner loop
- Overall complexity: O(n)

:::interview
"Isn't this sliding window algorithm O(n²) because there's a while loop inside the for loop?" — No. The inner while loop only advances the `left` pointer. Since `left` starts at 0 and ends at `n`, it increments at most n times across the entire lifespan of the algorithm. The total work is strictly O(n).
:::

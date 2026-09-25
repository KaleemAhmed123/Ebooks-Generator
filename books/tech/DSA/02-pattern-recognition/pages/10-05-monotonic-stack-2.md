### The Template

```ts
function nextGreaterElements(arr: number[]): number[] {
  const result = new Array(arr.length).fill(-1);
  const stack: number[] = []; // stores INDICES, not values
  
  for (let i = 0; i < arr.length; i++) {
    // While the incoming element is greater than the top of the stack
    while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
      const poppedIndex = stack.pop()!;
      result[poppedIndex] = arr[i]; // The incoming element is the answer
    }
    stack.push(i); // Always push the current index to wait for its match
  }
  
  return result;
}
```

### The trap

- **Storing values instead of indices.** A monotonic stack almost always needs to know *where* the popped element came from to update the result array or calculate distance. Always push the `index`, and use `arr[index]` for comparisons
- **Thinking it's O(n²).** It has a `while` loop inside a `for` loop, but every element is pushed exactly once and popped at most once. Total operations across the entire array is 2n. It is strictly O(n) time

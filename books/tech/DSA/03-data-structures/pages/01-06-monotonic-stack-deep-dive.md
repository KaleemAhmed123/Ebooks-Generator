## Monotonic Stack: Deep Dive

- **What it is:** A stack that maintains its elements in a strictly increasing or decreasing order
- **The Contract:** O(N) time to find the "Next Greater" or "Next Smaller" element for *every* item in an array
- **Why it works:** It acts as an **Elimination Machine** (see Module 02). If you are looking for the *next greater* element, and you encounter a massive element, all the small elements currently in the stack are instantly resolved and can be thrown away permanently

### The Mechanical Rule

- **Increasing Stack:** Pops when it sees a SMALLER element (Finds Next Smaller)
- **Decreasing Stack:** Pops when it sees a LARGER element (Finds Next Greater)

### The Setup

When solving a Monotonic Stack problem, you must decide three things:
1. **What are you pushing?** (Usually the *index*, not the value. Storing the index lets you calculate distance, e.g. width of a rectangle, while still allowing you to look up the value via `arr[index]`)
2. **When do you pop?** (e.g. `while (stack.length > 0 && arr[i] > arr[stack.top()])`)
3. **What happens when you pop?** (This is where the business logic goes. You resolve the popped element's answer using the current element `i`)

```ts
// Canonical: Next Greater Element
// arr: [2, 1, 5, 3] -> ans: [5, 5, -1, -1]
function nextGreaterElements(arr: number[]): number[] {
  const ans = new Array(arr.length).fill(-1);
  const stack: number[] = []; // stores indices
  
  for (let i = 0; i < arr.length; i++) {
    // 2. When do you pop? (When we find a strictly greater element)
    while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
      const poppedIndex = stack.pop()!;
      // 3. What happens when you pop? (The current element is the answer)
      ans[poppedIndex] = arr[i]; 
    }
    // 1. What are you pushing? (The index of the unresolved element)
    stack.push(i);
  }
  
  return ans;
}
```

### The nested `while` loop paradox

- **The trap:** Looking at the code above, you see a `for` loop, and inside it, a `while` loop. The immediate reaction is "This is O(N²)".
- **The reality:** It is strictly O(N). 
- **The proof (Amortised Analysis):** Look at the lifecycle of a single element in the array. It is `push`ed onto the stack exactly once. It is `pop`ped from the stack at most once. Therefore, across the entire `for` loop, the `while` loop can only execute a maximum of N times *in total*. 
- Time complexity is bounded by operations, not loop nesting. $N$ pushes + $N$ pops = $2N$ operations = $O(N)$.

:::interview
"How do you handle circular arrays with a Monotonic Stack?"

By looping twice. Instead of `for (let i = 0; i < n; i++)`, you write `for (let i = 0; i < 2*n; i++)`. When accessing the array, you use `arr[i % n]`. The stack logic remains completely identical. The second pass just simulates the array wrapping around to resolve elements left in the stack.
:::

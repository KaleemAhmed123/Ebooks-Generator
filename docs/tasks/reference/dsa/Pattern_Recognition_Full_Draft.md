# DSA Ebook: Pattern Recognition (Full Draft)

This document contains the fully stitched content of the Pattern Recognition layer, including the 40 new patterns seamlessly integrated.

---

# The Algorithm Derivation Manual

## Pattern Recognition


---

## Why patterns are not techniques

- A "technique" is a specific mechanical operation: *Two Pointers*, *Sliding Window*, *Binary Search*
- A "pattern" is the underlying structural reason that technique works: *Locality*, *Order*, *Search Space Reduction*
- Memorising techniques allows you to solve problems you have seen before. Understanding patterns allows you to solve problems you haven't

### The failure of the "LeetCode tags" approach

- Most candidates study by tag: "Today I will do 10 Sliding Window problems."
- The problem: In an interview, the problem does not come with a tag
- If you only know *how* to write a sliding window, you will sit in an interview trying to force a sliding window onto a problem that actually needs a Hash Map, because you cannot see the underlying structure

### The structural approach

- Every problem has a bottleneck (as seen in Module 1)
- The bottleneck demands a specific structural property to fix it
- For example: if the bottleneck is "I need to find the optimal pair, and checking all pairs is O(n²)", you need a structural property that lets you **eliminate candidates without checking them**
- **Order** (sorting) provides that property. Once sorted, Two Pointers is just the technique used to exploit the Order pattern

### The taxonomy of this book

- This module groups algorithms not by their mechanical names, but by the structural property they exploit
- When you read a problem, you don't ask "Is this a Two Pointer problem?"
- You ask: "Does the answer depend on a local contiguous range? Yes? Then this is a **Locality** pattern. What techniques exploit locality? Sliding Window and Monotonic Stack."

:::interview
"I've done 300 problems but I still blank in interviews when I see a new one."

You are memorising the technique (the *how*) instead of the pattern (the *why*). When the problem is disguised, the technique isn't obvious. But the structural bottleneck is always there if you look for it.
:::


---

## The taxonomy of structure

- The structural patterns that solve 99% of interview problems fall into these eight families
- When you read constraints and write the brute force, you are looking for which of these families the problem belongs to

:::mint
<svg viewBox="0 0 470 230" role="img" aria-label="A diagram showing 8 structural families: Locality, Order, Repeated Extremum, Repeated State, Connectivity, Dependency, Range Interaction, and Search Space Reduction, mapping to their respective techniques." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; font-weight: bold; }
    .sm { font: 8px Consolas, monospace; fill: #1d4e89; }
    .desc { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>

  <!-- Left Column -->
  <rect class="hi" x="10" y="10" width="140" height="40" rx="3"/>
  <text x="20" y="24" class="lb">Locality</text>
  <text x="20" y="36" class="desc">Answer is a contiguous chunk</text>
  <text x="20" y="46" class="sm">Sliding Window, Mono-Stack</text>

  <rect class="bx" x="10" y="60" width="140" height="40" rx="3"/>
  <text x="20" y="74" class="lb">Order / Ranking</text>
  <text x="20" y="86" class="desc">Values relate by magnitude</text>
  <text x="20" y="96" class="sm">Sorting, Two Pointers</text>

  <rect class="bx" x="10" y="110" width="140" height="40" rx="3"/>
  <text x="20" y="124" class="lb">Repeated Extremum</text>
  <text x="20" y="136" class="desc">Need max/min repeatedly</text>
  <text x="20" y="146" class="sm">Heaps, Segment Trees</text>

  <rect class="bx" x="10" y="160" width="140" height="40" rx="3"/>
  <text x="20" y="174" class="lb">Repeated State</text>
  <text x="20" y="186" class="desc">Same subproblem appears</text>
  <text x="20" y="196" class="sm">Dynamic Programming</text>

  <!-- Right Column -->
  <rect class="bx" x="160" y="10" width="140" height="40" rx="3"/>
  <text x="170" y="24" class="lb">Connectivity</text>
  <text x="170" y="36" class="desc">Elements link to others</text>
  <text x="170" y="46" class="sm">Graphs, BFS/DFS, DSU</text>

  <rect class="bx" x="160" y="60" width="140" height="40" rx="3"/>
  <text x="170" y="74" class="lb">Dependency</text>
  <text x="170" y="86" class="desc">A must happen before B</text>
  <text x="170" y="96" class="sm">Topological Sort, DAGs</text>

  <rect class="bx" x="160" y="110" width="140" height="40" rx="3"/>
  <text x="170" y="124" class="lb">Range Interaction</text>
  <text x="170" y="136" class="desc">Queries/updates over ranges</text>
  <text x="170" y="146" class="sm">Prefix Sum, Fenwick</text>

  <rect class="bx" x="160" y="160" width="140" height="40" rx="3"/>
  <text x="170" y="174" class="lb">Search Space Reduction</text>
  <text x="170" y="186" class="desc">Eliminating candidates fast</text>
  <text x="170" y="196" class="sm">Binary Search on Answer</text>

  <!-- Unnamed Patterns Box -->
  <rect class="bx" x="310" y="10" width="150" height="190" rx="3" stroke-dasharray="4 4"/>
  <text x="320" y="24" class="lb">The Unnamed Patterns</text>
  <text x="320" y="36" class="desc">Chapter 9 covers patterns</text>
  <text x="320" y="46" class="desc">nobody gave a LeetCode tag</text>
  
  <text x="320" y="66" class="sm">1. Maintain the Frontier</text>
  <text x="320" y="76" class="desc">(BFS, Dijkstra, Greedy Beam)</text>
  
  <text x="320" y="96" class="sm">2. Dominated Candidate</text>
  <text x="320" y="106" class="desc">(Mono-stack, Convex Hull)</text>
  
  <text x="320" y="126" class="sm">3. Boundary Finding</text>
  <text x="320" y="136" class="desc">(Binary Search, Thresholds)</text>
  
  <text x="320" y="156" class="sm">4. Precompute for Queries</text>
  <text x="320" y="166" class="desc">(Prefix Sum, Sparse Table)</text>
</svg>
:::

- Look at how techniques cross over. "Binary Search" isn't a category — it's a technique used in both **Order** (finding an element) and **Search Space Reduction** (finding an answer threshold)
- The rest of this module walks through each of these families, showing how to spot them and how to code the techniques that solve them


---

## The Locality Family

- **What it is:** The answer to the problem depends on a small, contiguous chunk of the data
- **The signal:** "Subarray", "Substring", "Consecutive", "Next greater element", "Window"
- **The mechanism:** If the answer is local, you do not need to scan the entire array every time. You only need to look at elements that are "near" the current element

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Sliding Window (Fixed)** | "Subarray of size k" | Sum of window i overlaps 99% with window i-1 |
| **Sliding Window (Variable)** | "Longest/shortest subarray with property X" | Monotonicity: growing window increases sum/count |
| **Two Pointers (Same direction)** | "Remove duplicates in place" | One pointer writes, one pointer explores |
| **Monotonic Stack** | "Next greater/smaller element" | A larger element renders all previous smaller elements useless |

### Why they belong together

- A fixed sliding window remembers the sum of the last k elements
- A monotonic stack remembers the values of the last k elements that haven't found a match yet
- In both cases, the algorithm succeeds by keeping a "memory" of a local region, allowing it to process new elements in O(1) time by interacting only with that local memory

### The trap

- **Assuming "subset" implies locality.** A subarray/substring must be contiguous. A subset/subsequence does not. Sliding window cannot find the "longest subset that sums to K". (That is Knapsack DP). Locality only works when order and contiguity are strictly enforced


---

## Sliding Window (Fixed Length)

- **What it is:** Maintaining the state of exactly k consecutive elements as you move through an array
- **When to reach for it:** "Find the max sum of a subarray of size k", "Find all anagrams of a string of size k"
- **Why it works:** When moving a window of size k from index i to i+1, k-1 elements stay exactly the same. You only need to subtract the element falling out of the left, and add the element entering on the right

### The visual mechanism

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="A window of size 3 slides right. The middle 2 elements are shared between step 1 and step 2. Only the edges change." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .hot { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>

  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="20" y="25" class="lb">Step 1</text>
  <!-- Window 1 -->
  <rect class="hot" x="80" y="10" width="30" height="25" rx="2" />
  <rect class="hi" x="110" y="10" width="30" height="25" />
  <rect class="hi" x="140" y="10" width="30" height="25" rx="2" />
  <rect class="bx" x="170" y="10" width="30" height="25" rx="2" />
  
  <text x="95" y="27" class="lb" text-anchor="middle">2</text>
  <text x="125" y="27" class="lb" text-anchor="middle">1</text>
  <text x="155" y="27" class="lb" text-anchor="middle">5</text>
  <text x="185" y="27" class="lb" text-anchor="middle">3</text>
  
  <text x="220" y="25" class="sm">Sum = 8</text>

  <text x="20" y="65" class="lb">Step 2</text>
  <!-- Window 2 -->
  <rect class="bx" x="80" y="50" width="30" height="25" rx="2" />
  <rect class="hi" x="110" y="50" width="30" height="25" rx="2" />
  <rect class="hi" x="140" y="50" width="30" height="25" />
  <rect class="hi" x="170" y="50" width="30" height="25" rx="2" />
  
  <text x="95" y="67" class="lb" text-anchor="middle">2</text>
  <text x="125" y="67" class="lb" text-anchor="middle">1</text>
  <text x="155" y="67" class="lb" text-anchor="middle">5</text>
  <text x="185" y="67" class="lb" text-anchor="middle">3</text>

  <text x="220" y="65" class="sm">Sum = 8 - 2 + 3 = 9</text>

  <!-- Arrows -->
  <path class="a" d="M 95 38 L 95 47" marker-end="url(#arrow)" />
  <text x="100" y="45" class="sm" fill="#ef476e">subtract</text>
  
  <path class="a" d="M 185 38 L 185 47" marker-end="url(#arrow)" />
  <text x="190" y="45" class="sm" fill="#2d6a4f">add</text>
</svg>
:::

### The Template

```ts
function fixedSlidingWindow(arr: number[], k: number): number {
  if (arr.length < k) return 0;
  
  let currentSum = 0;
  // 1. Initialise the first window
  for (let i = 0; i < k; i++) {
    currentSum += arr[i];
  }
  
  let maxSum = currentSum;
  
  // 2. Slide the window
  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}
```

### The Variation: Maps instead of Sums

- If the problem asks for "anagrams of size k", `currentSum` becomes a Hash Map of character frequencies
- When sliding, you decrement the count of `char[i-k]` and increment the count of `char[i]`


---

## Sliding Window (Variable Length)

- **What it is:** A window that expands and shrinks dynamically to find the longest or shortest contiguous sequence that satisfies a condition
- **When to reach for it:** "Longest substring without repeating characters", "Smallest subarray with sum ≥ S"
- **Why it works:** It exploits **monotonicity**. If a window `[L, R]` has a sum of 10, then `[L, R+1]` *must* have a sum ≥ 10 (assuming all positive numbers). Because it only moves in one direction, we never have to re-evaluate smaller windows that we know will fail

### The Template

```ts
function variableSlidingWindow(arr: number[], target: number): number {
  let left = 0;
  let currentSum = 0;
  let minLength = Infinity;
  
  // Right pointer always expands the window
  for (let right = 0; right < arr.length; right++) {
    currentSum += arr[right];
    
    // Left pointer shrinks the window while the condition is met
    while (currentSum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      currentSum -= arr[left];
      left++;
    }
  }
  
  return minLength === Infinity ? 0 : minLength;
}
```

### The two states of the window

- A variable window is always oscillating between two states:
  1. **Invalid:** The condition is not met. We must expand `right` to bring in new elements until it is met
  2. **Valid:** The condition is met. We record the answer, then shrink `left` to see if we can find a *better* (shorter) valid answer, or until it becomes invalid again
- If the problem asks for the **longest** window, the logic flips: you record the answer while valid, and shrink `left` only when the window becomes *invalid* (e.g. too many distinct characters)

### The constraint fingerprint

- You see an array of positive integers, n ≤ 10⁵, and you need a contiguous subarray. O(n²) will TLE.
- By never moving `left` backwards, both pointers traverse the array exactly once. Time is strictly O(n).

:::interview
"Why is a variable sliding window O(N) if there is a while loop inside a for loop?"

The outer loop moves the right pointer N times. The inner loop moves the left pointer. Because the left pointer never moves backward, it can move at most N times across the entire execution of the algorithm. N + N = 2N, which is strictly O(N).
:::


---

## Two Pointers

- **What it is:** Using two indices to traverse a data structure simultaneously
- **When to reach for it:** "Find a pair that sums to X in a sorted array", "Reverse a string in place", "Remove duplicates from a sorted array"
- **Why it works:** In sorted arrays, the pointers act as boundaries that permanently eliminate candidates. In unsorted arrays, one pointer acts as a "reader" and the other as a "writer"

### Opposite Direction (Collision)

- Used primarily on **sorted** data to find pairs or triplets
- **Mechanism:** One pointer starts at `0`, the other at `n-1`. They move toward each other

```ts
function twoSumSorted(arr: number[], target: number): number[] {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    
    // The elimination step
    if (sum < target) {
      left++; // The current left is too small for ANY remaining right
    } else {
      right--; // The current right is too big for ANY remaining left
    }
  }
  return [-1, -1];
}
```

### Same Direction (Read/Write)

- Used primarily for **in-place modification** where O(1) space is required
- **Mechanism:** `fast` pointer reads every element. `slow` pointer points to the position where the next valid element should be written

```ts
function removeDuplicates(arr: number[]): number {
  if (arr.length === 0) return 0;
  
  let slow = 0;
  
  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;
      arr[slow] = arr[fast];
    }
  }
  
  return slow + 1; // Length of the new array
}
```

### Sliding window vs Two pointers

- A sliding window *is* a specific type of two pointer algorithm
- Use the term "sliding window" when the elements *between* the pointers matter (e.g. summing them). Use "two pointers" when only the elements *at* the pointers matter

:::interview
"If the array is sorted, do we use same-direction or opposite-direction pointers?"

Almost always opposite-direction. A sorted array gives you a magnitude gradient. If the sum of the left and right pointers is too big, the ONLY way to make it smaller is to move the right pointer leftwards. That logic is what allows us to eliminate candidates in O(1).
:::


---

## Two Pointers Variations

- The standard two pointer techniques (Collision and Read/Write) are the foundation. Interviewers often twist them by applying them to different data structures or adding a second dimension

### The Fast/Slow (Hare & Tortoise) Pointer

- Used primarily on **Linked Lists** to detect cycles or find the midpoint
- **Mechanism:** `slow` moves 1 step, `fast` moves 2 steps
- **Why it works (Cycle):** If there is a cycle, the fast pointer will eventually "lap" the slow pointer and they will point to the same node. If there is no cycle, `fast` reaches `null`
- **Why it works (Midpoint):** When `fast` reaches the end of the list, `slow` is exactly halfway through, because it traveled at half the speed

```ts
function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;
  
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
    
    if (slow === fast) return true; // Collision!
  }
  return false;
}
```

### Three Pointers (Dutch National Flag)

- **The bottleneck:** "Sort an array of 0s, 1s, and 2s in O(n) time and O(1) space."
- **The insight:** We need three regions: 0s on the left, 2s on the right, and 1s in the middle. We need a pointer for the boundary of each
- **Mechanism:** `low` tracks the boundary for 0s. `high` tracks the boundary for 2s. `mid` explores the unknown elements
- If `arr[mid] === 0`, swap with `low`, increment both
- If `arr[mid] === 1`, it's already in the right place, increment `mid`
- If `arr[mid] === 2`, swap with `high`, decrement `high` (do *not* increment `mid` yet, the swapped element is still unknown)

### The trap

- **Missing the `mid` logic in Three Pointers.** The most common failure is incrementing `mid` when you swap with `high`. You just pulled an unknown number from the end of the array into the `mid` position. You must evaluate it on the next loop iteration, so `mid` must stay where it is


---

## Monotonic Stack

- **What it is:** A stack that maintains its elements in a strictly increasing or decreasing order. Every push that would break the order causes elements to be popped first
- **When to reach for it:** "Next greater element", "Next smaller element", "Daily temperatures", "Largest rectangle in histogram"
- **Why it works:** It acts as a memory of elements waiting for a specific event. A larger element arriving renders all previous smaller elements useless, allowing us to permanently eliminate them

### The visual mechanism

- We want to find the next greater element for `[2, 1, 5, 3]`

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Monotonic stack processing [2, 1, 5, 3]. 2 goes in. 1 goes in (smaller). 5 arrives, pops 1 (5 is next greater), pops 2 (5 is next greater), then 5 goes in. 3 goes in." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { stroke: #ef476e; stroke-width: 1.1; fill: none; stroke-dasharray: 2 2;}
  </style>
  
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
    <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef476e"/>
    </marker>
  </defs>

  <text x="20" y="20" class="lb">Push 2</text>
  <rect class="bx" x="20" y="80" width="30" height="20" rx="2" />
  <text x="35" y="94" class="lb" text-anchor="middle">2</text>
  
  <text x="90" y="20" class="lb">Push 1</text>
  <rect class="bx" x="90" y="80" width="30" height="20" rx="2" />
  <rect class="bx" x="90" y="55" width="30" height="20" rx="2" />
  <text x="105" y="94" class="lb" text-anchor="middle">2</text>
  <text x="105" y="69" class="lb" text-anchor="middle">1</text>
  
  <text x="180" y="20" class="lb">Process 5</text>
  <rect class="bx" x="180" y="80" width="30" height="20" rx="2" stroke-dasharray="2 2" />
  <rect class="bx" x="180" y="55" width="30" height="20" rx="2" stroke-dasharray="2 2" />
  <text x="195" y="94" class="lb" text-anchor="middle" fill="#6b6b6b">2</text>
  <text x="195" y="69" class="lb" text-anchor="middle" fill="#6b6b6b">1</text>
  <text x="240" y="69" class="lb" fill="#ef476e">5 is > 1. Pop 1.</text>
  <text x="240" y="94" class="lb" fill="#ef476e">5 is > 2. Pop 2.</text>
  <path class="hot" d="M 210 65 L 235 65" marker-end="url(#arrowRed)" />
  <path class="hot" d="M 210 90 L 235 90" marker-end="url(#arrowRed)" />

  <text x="350" y="20" class="lb">Push 5, Push 3</text>
  <rect class="bx" x="350" y="80" width="30" height="20" rx="2" />
  <rect class="bx" x="350" y="55" width="30" height="20" rx="2" />
  <text x="365" y="94" class="lb" text-anchor="middle">5</text>
  <text x="365" y="69" class="lb" text-anchor="middle">3</text>
</svg>
:::

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


---

## Monotonic Queue (Deque)

- **What it is:** A double-ended queue (deque) that maintains its elements in monotonic order. It allows O(1) access to the maximum or minimum element in a sliding window
- **When to reach for it:** "Sliding window maximum", "Find the max in every contiguous subarray of size k"
- **Why it works:** It combines the elimination property of a monotonic stack with the expiration property of a sliding window

### The core insight

- If you have a window `[3, 1, 4]` and you are looking for the maximum, the `1` is completely useless. It is smaller than `3`, and it is smaller than `4`. More importantly, `4` arrived *after* `1`, so `1` will expire before `4` does. Therefore, `1` can never be the maximum of any current or future window
- A Monotonic Queue permanently deletes elements that are "dominated" (smaller and older)

### The visual mechanism

- Sliding window of size k=3 over `[1, 3, -1, -3, 5]`

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="Monotonic Queue processing elements. When 3 arrives, it pops 1 from the back because 3 > 1. The front of the queue always holds the maximum for the current window." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { stroke: #ef476e; stroke-width: 1.1; fill: none; stroke-dasharray: 2 2;}
  </style>

  <text x="20" y="20" class="lb">Push 1</text>
  <rect class="bx" x="20" y="60" width="30" height="20" rx="2" />
  <text x="35" y="74" class="lb" text-anchor="middle">1</text>
  
  <text x="100" y="20" class="lb">Push 3 (dominates 1)</text>
  <rect class="bx" x="100" y="60" width="30" height="20" rx="2" stroke-dasharray="2 2" />
  <text x="115" y="74" class="lb" text-anchor="middle" fill="#6b6b6b">1</text>
  <text x="145" y="74" class="lb" fill="#ef476e">Pop 1 from back</text>
  
  <rect class="bx" x="100" y="90" width="30" height="20" rx="2" />
  <text x="115" y="104" class="lb" text-anchor="middle">3</text>

  <text x="260" y="20" class="lb">Push -1</text>
  <rect class="bx" x="260" y="60" width="30" height="20" rx="2" />
  <rect class="bx" x="295" y="60" width="30" height="20" rx="2" />
  <text x="275" y="74" class="lb" text-anchor="middle">3</text>
  <text x="310" y="74" class="lb" text-anchor="middle">-1</text>
  
  <text x="260" y="45" class="sm">Front is max of window</text>
</svg>
:::

### The Template

```ts
function maxSlidingWindow(nums: number[], k: number): number[] {
  const deque: number[] = []; // Stores INDICES
  const result: number[] = [];
  
  for (let i = 0; i < nums.length; i++) {
    // 1. Remove elements that are out of the current window
    if (deque.length > 0 && deque[0] === i - k) {
      deque.shift(); // Remove from FRONT
    }
    
    // 2. Remove elements that are dominated by the incoming element
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop(); // Remove from BACK
    }
    
    // 3. Add the incoming element's index
    deque.push(i);
    
    // 4. Record the result if the window has reached size k
    if (i >= k - 1) {
      result.push(nums[deque[0]]); // The FRONT is always the max
    }
  }
  return result;
}
```

### The trap

- **Using a standard array for `shift()` in JavaScript/TypeScript.** In JS, `array.shift()` takes O(n) time. If you use it inside the loop, the algorithm silently degrades from O(n) to O(n²). In a real interview, either implement a lightweight custom Deque class using two pointers, or explicitly tell the interviewer: "I am using `shift()` for brevity, but in production I would use a proper Deque to guarantee O(1) pops from the front."


---

### The wrong approach: Locality

- **Naive idea:** For sliding window, beginners often try to maintain the sum by calling a `sum()` function on `arr.slice(left, right + 1)` inside the loop
- **Why it looks right:** The logic is flawlessly correct. It passes the first 5 test cases on LeetCode
- **Why it breaks:** The `slice` and `sum` operations take O(k) time. If you do this n times, your total time is O(n × k). If k = n/2, you have written an O(n²) algorithm disguised as a sliding window. It will TLE
- **The trap:** Abstraction hides complexity. Writing `sum(window)` feels like an O(1) thought, but it is an O(k) machine execution
- **The fix:** You must maintain a running variable (`currentSum`) and mathematically update it with `+ arr[right] - arr[left-1]`. The state must transition, not rebuild

### Recognition drills

You have 20 seconds per problem. Do not solve. Identify which Locality pattern applies.

| # | Problem sketch | Your answer |
|---|---|---|
| 1 | Given an array of daily temperatures, return an array with the number of days you have to wait for a warmer temperature | |
| 2 | Find the length of the longest subarray containing at most two distinct characters | |
| 3 | Move all zeroes to the end of an array while maintaining the relative order of the non-zero elements | |
| 4 | Find the maximum average of any contiguous subarray of length K | |

:::note
**Answers:** 
1. **Monotonic Stack.** "Next greater element" implies finding a future value that breaks a current trend.
2. **Sliding Window (Variable).** Looking for a "longest subarray" with a condition.
3. **Two Pointers (Read/Write).** In-place modification. Fast pointer finds non-zeroes, slow pointer writes them.
4. **Sliding Window (Fixed).** The range size K is constant.
:::


---

# The Expansion & Contraction Method

## The Mental Model
How to stretch a window to meet a condition, and shrink it when the condition breaks. This directly encompasses the `slidingWindow`, `TwoPointers`, and `maxMin Len` tags you identified.

## Algorithm Derivation
Instead of just jumping to the solution, let's derive it.

**Brute force:** Check every possible subarray/window using nested loops (i to N, j from i to N).
**↓**
**Why is it too slow?** $O(N^2)$ time. We are recalculating the sum/condition for heavily overlapping subarrays.
**↓**
**What is being repeated?** If window `[i, j]` is valid, window `[i, j-1]` was already calculated.
**↓**
**Can we exploit monotonicity?** Yes! If adding an element makes the sum *too large*, adding more elements will only make it worse. We don't need to check them.
**↓**
**Optimized Idea:** Expand the right edge until the condition breaks. Then contract the left edge until it becomes valid again. $O(N)$ time.

## Pattern Coverage
*   **slidingWindow:** Keep track of the current state.
*   **TwoPointers:** `left` and `right` boundaries.
*   **maxMin Len:** Update the global max/min only when the window is in a valid state.

## Implementation Structure
```typescript
let left = 0, right = 0;
while (right < n) {
    // 1. Expand
    add(nums[right]);
    
    // 2. Contract (while invalid)
    while (isInvalid()) {
        remove(nums[left]);
        left++;
    }
    
    // 3. Update Result
    ans = Math.max(ans, right - left + 1);
    right++;
}
```


---

# The Anchor & Runner Pattern

## The Mental Model
One pointer stays put to mark a safe or sorted boundary (the Anchor), while the other pointer scouts ahead (the Runner).
This perfectly captures tags like `swap(last, first) till both doesn't cross` and `cycleSort`.

## Algorithm Derivation
**Brute force:** Create a new array, copy valid elements over, and return it.
**↓**
**Why is it too slow?** $O(N)$ space complexity. It fails the "in-place" requirement.
**↓**
**Can we remember it?** We can remember the next valid position using a single integer index.
**↓**
**Optimized Idea:** Let `i` (anchor) track the boundary of the processed array, and `j` (runner) find the next valid element to swap into `i`.

## Sub-Patterns Covered
*   **Cycle Sort (1 to N arrays):** The value itself dictates the target index (`arr[i] == i - 1`).
*   **In-Place Swaps:** Move all zeroes to the end, sort colors (0, 1, 2).


---

# The "Look Ahead" Predictor

## The Mental Model
Checking the `i+1` or `i+2` state before committing to a move. This covers your `lookAhead` tag.

## Algorithm Derivation
**Brute force:** Make a move, check if it's valid, and if not, backtrack.
**↓**
**Why is it too slow?** $O(2^N)$ or $O(N!)$ because you explore dead ends deeply before realizing they are invalid.
**↓**
**What is being repeated?** The process of stepping into a bad state and unwinding it.
**↓**
**Can we eliminate candidates?** Yes. Look one step ahead.
**↓**
**Optimized Idea:** Only commit to a state transition if `arr[i+1]` satisfies the safe condition. This turns recursion into a simple $O(N)$ Greedy choice.

## Canonical Example: Jump Game
Instead of trying every jump, look ahead to see which jump gives the maximum *reach* (`i + nums[i]`) on the *next* turn.


---

## The Order Family

- **What it is:** The answer to the problem depends on the relative magnitude of the elements, not their original positions
- **The signal:** "Find the pairs", "Find the closest", "Can you form...", "Kth largest"
- **The mechanism:** Data in random order contains no structural guarantees. Once data is sorted, you gain the power to eliminate candidates without checking them, or greedily pick the best candidate immediately

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Sort then Scan** | "Find duplicates", "Closest pair" | Sorting brings related elements physically adjacent to each other |
| **Greedy via Sorting** | "Maximise profit", "Minimise cost" | The optimal choice is always at one extreme of the sorted order |
| **Two Pointers (Collision)** | "Two Sum", "Three Sum" | Moving left/right predictably increases/decreases the sum |
| **Binary Search** | "Find X in O(log n)" | You can eliminate half the remaining search space with one comparison |
| **Sweep Line** | "Overlapping intervals" | Processing events in chronological/spatial order reveals overlap |

### The preprocessing cost

- Almost all techniques in this family require you to sort the input first. Sorting takes O(n log n) time
- This means if the constraint is n ≤ 10⁵, you can afford the sort. If the constraint is n ≤ 10⁷, sorting will Time Limit Exceed (TLE). At 10⁷, you must find an O(n) solution (like a Hash Map or Counting Sort)
- **The golden rule of Order:** If the problem requires an O(n²) search, but you can sort the array and then use Two Pointers or Binary Search to solve it in O(n), the total time drops from O(n²) to O(n log n). This is the most common optimisation in all of computer science


---

## Sort then Scan

- **What it is:** Sorting the array, then iterating over it once
- **Why it works:** In an unsorted array, elements that are mathematically "close" to each other can be on opposite ends of the array. Finding them requires an O(n²) nested loop. Sorting forces mathematically close elements to become physically adjacent
- **The bottleneck cured:** It turns an O(n²) search into an O(n log n) sort followed by an O(n) scan

### Finding duplicates or closest pairs

- If you want to know if an array contains duplicates, checking every pair is O(n²)
- If you sort the array, all duplicates are grouped together. `[3, 1, 3]` becomes `[1, 3, 3]`. You only need to check if `arr[i] === arr[i-1]`

```ts
function hasDuplicate(arr: number[]): boolean {
  arr.sort((a, b) => a - b);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) return true;
  }
  return false;
}
```

### The O(n) alternative

- **Why use sort-then-scan when a Hash Map is O(n)?**
- A Hash Set can find duplicates in O(n) time. But it costs O(n) extra space
- If the interviewer says: "Solve this in O(1) space," the Hash Set is banned. You must use Sort-Then-Scan. The time degrades to O(n log n), but the space drops to O(1) (assuming an in-place sorting algorithm like HeapSort)

### The trap

- **Forgetting that `arr.sort()` in JavaScript is alphabetical.**
- `[10, 2, 1].sort()` results in `[1, 10, 2]`. It converts the numbers to strings and sorts them alphabetically
- You must **always** provide a comparator for numbers: `arr.sort((a, b) => a - b)`

:::interview
"Given an array of points, find the two points that are closest together in 1D space."

The brute force is to calculate the distance between all pairs in O(n²) time. But the closest points must be adjacent if the array is sorted. So I will sort the array in O(n log n) time, then do a single O(n) pass comparing `arr[i]` with `arr[i-1]`.
:::


---

## Greedy via Sorting

- **What it is:** Sorting the input data so that the locally optimal choice is always at the front of the array
- **When to reach for it:** "Minimum number of platforms required", "Maximum number of activities you can attend", "Assign cookies to children to satisfy the maximum number"
- **Why it works:** A greedy algorithm takes the best available option right now, without looking ahead. For this to guarantee a globally optimal answer, the "best" option must be easily identifiable. Sorting the data by some metric (end time, size, weight) puts the best options first

### The visual mechanism

- Consider the **Activity Selection** problem: given start and end times, attend the maximum number of non-overlapping activities.
- The greedy choice: Always pick the activity that **ends earliest**. It leaves the most time available for future activities.

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="Sorting intervals by end time. Picking the earliest ending interval leaves the maximum room for subsequent choices." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .rej { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.1; stroke-dasharray: 2 2; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
  </style>

  <text x="20" y="20" class="lb">Sorted by end time</text>
  
  <!-- Axis -->
  <path class="a" d="M 120 15 L 420 15" />
  <text x="120" y="10" class="sm">Time 0</text>
  <text x="420" y="10" class="sm">Time 10</text>
  
  <!-- Interval 1 (Picked) -->
  <rect class="hi" x="120" y="30" width="80" height="15" rx="2" />
  <text x="160" y="41" class="lb" text-anchor="middle">A: ends at 3</text>
  <text x="80" y="41" class="sm" fill="#2d6a4f">Pick</text>
  
  <!-- Interval 2 (Overlaps A) -->
  <rect class="rej" x="150" y="55" width="100" height="15" rx="2" />
  <text x="200" y="66" class="lb" text-anchor="middle" fill="#6b6b6b">B: ends at 5</text>
  <text x="80" y="66" class="sm" fill="#ef476e">Overlaps A, Skip</text>

  <!-- Interval 3 (Picked) -->
  <rect class="hi" x="220" y="80" width="90" height="15" rx="2" />
  <text x="265" y="91" class="lb" text-anchor="middle">C: ends at 6</text>
  <text x="80" y="91" class="sm" fill="#2d6a4f">Pick</text>
</svg>
:::

### The Template

```ts
function maxActivities(start: number[], end: number[]): number {
  // Combine and sort by END time
  const activities = start.map((s, i) => ({ s, e: end[i] }));
  activities.sort((a, b) => a.e - b.e);
  
  let count = 0;
  let lastEndTime = -1;
  
  for (const act of activities) {
    if (act.s >= lastEndTime) { // Valid choice!
      count++;
      lastEndTime = act.e;
    }
  }
  return count;
}
```

### The trap

- **Sorting by the wrong metric.** In activity selection, beginners often sort by *start* time or by *duration*. Sorting by start time fails if the first activity lasts all day, blocking everything else. Sorting by duration fails if a short activity overlaps two non-overlapping long ones. You must sort by what actually constrains the future: the end time


---

## Binary Search (on sorted input)

- **What it is:** Finding an element, or the insertion point for an element, in a sorted array in O(log n) time
- **Why it works:** The sorted order guarantees that if `arr[mid] < target`, the target *cannot* exist anywhere to the left of `mid`. You eliminate half the array in one operation
- **The structural constraint:** The data must be monotonic (strictly increasing or decreasing). If the array is unsorted, you must sort it first (O(n log n)) or use a Hash Map (O(n) time and space)

### The robust template

- There are a dozen ways to write Binary Search. Memorise exactly one robust template that prevents infinite loops

```ts
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    // Avoids integer overflow (left + right) / 2
    const mid = left + Math.floor((right - left) / 2); 
    
    if (arr[mid] === target) return mid;
    
    if (arr[mid] < target) {
      left = mid + 1;  // Target is strictly to the right
    } else {
      right = mid - 1; // Target is strictly to the left
    }
  }
  
  return -1; // Not found
}
```

### Lower Bound / Upper Bound

- What if there are duplicates, and you need the *first* occurrence?
- **Lower bound:** Find the first element ≥ target.
- **Upper bound:** Find the first element > target.
- Do not stop when `arr[mid] === target`. Record it as a potential answer, but keep searching to the left to see if there is an earlier one

```ts
function lowerBound(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  let ans = -1;
  
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2); 
    if (arr[mid] >= target) {
      ans = mid;       // Could be the answer
      right = mid - 1; // But look left for a better one
    } else {
      left = mid + 1;
    }
  }
  return ans;
}
```

### The trap

- **Assuming Binary Search only works on arrays.** It works on *any* monotonic search space. (Covered extensively in Chapter 7: Search Space Reduction)


---

## Coordinate Compression

- **What it is:** Mapping a sparse set of large values to a dense set of small integers while preserving their relative order
- **When to reach for it:** You need to use values as array indices (e.g., for a Fenwick tree or frequency array), but the values go up to 10⁹ while there are only 10⁵ of them
- **Why it works:** Many algorithms only care about the *relative ranking* of elements (A < B), not their absolute values (10 < 10⁹). Compression preserves the rank while shrinking the memory footprint

### The visual mechanism

- Original values: `[10, 999999999, 10, 55]`
- Sorted unique: `[10, 55, 999999999]`
- Ranks: `10` → `0`, `55` → `1`, `999999999` → `2`
- Compressed array: `[0, 2, 0, 1]`

### The Template

```ts
function compressCoordinates(arr: number[]): number[] {
  // 1. Get unique sorted values
  const uniqueSorted = Array.from(new Set(arr)).sort((a, b) => a - b);
  
  // 2. Map original values to their index (rank) in the sorted array
  // Binary search takes O(log U) per element, total O(n log U)
  const compressed = arr.map(val => {
    // Implement lowerBound() as defined previously
    return lowerBound(uniqueSorted, val); 
  });
  
  return compressed;
}
```

*Note: In JS/TS, a Map object can also be used for O(1) lookups instead of binary search, trading a bit of memory for speed.*

### The trap

- **Allocating massive arrays.** If a problem says constraints are N ≤ 10⁵ but the values A_i ≤ 10⁹, a beginner might try `let counts = new Array(10**9)`. This will instantly crash with an Out of Memory error. You must compress the 10⁵ values into the range `0...100,000` first. Coordinate compression is the canonical bridge between Order patterns and Range Interaction patterns (like Segment Trees)


---

## Sweep Line

- **What it is:** Processing spatial or temporal events in chronological order
- **When to reach for it:** "Merge overlapping intervals", "Maximum CPU load at any time", "Skyline problem", "Find intersections of rectangles"
- **Why it works:** Instead of comparing every interval against every other interval (O(n²)), you sort the start and end points as independent "events". As you sweep through time from left to right, you maintain an active state

### The visual mechanism

- Given intervals `[1, 5]`, `[2, 4]`, `[6, 8]`. We decompose them into events:
- Time 1: `+1` (start)
- Time 2: `+1` (start)
- Time 4: `-1` (end)
- Time 5: `-1` (end)
- Time 6: `+1` (start)
- Time 8: `-1` (end)

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Sweep line processing events chronologically. The running sum tracks the exact number of overlapping intervals at any given moment." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .hot { stroke: #ef476e; stroke-width: 1.1; fill: none; stroke-dasharray: 2 2;}
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>

  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <path class="a" d="M 40 40 L 420 40" />
  
  <text x="80" y="30" class="lb">+1</text>
  <text x="140" y="30" class="lb">+1</text>
  <text x="260" y="30" class="lb">-1</text>
  <text x="320" y="30" class="lb">-1</text>
  
  <text x="80" y="55" class="sm">T=1</text>
  <text x="140" y="55" class="sm">T=2</text>
  <text x="260" y="55" class="sm">T=4</text>
  <text x="320" y="55" class="sm">T=5</text>
  
  <path class="hot" d="M 40 80 L 420 80" />
  <text x="40" y="75" class="sm" fill="#ef476e">Active count (overlap)</text>

  <text x="80" y="95" class="lb">1</text>
  <text x="140" y="95" class="lb">2 (Max)</text>
  <text x="260" y="95" class="lb">1</text>
  <text x="320" y="95" class="lb">0</text>
  
  <!-- Sweeping line -->
  <path class="a" d="M 140 10 L 140 120" marker-end="url(#arrow)" stroke-dasharray="2 2" />
</svg>
:::

### The Template

```ts
function maxOverlap(intervals: number[][]): number {
  const events: { time: number, type: number }[] = [];
  
  for (const [start, end] of intervals) {
    events.push({ time: start, type: 1 }); // 1 for start
    events.push({ time: end, type: -1 });  // -1 for end
  }
  
  // Sort by time. If times tie, process END (-1) before START (1)
  events.sort((a, b) => {
    if (a.time !== b.time) return a.time - b.time;
    return a.type - b.type;
  });
  
  let active = 0;
  let maxActive = 0;
  
  for (const event of events) {
    active += event.type;
    maxActive = Math.max(maxActive, active);
  }
  
  return maxActive;
}
```

### The trap

- **Handling ties incorrectly.** If one interval ends at time T and another starts at time T, do they overlap? The problem description will tell you. If they do *not* overlap, you must process the END event before the START event when sorting ties (as done in the template). If you process START first, the active count will artificially inflate


---

### The wrong approach: Order

- **Naive idea:** Modifying an array while using two pointers on it
- **Why it looks right:** You find an element that needs to be deleted or inserted, so you use `arr.splice()` to fix it in place, then move your pointers
- **Why it breaks:** `splice` is O(n). Calling it inside a loop makes your algorithm O(n²). Furthermore, it shifts all indices, immediately desyncing your pointers. The standard read/write two pointer technique exists specifically to avoid this by overwriting values instead of shifting them
- **The fix:** Never resize an array during a traversal. Use a fast pointer to read, a slow pointer to write, and truncate the array size at the very end

### Recognition drills

You have 20 seconds per problem. Identify which Order pattern applies.

| # | Problem sketch | Your answer |
|---|---|---|
| 1 | Given an array of coordinates, replace each coordinate with its rank (1st smallest, 2nd smallest, etc) | |
| 2 | Find the maximum number of intervals that can be placed on a timeline without overlapping | |
| 3 | You have a stream of user logins and logouts with timestamps. Find the peak concurrent user count | |
| 4 | Find the smallest missing positive integer in an unsorted array | |

:::note
**Answers:** 
1. **Coordinate Compression.** Exactly what it's built for.
2. **Greedy via Sorting.** Sort by end time, pick earliest. (Activity Selection).
3. **Sweep Line.** Convert to +1 and -1 events, sort by time, running sum.
4. **None of the above.** This is a trick. You need O(n) time. Sorting takes O(n log n). This requires a Hash Set or the cyclic sort technique (modifying in place).
:::


---

## Recognition drills: Order and Ranking

Hide the right column. Identify the correct Order/Ranking technique (Sort then Scan, Greedy via Sorting, Binary Search on Sorted Input, Coordinate Compression, Sweep Line) and justify your answer.

| Problem | Order Pattern & Justification |
|---|---|
| 1. Find the maximum number of non-overlapping intervals you can select from a given set of intervals. | **Greedy via Sorting.** Sort intervals by their end time. Scan and greedily pick the first interval that does not overlap with the previously picked one. |
| 2. Given an array of coordinates up to $10^9$, you need to use them as indices in an array or Fenwick Tree. | **Coordinate Compression.** The absolute values don't matter, only their relative order. Sort the unique coordinates and map them to their dense ranks (1, 2, 3...). |
| 3. Given a set of points on a 2D plane, find if there are any three points that lie on the same vertical line. | **Sort then Scan.** Sort points primarily by X, secondarily by Y. Any points on the same vertical line will now be adjacent in the sorted array. Scan for triplets with identical X. |
| 4. You have a list of user session start and end times. Find the minute with the maximum number of concurrent users. | **Sweep Line.** Convert intervals into events: `(start, +1)` and `(end, -1)`. Sort the events by time. Sweep through the sorted events, maintaining a running sum. The maximum running sum is the answer. |
| 5. Given two arrays A and B, find the pair `(A[i], B[j])` with the smallest absolute difference. | **Sort then Scan (or Binary Search).** Sort both arrays. Use two pointers to scan them simultaneously, advancing the pointer that points to the smaller value. (Alternatively, sort A, and for each element in B, binary search A). |
| 6. Given an array, find two numbers that sum to exactly K. | **Sort then Scan (Two Pointers) or Hash Map.** If the array is already sorted, use a left and right pointer. If not sorted, a Hash Map is O(N). Sorting first would take O(N log N). |
| 7. Given an array of meeting time intervals, determine if a person could attend all meetings. | **Sort then Scan.** Sort by start time. Scan the array. If any meeting starts before the previous meeting ends, return false. |
| 8. Find the total length of coverage given a set of overlapping 1D line segments. | **Sweep Line (or Sort then Merge).** Sort segments by start time. Maintain a `currentStart` and `currentEnd`. If the next segment overlaps, extend `currentEnd`. If it doesn't, add `currentEnd - currentStart` to the total and reset the markers. |

### Score yourself
- **7-8 correct:** You can reliably identify when sorting destroys sequence but reveals structure (adjacency, hierarchy)
- **4-6 correct:** You might be confusing Sweep Line with basic Two Pointers. Remember: Sweep Line processes *events*, Two Pointers process *elements*
- **0-3 correct:** Review the Order Family introduction (03-01)


---

# Interval Geometry

## The Mental Model
Sorting by start time and seeing where lines overlap on an axis. This covers `Arrangements` and `merge (intervals)`.

## Algorithm Derivation
**Brute force:** For every interval, check if it overlaps with every other interval. $O(N^2)$.
**↓**
**Why is it too slow?** We check pairs that are nowhere near each other on the number line.
**↓**
**Can we reorder operations?** Sort the intervals by their start time.
**↓**
**Optimized Idea:** If sorted by start time, interval $A$ can only overlap with interval $B$ if $B_{start} \le A_{end}$. We only need to check adjacent intervals in $O(N \log N)$ time.

## Sub-Patterns
*   **Merge Intervals:** `prev[1] = max(prev[1], curr[1])`
*   **Meeting Rooms / Platforms:** Separate arrays for arrival and departure, sort both, and use Two Pointers.


---

## The Repeated Extremum Family

- **What it is:** The problem requires you to find the maximum, minimum, or "best" element, and it asks you to do this repeatedly as the data changes
- **The signal:** "Top K", "Merge K", "Kth largest", "Running median", "Max in sliding window", "Next greater element"
- **The mechanism:** Scanning an array for the max takes O(n). Doing it k times takes O(k · n). You must trade space for a data structure that maintains the extremum internally, allowing O(1) or O(log n) retrieval

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Heap (Priority Queue)** | "Top K", "Merge K sorted" | A partial sort is faster than a full sort. Maintains the absolute global extremum |
| **Monotonic Stack** | "Next greater element" | A local extremum eliminates the need to check smaller previous elements |
| **Segment Tree** | "Max in range `[L, R]` with updates" | Tree structure allows querying any arbitrary range in O(log n) |
| **Sparse Table** | "Max in range `[L, R]`, static data" | Precomputes intervals of length 2^k for O(1) overlapping queries |

### Heap vs Sorting

- If a problem asks for the *largest* element, scanning takes O(n)
- If a problem asks for the *Kth largest*, you can sort the array and return `arr[n - k]`. This takes O(n log n)
- If you use a Heap (Priority Queue) of size k, you process each element in O(log k). Total time: O(n log k)
- **The mathematical difference:** If n = 1,000,000 and k = 10, n log n ≈ 20,000,000 operations. n log k ≈ 3,000,000 operations. A heap is nearly an order of magnitude faster for small k


---

## Heap for Top K

- **What it is:** Maintaining a Priority Queue of size k to track the best k elements seen so far
- **When to reach for it:** "Find the Kth largest element", "K closest points to origin", "Top K frequent words"
- **Why it works:** To find the Top K *largest* elements, you maintain a *Min-Heap* of size k. The heap stores the "winners". The root of the Min-Heap is always the *smallest of the winners*

### The visual mechanism

- We want the Top 3 largest numbers in `[5, 1, 9, 3, 7]`

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="A min-heap of size 3 processing elements. It drops smaller elements and keeps the 3 largest. The root of the min-heap is the Kth largest overall." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .rej { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.1; stroke-dasharray: 2 2;}
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>
  
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="20" y="20" class="lb">State 1: processed [5, 1, 9]</text>
  <circle class="hi" cx="80" cy="50" r="12" />
  <text x="80" y="53" class="lb" text-anchor="middle">1</text>
  <circle class="hi" cx="50" cy="80" r="12" />
  <text x="50" y="83" class="lb" text-anchor="middle">5</text>
  <circle class="hi" cx="110" cy="80" r="12" />
  <text x="110" y="83" class="lb" text-anchor="middle">9</text>
  <path class="a" d="M 72 58 L 58 72" />
  <path class="a" d="M 88 58 L 102 72" />
  
  <text x="80" y="110" class="sm" text-anchor="middle">Min is at root</text>

  <text x="220" y="20" class="lb">State 2: incoming 3</text>
  <circle class="rej" cx="280" cy="50" r="12" />
  <text x="280" y="53" class="lb" text-anchor="middle" fill="#ef476e">1</text>
  <text x="280" y="32" class="sm" text-anchor="middle" fill="#ef476e">3 > 1, so pop 1, push 3</text>
  
  <text x="400" y="20" class="lb">State 3: final heap</text>
  <circle class="hi" cx="420" cy="50" r="12" />
  <text x="420" y="53" class="lb" text-anchor="middle">3</text>
  <circle class="hi" cx="390" cy="80" r="12" />
  <text x="390" y="83" class="lb" text-anchor="middle">5</text>
  <circle class="hi" cx="450" cy="80" r="12" />
  <text x="450" y="83" class="lb" text-anchor="middle">9</text>
  <path class="a" d="M 412 58 L 398 72" />
  <path class="a" d="M 428 58 L 442 72" />
  
  <text x="420" y="110" class="sm" text-anchor="middle">3rd largest is the root</text>
</svg>
:::

### The logic inversion

- To find the **Top K Largest**, use a **Min-Heap**. Why? You want the *smallest* of the current winners to be at the root, so you can easily compare it against incoming numbers in O(1) and pop it in O(log k) if a larger number arrives
- To find the **Top K Smallest**, use a **Max-Heap**. You want the *largest* of the current winners exposed at the root to be overwritten by smaller incoming numbers

### The Template

```ts
// Assuming a MinPriorityQueue class exists
function findKthLargest(nums: number[], k: number): number {
  const minHeap = new MinPriorityQueue();
  
  for (const num of nums) {
    minHeap.enqueue(num);
    
    // If heap exceeds size k, pop the smallest element
    if (minHeap.size() > k) {
      minHeap.dequeue();
    }
  }
  
  // The root of the min-heap is the Kth largest overall
  return minHeap.front().element;
}
```


---

## Heap for Merge

- **What it is:** Using a priority queue to multi-way merge K different sorted structures
- **When to reach for it:** "Merge K sorted lists", "Kth smallest element in a sorted matrix"
- **Why it works:** If you have 3 sorted arrays, the absolute smallest element *must* be the first element of Array A, B, or C. If you pick the smallest from those three, the *next* smallest must be one of the remaining two, plus the newly exposed element from the array you just picked from

### The visual mechanism

- Arrays: `A = [1, 5]`, `B = [2, 4]`, `C = [3, 6]`
- Initial Heap contains the heads: `[1, 2, 3]`. The smallest is `1` (from A)
- Pop `1`, push the next element from A (`5`). Heap is now `[2, 3, 5]`
- The smallest is `2` (from B). Pop `2`, push `4` from B. Heap: `[3, 4, 5]`

### The Template

```ts
class ListNode {
  val: number;
  next: ListNode | null;
}

function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  // MinHeap must sort by node.val
  const minHeap = new MinPriorityQueue({ priority: node => node.val });
  
  // 1. Push the head of every list into the heap
  for (const head of lists) {
    if (head !== null) minHeap.enqueue(head);
  }
  
  const dummy = new ListNode(0);
  let current = dummy;
  
  // 2. Extract the minimum, and push its successor
  while (!minHeap.isEmpty()) {
    const node = minHeap.dequeue().element;
    current.next = node;
    current = current.next;
    
    if (node.next !== null) {
      minHeap.enqueue(node.next);
    }
  }
  
  return dummy.next;
}
```

### The Complexity

- Number of lists: K. Total nodes across all lists: N.
- The heap never holds more than K elements. Pushing/popping takes O(log K).
- We do this for all N nodes. Total time: O(N log K).
- Compare this to concatenating all arrays and sorting them: O(N log N). If N is 1 million and K is 10, the heap approach is dramatically faster because it exploits the fact that the individual arrays are *already* sorted

:::interview
"Can we merge K sorted arrays without a heap?"

Yes, using Divide and Conquer. We can merge pairs of arrays iteratively, reducing K to K/2, then K/4, until 1 array remains. The time complexity is identical to the heap approach: O(N log K). However, the heap approach is often simpler to write iteratively and handles continuous streams of data better.
:::


---

## Monotonic Stack as Extremum

- We covered the Monotonic Stack under the **Locality** family, because it processes local contiguous regions
- It is *also* a member of the **Repeated Extremum** family, because it tracks a running extremum (the next greater or next smaller element)
- This dual-identity is common. The technique exploits locality to find an extremum

### When to use a Heap vs a Monotonic Stack

- A **Heap** finds the *global* extremum of the data it holds. It does not care about the original order of the elements. Once an element is in the heap, its original array index is usually irrelevant
- A **Monotonic Stack** finds a *local, order-dependent* extremum. It strictly enforces the original chronological or spatial order of the elements

| Property | Min/Max Heap | Monotonic Stack |
|---|---|---|
| **Structure** | Binary Tree (Implicit Array) | Stack (Array) |
| **Order tracking** | Ignores original order | Strictly preserves original order |
| **Time per element** | O(log k) | O(1) amortised |
| **Typical question** | "What is the 3rd largest number overall?" | "What is the next larger number to the right of me?" |

### The trap

- **Using a heap when order matters.** If the problem asks "find the largest element in every sliding window of size k", you *can* use a Heap. You push `(value, index)`, and if the max element's index is outside the window, you pop it. But this takes O(n log n) time. Since the sliding window enforces strict contiguous locality, you should use a **Monotonic Queue (Deque)** to solve it in O(n) time

:::interview
"Can we solve 'Sliding Window Maximum' with a Priority Queue?"

Yes, we can push `[value, index]` into a Max-Heap. When looking for the max of the current window, we check the root. If its index is outside the window bounds, we pop it and check the next one. This takes O(n log n). However, because we only care about the *local* window, a Monotonic Deque can solve this optimally in O(n) time by permanently discarding dominated elements.
:::


---

## Segment Tree for Range Queries

- **What it is:** A binary tree where each node represents an interval of the array, and stores the extremum (or sum) of that interval
- **When to reach for it:** "Find the max in range `[L, R]`... and also update `arr[i] = x`"
- **Why it works:** Precomputing the max for every possible range takes O(n²) space and time. A segment tree precomputes only O(n) specific ranges (power-of-two chunks). Any arbitrary range `[L, R]` can be constructed by combining at most O(log n) of these precomputed chunks

### The visual mechanism

- Array: `[2, 5, 1, 4]`

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="A segment tree showing range maximums. The root covers the whole array (max 5). Left child covers first half (max 5), right covers second half (max 4)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>

  <!-- Level 0 (Root) -->
  <rect class="hi" x="200" y="10" width="70" height="20" rx="3" />
  <text x="235" y="24" class="lb" text-anchor="middle">Max: 5</text>
  <text x="235" y="40" class="sm" text-anchor="middle">Range [0, 3]</text>

  <!-- Level 1 -->
  <rect class="bx" x="110" y="55" width="60" height="20" rx="3" />
  <text x="140" y="69" class="lb" text-anchor="middle">Max: 5</text>
  <text x="140" y="85" class="sm" text-anchor="middle">[0, 1]</text>

  <rect class="bx" x="300" y="55" width="60" height="20" rx="3" />
  <text x="330" y="69" class="lb" text-anchor="middle">Max: 4</text>
  <text x="330" y="85" class="sm" text-anchor="middle">[2, 3]</text>

  <!-- Level 2 (Leaves) -->
  <rect class="bx" x="75" y="95" width="30" height="20" rx="2" />
  <text x="90" y="109" class="lb" text-anchor="middle">2</text>
  
  <rect class="bx" x="145" y="95" width="30" height="20" rx="2" />
  <text x="160" y="109" class="lb" text-anchor="middle">5</text>

  <rect class="bx" x="265" y="95" width="30" height="20" rx="2" />
  <text x="280" y="109" class="lb" text-anchor="middle">1</text>

  <rect class="bx" x="335" y="95" width="30" height="20" rx="2" />
  <text x="350" y="109" class="lb" text-anchor="middle">4</text>

  <!-- Edges -->
  <path class="a" d="M 235 30 L 140 55" />
  <path class="a" d="M 235 30 L 330 55" />
  <path class="a" d="M 140 75 L 90 95" />
  <path class="a" d="M 140 75 L 160 95" />
  <path class="a" d="M 330 75 L 280 95" />
  <path class="a" d="M 330 75 L 350 95" />
</svg>
:::

### The constraint fingerprint

- You have an array of size n ≤ 10⁵.
- You have Q ≤ 10⁵ queries.
- **The catch:** The queries are a mix of "find the max in range `[L, R]`" and "update `arr[i] = X`".
- If there were no updates, you could use a Sparse Table (O(1) query, O(n log n) build).
- If it were sums instead of max, you could use a Fenwick tree or Prefix sum (if no updates).
- The presence of *updates* combined with *range max/min* is the absolute, irrefutable fingerprint of a Segment Tree. It does both in O(log n) time.

### The trap

- **Implementing it for static data.** Segment trees are heavy to code and have a large constant factor. If the array never changes (no updates), a Sparse Table is fundamentally better for min/max queries because it answers them in O(1) time. A segment tree on static data is over-engineering


---

## Sparse Table

- **What it is:** A 2D array that precomputes the minimum or maximum of every interval whose length is a power of 2
- **When to reach for it:** "Find the max in range `[L, R]` on an array that NEVER changes" (Range Minimum Query - RMQ)
- **Why it works:** Any interval of length L can be completely covered by exactly two overlapping intervals of length 2^k, where 2^k ≤ L. Because max(A cup B) = max(max(A), max(B)), the overlap doesn't matter

### The visual mechanism

- Query: Max of `[2, 7]` (length 6)
- The largest power of 2 that fits in 6 is 4 (2²)
- The range `[2, 7]` is covered by taking the max of `[2, 5]` (length 4 starting at 2) and `[4, 7]` (length 4 ending at 7)
- Notice they overlap at `[4, 5]`. For minimum or maximum, overlapping is harmless

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Sparse Table query mechanism. The range [2, 7] is covered by taking the max of [2, 5] and [4, 7], which overlap but safely cover the entire target range in O(1)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
  </style>

  <!-- Array Indices -->
  <text x="35" y="15" class="sm">0</text><text x="75" y="15" class="sm">1</text>
  <text x="115" y="15" class="sm">2</text><text x="155" y="15" class="sm">3</text>
  <text x="195" y="15" class="sm">4</text><text x="235" y="15" class="sm">5</text>
  <text x="275" y="15" class="sm">6</text><text x="315" y="15" class="sm">7</text>
  <text x="355" y="15" class="sm">8</text>

  <!-- Query Range -->
  <rect class="bx" x="100" y="25" width="240" height="20" rx="2" stroke-dasharray="2 2" />
  <text x="220" y="39" class="lb" text-anchor="middle">Target Query Range [2, 7]</text>

  <!-- Covering Intervals -->
  <rect class="hi" x="100" y="55" width="160" height="20" rx="2" />
  <text x="180" y="69" class="lb" text-anchor="middle">Precomputed [2, 5]</text>
  <text x="50" y="69" class="sm">Length 4</text>

  <rect class="hi" x="180" y="85" width="160" height="20" rx="2" />
  <text x="260" y="99" class="lb" text-anchor="middle">Precomputed [4, 7]</text>
  <text x="360" y="99" class="sm">Length 4</text>
</svg>
:::

### The Complexity

- **Build time:** O(n log n). There are log n rows, and we compute each row of length n by combining two elements from the previous row
- **Query time:** O(1). It's just two array lookups and a `Math.max()`
- **Space:** O(n log n) to store the table

### The trap

- **Using a Sparse Table for range sums.** Sparse tables rely on the property that overlapping coverage doesn't affect the answer. max(a, a) = a. But sum(a, a) = 2a. If you overlap sum ranges, you double-count the intersection. For static range sums, use a simple Prefix Sum array (O(n) build, O(1) query)

:::interview
"We need to query the maximum value between any two indices in a massive static log file, millions of times."

Since the data is static, we should build a Sparse Table. It takes O(N log N) to build, but every query is answered in O(1) time, which is optimal for a heavily query-bound system.
:::


---

### The wrong approach: Repeated Extremum

- **Naive idea:** For "Top K elements", beginners sort the entire array and return the last K elements
- **Why it looks right:** It solves the problem flawlessly and handles duplicates correctly (if using a stable sort)
- **Why it breaks:** Sorting takes O(n log n). If you only need the Top 3 elements out of 10 million, you did 200 million operations to perfectly sort the bottom 9,999,997 elements that you immediately throw away
- **The fix:** A Heap (Priority Queue) of size K takes O(n log k). It maintains a partial, rolling sort of only the elements that matter

### Recognition drills

You have 20 seconds per problem. Identify which Repeated Extremum pattern applies.

| # | Problem sketch | Your answer |
|---|---|---|
| 1 | Given a stream of integers, find the median value at any point | |
| 2 | Find the area of the largest rectangle that can be formed in a histogram | |
| 3 | You have a static array of heights. Answer 100,000 queries about the minimum height between index L and R | |
| 4 | You have an array of server loads. Update the load at index i, and query the maximum load between index L and R | |

:::note
**Answers:** 
1. **Two Heaps (Max-Heap for lower half, Min-Heap for upper half).** Classic streaming extremum.
2. **Monotonic Stack.** You need the "next smaller element" to determine where a rectangle's width terminates.
3. **Sparse Table.** Range extremum on static data. O(1) queries beat O(log n) Segment Tree.
4. **Segment Tree.** Range extremum WITH updates. Sparse table cannot update.
:::


---

## Recognition drills: Repeated Extremum

Hide the right column. Identify the correct Extremum technique (Heap for Top-K, Heap for Merge, Monotonic Stack, Sparse Table) and justify your answer.

| Problem | Extremum Pattern & Justification |
|---|---|
| 1. Find the Kth largest element in a massive stream of numbers. | **Heap for Top-K.** Maintain a Min-Heap of size K. For every new number, if it's larger than the heap top, pop and push. Space is O(K), time is O(N log K). |
| 2. Given K sorted linked lists, merge them into a single sorted list. | **Heap for Merge.** Insert the head of each list into a Min-Heap. Pop the smallest, append it to the result, and push the next node from that same list into the heap. |
| 3. Given an array of building heights, find the area of the largest rectangle that can be formed within the histogram. | **Monotonic Stack (Next Smaller Element).** For every building, we need to know the first shorter building to its left and right to determine its maximum width. A monotonic increasing stack finds this in O(N). |
| 4. Given a static array of prices, answer 10^5 queries of the form "What was the lowest price between day L and day R?" | **Sparse Table.** Static array, idempotent operation (minimum), massive number of queries. O(N log N) build, O(1) query. |
| 5. You have a stream of task execution times. You need to dynamically extract the median time. | **Heap (Two Heaps).** Maintain a Max-Heap for the lower half of the data and a Min-Heap for the upper half. Keep their sizes balanced. The median is either the top of the larger heap, or the average of both tops. |
| 6. Find the "next greater element" for every element in an array. | **Monotonic Stack.** The canonical monotonic stack problem. Maintain a decreasing stack. When a larger element arrives, it pops smaller elements and serves as their "next greater". |
| 7. Given an array of strings, return the K most frequent words. | **Heap for Top-K (with Hash Map).** First, count frequencies using a Hash Map. Then, maintain a Min-Heap of size K based on frequency (and lexicographical order for ties). |
| 8. Connect N ropes with minimum cost. The cost to connect two ropes is their sum. | **Heap (Greedy).** Always connect the two shortest available ropes. Put all ropes in a Min-Heap. Pop two, add them, add the cost to total, and push the new rope back into the heap. Repeat until one rope remains. |

### Score yourself
- **7-8 correct:** You clearly understand the boundary between dynamic extremums (Heap) and structural extremums (Monotonic Stack)
- **4-6 correct:** You might be trying to use Heaps for "next greater" problems, which works but is O(N log N) instead of O(N)
- **0-3 correct:** Review the Extremum Family introduction (04-01) to understand the difference between global ordering (Heaps) and sequence ordering (Stacks)


---

## The Dependency Family

- **What it is:** Problems where actions must be performed in a specific order because one action unlocks another
- **The signal:** "Prerequisites", "Course schedule", "Build system", "Shortest path in a DAG", "Longest path"
- **The mechanism:** Representing the problem as a Directed Acyclic Graph (DAG) and processing nodes in an order that respects the directed edges. We can only process a node when all its prerequisites (incoming edges) have been resolved

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Topological Sort (Kahn's)** | "Can you finish all courses?", "Valid build order" | Peeling away nodes with zero in-degree iteratively |
| **DAG Dynamic Programming** | "Longest path in a DAG", "Number of ways to reach X" | State transitions flow perfectly along the topological order |
| **Critical Path Method** | "Minimum time to finish all parallel tasks" | The longest path through dependencies determines the minimum time |

### The structural requirement: Acyclicity

- For a dependency chain to be resolvable, the graph **must not contain a cycle**. If Course A requires Course B, and Course B requires Course A, neither can ever be taken
- A Directed Acyclic Graph (DAG) is the mathematical structure that underpins all dependency logic. The absence of cycles guarantees that there is at least one valid linear ordering of the nodes (a Topological Sort)
- Many dependency problems secretly ask you to detect cycles. "Is this course schedule valid?" translates directly to: "Does this directed graph contain a cycle?"


---

## Topological Sort (Kahn's Algorithm)

- **What it is:** Ordering the vertices of a DAG such that for every directed edge U to V, vertex U comes before V in the ordering
- **Why it works (Kahn's approach):** It relies on **In-Degree** (the number of incoming edges). A node with an in-degree of 0 has no prerequisites. We can safely process it. Processing a node means removing its outgoing edges, which reduces the in-degree of its neighbors. This unlocks new nodes

### The visual mechanism

- Edges: `A -> C`, `B -> C`, `C -> D`

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Kahn's algorithm for Topological Sort. Nodes A and B have 0 in-degree. We process them, which removes their edges to C, reducing C's in-degree to 0. Then we process C." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>

  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <!-- Nodes -->
  <circle class="hi" cx="60" cy="40" r="15" />
  <text x="60" y="44" class="lb" text-anchor="middle">A</text>
  <text x="60" y="15" class="sm" text-anchor="middle" fill="#2d6a4f">In: 0</text>
  
  <circle class="hi" cx="60" cy="90" r="15" />
  <text x="60" y="94" class="lb" text-anchor="middle">B</text>
  <text x="60" y="118" class="sm" text-anchor="middle" fill="#2d6a4f">In: 0</text>

  <circle class="bx" cx="160" cy="65" r="15" />
  <text x="160" y="69" class="lb" text-anchor="middle">C</text>
  <text x="160" y="40" class="sm" text-anchor="middle">In: 2</text>

  <circle class="bx" cx="260" cy="65" r="15" />
  <text x="260" y="69" class="lb" text-anchor="middle">D</text>
  <text x="260" y="40" class="sm" text-anchor="middle">In: 1</text>

  <!-- Edges -->
  <path class="a" d="M 75 44 L 140 60" marker-end="url(#arrow)" />
  <path class="a" d="M 75 86 L 140 70" marker-end="url(#arrow)" />
  <path class="a" d="M 175 65 L 240 65" marker-end="url(#arrow)" />
  
  <!-- Explanation -->
  <text x="320" y="40" class="sm">1. Queue A and B (In-degree 0)</text>
  <text x="320" y="60" class="sm">2. Pop A, remove A->C. (C in-degree: 1)</text>
  <text x="320" y="80" class="sm">3. Pop B, remove B->C. (C in-degree: 0)</text>
  <text x="320" y="100" class="sm">4. Queue C.</text>
</svg>
:::

### The Template (Kahn's BFS)

```ts
function topologicalSort(numCourses: number, prerequisites: number[][]): number[] {
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);
  
  // 1. Build Graph and In-Degree array
  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course); // prereq -> course
    inDegree[course]++;
  }
  
  // 2. Initialise Queue with 0-in-degree nodes
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  
  const order: number[] = [];
  
  // 3. Process
  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);
    
    // "Remove" outgoing edges
    for (const neighbor of adj[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  // 4. Cycle Detection Check
  if (order.length !== numCourses) return []; // Cycle detected
  return order;
}
```

### The constraint fingerprint

- You are given a list of pairs `[u, v]` indicating a relationship.
- Total nodes V ≤ 10⁵, Total edges E ≤ 10⁵.
- You need to find an order, or check if an order is possible.
- Kahn's algorithm processes each vertex and edge exactly once: O(V + E) time and space.


---

## DAG Dynamic Programming

- **What it is:** Performing Dynamic Programming transitions along the topological order of a Directed Acyclic Graph
- **When to reach for it:** "Longest path in a DAG", "Number of ways to reach node X", "Minimum time to complete all tasks"
- **Why it works:** DP requires that a state is fully resolved before it is used to calculate other states. A DAG provides this guarantee natively. By processing nodes in topological order, you guarantee that when you are at node U, all paths *leading* to U have already been completely processed

### The mechanism

- Consider finding the longest path. You can't use Dijkstra's because edge weights might be negative, and you can't use Bellman-Ford because it's O(V · E).
- In a DAG, you can find the longest (or shortest) path in O(V + E) time.
- `longestPath[V] = max(longestPath[U_i] + weight(U_i, V))` for all incoming neighbors U_i

```ts
// After performing Kahn's Topological Sort to get 'order'
function longestPathDAG(order: number[], adj: [number, number][][], n: number): number {
  const dist = new Array(n).fill(-Infinity);
  dist[order[0]] = 0; // Starting node
  
  for (const u of order) {
    if (dist[u] !== -Infinity) {
      for (const [v, weight] of adj[u]) {
        if (dist[v] < dist[u] + weight) {
          dist[v] = dist[u] + weight; // Relax the edge
        }
      }
    }
  }
  
  return Math.max(...dist);
}
```

### Critical Path Method (CPM)

- Used extensively in project management and parallel computing.
- If multiple tasks can run in parallel, but Task D requires Task A, B, and C to finish first, the start time of D is constrained by the *slowest* of A, B, and C.
- This is exactly finding the longest path in a DAG.
- `startTime[D] = max(endTime[A], endTime[B], endTime[C])`
- You compute this effortlessly by modifying Kahn's algorithm: when you decrement `inDegree[neighbor]`, you also update its required start time

### The trap

- **Trying to use Dijkstra for the longest path.** Dijkstra's algorithm fundamentally relies on the fact that adding edges makes paths *longer* (hence positive weights only). If you negate weights to find the longest path, Dijkstra's greedy choice property fails. But on a DAG, the topological order forces the correct resolution sequence, allowing DP to solve it optimally in linear time


---

## Critical Path Analysis

- In dependency graphs (like job scheduling or build systems), you often need to find the **minimum time required to complete all tasks**
- Because tasks can run in parallel, the total time is not the sum of all task durations. The total time is dictated entirely by the **Critical Path** — the longest sequence of dependent tasks

### The Mechanism

- The critical path is simply the **longest path in a Directed Acyclic Graph (DAG)**, where the edge weights (or node weights) represent time
- Standard Dijkstra cannot find the longest path (it finds shortest). DFS can find it, but it's slow if there are many overlapping paths
- **The insight:** Because dependencies form a DAG (no cycles), we can process the nodes in **Topological Order**
- If we process nodes topologically, we guarantee that when we evaluate a node, all of its prerequisites have already been fully evaluated

### The Algorithm

1. Compute the in-degree of all nodes (how many prerequisites they have)
2. Put all nodes with 0 in-degree into a queue. Set their `completionTime = duration`
3. Process the queue (Kahn's Algorithm):
   - Pop a node $U$
   - For each dependent node $V$:
     - Update its completion time: `completionTime[V] = max(completionTime[V], completionTime[U] + duration[V])`
     - Decrement the in-degree of $V$. If it reaches 0, push it to the queue
4. The answer is the `max(completionTime)` across all nodes

```ts
function minimumTimeToComplete(n: number, relations: number[][], time: number[]): number {
  const adj: number[][] = Array.from({ length: n + 1 }, () => []);
  const inDegree = new Array(n + 1).fill(0);
  const completionTime = new Array(n + 1).fill(0);
  
  for (const [prev, next] of relations) {
    adj[prev].push(next);
    inDegree[next]++;
  }
  
  const queue: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
      completionTime[i] = time[i - 1]; // 0-indexed time array
    }
  }
  
  let totalTime = 0;
  while (queue.length > 0) {
    const u = queue.shift()!;
    totalTime = Math.max(totalTime, completionTime[u]);
    
    for (const v of adj[u]) {
      // The critical path to V is the MAXIMUM of all paths leading to it
      completionTime[v] = Math.max(completionTime[v], completionTime[u] + time[v - 1]);
      inDegree[v]--;
      if (inDegree[v] === 0) queue.push(v);
    }
  }
  
  return totalTime;
}
```

:::interview
"Why do we use Math.max when accumulating the time?"

Because a task cannot start until ALL of its prerequisites are finished. If task C depends on A (takes 2 hours) and B (takes 5 hours), C cannot start at hour 2. It must wait until hour 5. The completion time of C is bottlenecked by the longest path leading to it.
:::


---

### The wrong approach: Dependency

- **Naive idea:** Using a standard recursive DFS with a "visited" set to check if you can finish all courses
- **Why it looks right:** You traverse the graph. If you hit a node you've already visited, you declare there's a cycle
- **Why it breaks:** A DAG can have multiple valid paths converging on the same node. `A -> B -> D` and `A -> C -> D`. When you traverse the `C` path, you will see that `D` is already in the `visited` set. The naive DFS will falsely report this as a cycle.
- **The fix:** You must use a 3-state tracking mechanism in DFS (0 = unvisited, 1 = visiting/on current recursion stack, 2 = fully processed and safe). A cycle only exists if you hit a node that is currently in state 1. This is why Kahn's BFS (using in-degrees) is heavily preferred by interviewees: it is much harder to mess up the state tracking.

### Recognition drills

You have 20 seconds per problem. Identify which Dependency pattern applies.

| # | Problem sketch | Your answer |
|---|---|---|
| 1 | Given a list of packages and their dependencies, output a valid installation order | |
| 2 | Find the minimum time required to complete N jobs where some jobs require others to finish first | |
| 3 | You have an alien dictionary with words sorted lexicographically. Find the alphabetical order of the alien letters | |
| 4 | Find the shortest path from a start node to all other nodes in a network with positive and negative edge weights, but no cycles | |

:::note
**Answers:** 
1. **Topological Sort.** A direct mapping to finding a valid order.
2. **Critical Path (DAG DP).** The minimum time for parallel dependencies is determined by the *longest* path of prerequisites.
3. **Topological Sort.** The sorted words provide directed edges between characters (e.g., if "ba" comes before "bc", then 'a' -> 'c'). You build the graph and sort it.
4. **DAG DP.** Since it has no cycles (it's a DAG), we don't need Bellman-Ford. We can just process it in topological order in O(V+E) time.
:::


---

## The Range Interaction Family

- **What it is:** Performing operations (queries or updates) on contiguous subsegments of an array, repeatedly
- **The signal:** "Sum of elements between L and R", "Add X to all elements from L to R", "Subarray sum equals K"
- **The mechanism:** A naive range operation on a length N array takes O(N). If you have Q queries, the total time is O(N · Q). This family relies on precomputation. By spending O(N) time upfront, we can answer queries or process updates in O(1) time

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Prefix Sums** | "Sum of range `[L, R]`" on static data | Sum[L, R] = Sum[0, R] - Sum[0, L-1] |
| **Difference Array** | "Add X to range `[L, R]`" without querying until the end | Modifying the boundary of a range implicitly modifies everything inside it |
| **Prefix Hash Map** | "Find a subarray that sums to K" | If Sum[0, i] - K exists earlier in the array, the subarray between them sums to K |
| **Fenwick Tree** | "Point update, Range sum" on dynamic data | Numbers can be represented as sums of powers of 2 |
| **Segment Tree** | "Point update, Range min/max/sum" on dynamic data | Arrays can be queried as binary trees of merged blocks |
| **Lazy Propagation** | "Range update, Range query" on dynamic data | Updates can be cached at higher nodes and propagated on-demand |

### The mathematical foundation of boundaries

- A range `[L, R]` has two defining boundaries. 
- In **Prefix Sums**, we calculate the area *up to* the right boundary (R) and subtract the area *before* the left boundary (L-1).
- In **Difference Arrays**, we add a value at the left boundary (L) and subtract it just after the right boundary (R+1) so it stops affecting the running sum.
- Both techniques exploit the fact that a range operation can be perfectly defined by manipulating exactly two points, regardless of how wide the range is.

:::interview
"Why do we need Prefix Hash Maps instead of sliding windows for subarrays summing to K?"

Because sliding windows rely on monotonicity. If the array contains negative numbers, adding a new element might DECREASE the sum, meaning we can't safely shrink the window from the left. A Prefix Hash Map doesn't rely on monotonicity; it purely relies on the algebraic fact that `prefix[i] - prefix[j] = K`.
:::


---

## Prefix Sums

- **What it is:** An array where the value at index i is the sum of all elements from index 0 to i in the original array
- **When to reach for it:** You need to rapidly query the sum of elements between any two indices L and R
- **Why it works:** `Sum[L, R]` is mathematically identical to `Sum[0, R] - Sum[0, L-1]`. By precomputing all `Sum[0, i]`, any arbitrary range query becomes a single O(1) subtraction

### The visual mechanism

- Original: `[3, 1, 4, 1, 5]`
- Prefix: `[3, 4, 8, 9, 14]`
- Query sum of `[1, 3]` (values `1, 4, 1`, sum is `6`).
- Using Prefix: `Prefix[3] - Prefix[0]` = `9 - 3` = `6`.

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="Prefix sum calculation. The sum of range L to R is found by taking the prefix sum at R and subtracting the prefix sum just before L." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
  </style>

  <!-- Array Indices -->
  <text x="55" y="25" class="sm">0</text><text x="95" y="25" class="sm">1</text>
  <text x="135" y="25" class="sm">2</text><text x="175" y="25" class="sm">3</text>
  <text x="215" y="25" class="sm">4</text>

  <!-- Prefix Array -->
  <text x="10" y="45" class="sm">Prefix</text>
  <rect class="hi" x="40" y="30" width="30" height="20" rx="2" />
  <rect class="bx" x="80" y="30" width="30" height="20" rx="2" />
  <rect class="bx" x="120" y="30" width="30" height="20" rx="2" />
  <rect class="hi" x="160" y="30" width="30" height="20" rx="2" />
  <rect class="bx" x="200" y="30" width="30" height="20" rx="2" />
  
  <text x="55" y="44" class="lb" text-anchor="middle">3</text>
  <text x="95" y="44" class="lb" text-anchor="middle">4</text>
  <text x="135" y="44" class="lb" text-anchor="middle">8</text>
  <text x="175" y="44" class="lb" text-anchor="middle">9</text>
  <text x="215" y="44" class="lb" text-anchor="middle">14</text>

  <!-- Explanation -->
  <text x="40" y="75" class="lb">Query [1, 3] = Prefix[3] - Prefix[0]</text>
  <text x="120" y="95" class="lb">= 9 - 3</text>
  <text x="120" y="115" class="lb" fill="#2d6a4f">= 6</text>
</svg>
:::

### The Template

```ts
class RangeQuery {
  private prefix: number[];

  constructor(nums: number[]) {
    // We make prefix size N+1 to cleanly handle L=0 without out-of-bounds checks
    this.prefix = new Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
      this.prefix[i + 1] = this.prefix[i] + nums[i];
    }
  }

  query(left: number, right: number): number {
    // Because prefix is 1-indexed internally, we query (right + 1) - (left)
    return this.prefix[right + 1] - this.prefix[left];
  }
}
```

### Prefix Hash Map (Subarray Sum equals K)

- If a problem asks "Find the total *number* of continuous subarrays whose sum equals K", you cannot just use a sliding window if there are negative numbers (because adding a number might decrease the sum, breaking monotonicity).
- **The insight:** If the current running sum is X, and we want a subarray that sums to K, we need to chop off a previous prefix that sums to X - K.
- We store every prefix sum we've seen so far in a Hash Map. At index i, we check if `currentSum - K` exists in the map. If it does, we found valid subarrays ending at i.

### The trap

- **Forgetting the empty prefix.** When building a Prefix Hash Map, you MUST initialise the map with `{ 0: 1 }`. This represents the "empty" prefix before the array starts. If a subarray starting at index 0 sums perfectly to K, `currentSum - K` will equal 0. If `0` is not in the map, you will fail to count it.

:::interview
"What is the space complexity of a Prefix Hash Map?"

It is O(N) because in the worst case (all positive numbers), every prefix sum is unique and must be stored in the map. This is the trade-off for reducing the O(N²) time complexity of checking all subarrays down to O(N).
:::


---

## Difference Array

- **What it is:** The inverse of a prefix sum. An array where the value at index i stores `arr[i] - arr[i-1]`
- **When to reach for it:** You need to apply many updates of the form "Add X to all elements from L to R", and you only need to read the final array values *after* all updates are done
- **Why it works:** To add X to `[L, R]`, you only add X to `diff[L]`, and subtract X from `diff[R+1]`. This takes O(1) time. When all updates are done, you calculate the prefix sum of the difference array to recover the final values

### The visual mechanism

- We want to add 10 to range `[1, 3]` in an array of 5 zeroes.
- Updates: `diff[1] += 10`, `diff[4] -= 10`.

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Difference array processing. Adding 10 at the left boundary and subtracting 10 just after the right boundary. Running a prefix sum perfectly reconstructs the range addition." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>

  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="20" y="20" class="lb">1. Difference Array Updates</text>
  <rect class="bx" x="20" y="30" width="30" height="20" rx="2" />
  <rect class="hi" x="60" y="30" width="30" height="20" rx="2" />
  <rect class="bx" x="100" y="30" width="30" height="20" rx="2" />
  <rect class="bx" x="140" y="30" width="30" height="20" rx="2" />
  <rect class="hi" x="180" y="30" width="30" height="20" rx="2" />
  
  <text x="35" y="44" class="lb" text-anchor="middle">0</text>
  <text x="75" y="44" class="lb" text-anchor="middle" fill="#2d6a4f">+10</text>
  <text x="115" y="44" class="lb" text-anchor="middle">0</text>
  <text x="155" y="44" class="lb" text-anchor="middle">0</text>
  <text x="195" y="44" class="lb" text-anchor="middle" fill="#2d6a4f">-10</text>
  
  <text x="75" y="65" class="sm" text-anchor="middle">L=1</text>
  <text x="195" y="65" class="sm" text-anchor="middle">R+1=4</text>

  <text x="20" y="90" class="lb">2. Recover via Prefix Sum</text>
  <rect class="bx" x="20" y="100" width="30" height="20" rx="2" />
  <rect class="bx" x="60" y="100" width="30" height="20" rx="2" />
  <rect class="bx" x="100" y="100" width="30" height="20" rx="2" />
  <rect class="bx" x="140" y="100" width="30" height="20" rx="2" />
  <rect class="bx" x="180" y="100" width="30" height="20" rx="2" />
  
  <text x="35" y="114" class="lb" text-anchor="middle">0</text>
  <text x="75" y="114" class="lb" text-anchor="middle">10</text>
  <text x="115" y="114" class="lb" text-anchor="middle">10</text>
  <text x="155" y="114" class="lb" text-anchor="middle">10</text>
  <text x="195" y="114" class="lb" text-anchor="middle">0</text>
  
  <!-- Flow arrows -->
  <path class="a" d="M 45 110 L 55 110" marker-end="url(#arrow)" />
  <path class="a" d="M 85 110 L 95 110" marker-end="url(#arrow)" />
  <path class="a" d="M 125 110 L 135 110" marker-end="url(#arrow)" />
  <path class="a" d="M 165 110 L 175 110" marker-end="url(#arrow)" />
</svg>
:::

### The Template

```ts
function applyUpdates(length: number, updates: [number, number, number][]): number[] {
  // We use length + 1 so that R + 1 is always in bounds
  const diff = new Array(length + 1).fill(0);
  
  for (const [L, R, val] of updates) {
    diff[L] += val;
    diff[R + 1] -= val;
  }
  
  const result = new Array(length);
  let currentSum = 0;
  
  for (let i = 0; i < length; i++) {
    currentSum += diff[i];
    result[i] = currentSum;
  }
  
  return result;
}
```

### Difference Array vs Sweep Line

- You might notice that adding a value at L and subtracting it at R+1 sounds exactly like **Sweep Line** (adding +1 for start, -1 for end).
- **They are the same underlying mathematics.**
- Use **Sweep Line** when the domain is massive (e.g. coordinates up to 10⁹) or continuous (floating point). You store the events in an array and sort them.
- Use **Difference Array** when the domain is small and dense (e.g. array indices 0 to 10⁵). You map the events directly to indices. It avoids the O(n log n) sort entirely, functioning as an O(n) bucket sort of the sweep line events.


---

## Fenwick Tree (Binary Indexed Tree)

- Prefix Sums are O(1) to query but O(N) to update. If you need to update values in a dynamic array and query prefix sums, you need a Fenwick Tree
- It provides **O(log N) point updates** and **O(log N) prefix queries**
- It relies entirely on the fact that every integer can be represented as a sum of powers of 2 (its binary representation)

### The Mechanism: Responsibility

- A Fenwick Tree is just an array of the same size as the input (1-indexed)
- Instead of `tree[i]` storing the sum from `0` to `i` (like a prefix array), `tree[i]` stores the sum of a specific **block** of numbers ending at `i`
- The length of this block is exactly the **value of the least significant set bit** (LSB) of `i`
  - Index 12 (`1100` in binary). LSB is 4 (`0100`). So `tree[12]` stores the sum of the last 4 elements: `arr[9] + arr[10] + arr[11] + arr[12]`
  - Index 10 (`1010` in binary). LSB is 2 (`0010`). So `tree[10]` stores the sum of the last 2 elements: `arr[9] + arr[10]`

### The bitwise magic

- To extract the LSB of `i`: `i & (-i)`
- **To Query `prefix(i)`:** You sum `tree[i]`, then chop off the LSB from `i`, and repeat until `i` is 0. This jumps backwards over the precomputed blocks
- **To Update `arr[i]` by `delta`:** You add `delta` to `tree[i]`, then add the LSB to `i`, and repeat until you exceed the array size. This jumps forward, updating every block that contains index `i`

### The Template

```ts
class FenwickTree {
  private tree: number[];

  constructor(size: number) {
    this.tree = new Array(size + 1).fill(0); // 1-indexed
  }

  // Adds delta to element at index i
  add(i: number, delta: number): void {
    while (i < this.tree.length) {
      this.tree[i] += delta;
      i += i & (-i); // Jump forward to next responsible block
    }
  }

  // Returns sum from 1 to i
  query(i: number): number {
    let sum = 0;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & (-i); // Jump backward to previous block
    }
    return sum;
  }

  // Returns sum from L to R
  queryRange(L: number, R: number): number {
    return this.query(R) - this.query(L - 1);
  }
}
```

### Fenwick vs Segment Tree

- Fenwick Tree is significantly shorter to write, uses half the memory, and has a smaller constant factor
- However, **Fenwick Tree only works for invertible operations** (like sum or XOR), because `queryRange(L, R)` relies on `query(R) - query(L-1)`
- If you need range minimums with point updates, Fenwick cannot help you. You must use a Segment Tree

:::interview
"Can a Fenwick Tree handle range updates?"

Yes, but indirectly. If you build a Fenwick Tree over a Difference Array instead of the original array, a range update `[L, R]` by `X` becomes two point updates: `add(L, X)` and `add(R + 1, -X)`. A point query then becomes a prefix sum query on the Fenwick Tree.
:::


---

## Segment Tree Basics

- When you need to query ranges AND update points on dynamic data, and the operation is **not invertible** (like minimum or maximum), Fenwick Tree fails. You need a Segment Tree
- A Segment Tree provides **O(log N) point updates** and **O(log N) range queries** for *any* associative operation

### The Mechanism: Divide and Conquer

- A Segment Tree is a binary tree where:
  - The **leaves** represent the individual elements of the array
  - Every **internal node** represents the combined result (sum, min, max, etc.) of its two children
  - The **root** represents the result for the entire array
- The height of the tree is O(log N), meaning any point update only needs to update O(log N) ancestors to reach the root

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Segment Tree structure for Range Minimum. Leaves hold array values, parents hold the minimum of their children." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .node { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.2; }
    .edge { stroke: #1a1a1a; stroke-width: 1; fill: none; }
    .leaf { fill: #e5e7eb; }
  </style>

  <!-- Array: [5, 2, 7, 3] -->
  
  <!-- Root [0..3] -->
  <circle cx="235" cy="20" r="14" class="node" />
  <text x="235" y="23" class="lb" text-anchor="middle">2</text>
  <text x="260" y="23" class="sm">[0..3]</text>

  <!-- Level 1 -->
  <circle cx="150" cy="65" r="14" class="node" />
  <text x="150" y="68" class="lb" text-anchor="middle">2</text>
  <text x="120" y="68" class="sm">[0..1]</text>

  <circle cx="320" cy="65" r="14" class="node" />
  <text x="320" y="68" class="lb" text-anchor="middle">3</text>
  <text x="345" y="68" class="sm">[2..3]</text>

  <!-- Edges to Level 1 -->
  <path class="edge" d="M 225 30 L 160 55" />
  <path class="edge" d="M 245 30 L 310 55" />

  <!-- Level 2 (Leaves) -->
  <circle cx="110" cy="115" r="12" class="node leaf" /> <text x="110" y="118" class="lb" text-anchor="middle">5</text>
  <circle cx="190" cy="115" r="12" class="node leaf" /> <text x="190" y="118" class="lb" text-anchor="middle">2</text>
  <circle cx="280" cy="115" r="12" class="node leaf" /> <text x="280" y="118" class="lb" text-anchor="middle">7</text>
  <circle cx="360" cy="115" r="12" class="node leaf" /> <text x="360" y="118" class="lb" text-anchor="middle">3</text>

  <!-- Edges to Level 2 -->
  <path class="edge" d="M 141 75 L 119 105" />
  <path class="edge" d="M 159 75 L 181 105" />
  <path class="edge" d="M 311 75 L 289 105" />
  <path class="edge" d="M 329 75 L 351 105" />
</svg>
:::

### The Array Representation

- We do not build actual Node objects with `left` and `right` pointers. We use a flat array, exactly like a Binary Heap
- If a node is at index `v`:
  - Left child is at `2 * v`
  - Right child is at `2 * v + 1`
- The tree array needs to be size `4 * N` to safely contain all nodes

### The Query Logic

- When querying a range `[L, R]`, you start at the root (which represents `[0, N-1]`)
- **Case 1: Total Overlap.** The node's range is completely inside `[L, R]`. Return the node's value immediately. Do not traverse further down
- **Case 2: No Overlap.** The node's range is completely outside `[L, R]`. Return a neutral value (e.g. `Infinity` for minimum, `0` for sum)
- **Case 3: Partial Overlap.** The node intersects `[L, R]`. Recursively query the left and right children and combine their results

### The power of associativity

- Segment Trees work because we can safely break `[L, R]` into smaller disjoint pieces, query them independently, and merge the results
- This requires the operation to be **associative**: `(A + B) + C = A + (B + C)`
- It does not require invertibility. It does not require idempotence. This makes Segment Trees the most flexible range querying structure

:::interview
"What is the memory complexity of a Segment Tree?"

It requires O(N) memory, specifically a flat array of size 4N. A perfect binary tree with N leaves has 2N-1 total nodes, but because N is rarely a perfect power of 2, the bottom level might not be completely full. The 4N sizing safely guarantees we won't get out-of-bounds errors regardless of the shape of the array.
:::


---

## Lazy Propagation

- A standard Segment Tree can update a single point in O(log N) time
- What if you need to update an entire range `[L, R]`? For example, "add 5 to all elements from index 10 to 20"
- If you update each point individually, it takes O((R-L) × log N) time, which degrades to O(N log N) in the worst case. This is slower than just updating the array!
- To achieve **O(log N) range updates**, we must use **Lazy Propagation**

### The Insight: Procrastination

- If a node completely covers the update range `[L, R]`, updating all its descendant leaves immediately is a waste of time. The queries might never even ask for those individual leaves
- Instead, we **update the current node** to reflect the total change, and **leave a memo (a lazy value)** for its children: *"Hey, when someone eventually visits you, remind them to add 5."*
- We stop traversing downwards. This keeps the update to O(log N)

### The `push()` operation

- The core mechanic of Lazy Propagation is the `push()` (or `propagate()`) function
- Whenever you visit a node (either to query it or to update it), you must first check if it has a pending lazy memo. If it does:
  1. Apply the lazy memo to the node's actual value
  2. Pass the memo down to its left and right children
  3. Clear the memo from the current node

```ts
function push(node: number, left: number, right: number) {
  if (lazy[node] !== 0) {
    // 1. Apply to current node (e.g., Range Sum)
    // If we add X to every element, the total sum increases by X * (elements in range)
    tree[node] += lazy[node] * (right - left + 1);
    
    // 2. Pass memo to children (if not a leaf)
    if (left !== right) {
      lazy[2 * node] += lazy[node];
      lazy[2 * node + 1] += lazy[node];
    }
    
    // 3. Clear memo
    lazy[node] = 0;
  }
}
```

### The Rule of Lazy Traversal

- **Always push before you process.** 
- In your `updateRange` function, call `push(node, left, right)` immediately upon entering the node.
- In your `queryRange` function, call `push(node, left, right)` immediately upon entering the node.
- This guarantees that any node you are looking at is completely up-to-date with all previous range updates.

### The trap: Applying the lazy value correctly

- The most common bug in Lazy Propagation is applying the lazy value incorrectly to the `tree` array
- If the tree tracks **Range Maximum**, and you add 5 to the range, the new maximum is `oldMaximum + 5`
- If the tree tracks **Range Sum**, and you add 5 to the range, the new sum is `oldSum + (5 * numberOfElementsInRange)`
- You must factor in the length of the segment when the operation dictates it

:::interview
"Why does Lazy Propagation keep updates at O(log N)?"

Because we stop traversing the tree as soon as we find a node completely contained within the update range. Instead of updating the O(N) leaves below it, we just tag that single node with a lazy marker and return. We only propagate that marker downwards later, on-demand, if a future query actually forces us to visit those children.
:::


---

### The wrong approach: Range Interaction

- **Naive idea:** Iterating from L to R to calculate the sum, or iterating from L to R to add a value.
- **Why it looks right:** It flawlessly achieves the goal for a single query.
- **Why it breaks:** It takes O(K) time per query, where K is the length of the range. If there are N elements and Q queries, the worst case is O(N · Q). If N = 10⁵ and Q = 10⁵, this is 10¹⁰ operations. It will Time Limit Exceed.
- **The fix:** For static queries, build a Prefix Sum array in O(N) once, then answer each query in O(1). Total time O(N + Q). For offline updates, build a Difference Array in O(Q), then resolve it in O(N). Total time O(N + Q).

### Recognition drills

You have 20 seconds per problem. Identify which Range Interaction pattern applies.

| # | Problem sketch | Your answer |
|---|---|---|
| 1 | Given an array of integers, find the number of contiguous subarrays that sum to exactly K. The array contains negative numbers. | |
| 2 | You have an array of 0s. You are given 100,000 commands of the form "Add X to all indices from L to R". Return the final array. | |
| 3 | You have a static 2D grid of numbers. You must rapidly answer queries asking for the sum of elements within a rectangular subgrid from (r1, c1) to (r2, c2). | |
| 4 | You need to add X to range [L, R], and immediately after each addition, you need to query the maximum value in the array. | |

:::note
**Answers:** 
1. **Prefix Hash Map.** Sliding window fails due to negative numbers. We need O(1) lookups of past prefix sums.
2. **Difference Array.** "Add to range, read at the end".
3. **2D Prefix Sums.** Same concept as 1D, but with Inclusion-Exclusion principle for area calculations.
4. **Segment Tree.** Difference arrays cannot answer queries *during* the update phase. They only work if you can defer all reads to the end. The presence of interleaved updates and queries mandates a Segment Tree.
:::


---

## Recognition drills: Range Interaction

Hide the right column. Identify the correct Range Interaction pattern (Prefix Sum, Difference Array, Fenwick Tree, Segment Tree + Lazy Propagation, etc.) and justify your answer.

| Problem | Range Pattern & Justification |
|---|---|
| 1. Given an array, find the sum of elements between indices L and R. The array never changes. | **Prefix Sum.** Static array, invertible operation (sum). O(1) query time. |
| 2. Given an array, find the minimum element between indices L and R. The array never changes. | **Sparse Table.** Static array, idempotent operation (min). Prefix sum won't work because minimum is not invertible. Segment Tree works but Sparse Table is strictly faster (O(1) query). |
| 3. Given an array, add X to all elements from L to R. After all updates are done, print the final array. | **Difference Array.** All updates are processed offline before any queries. Difference array handles range updates in O(1) and reconstructs the array in O(N) at the very end. |
| 4. You have a stream of user logins and logouts. At any time, you need to query how many users were active in a specific minute. | **Fenwick Tree.** Dynamic data (stream of events), point updates (+1 login, -1 logout), and we need to query counts (invertible operation). Fenwick is simpler and faster than a Segment tree here. |
| 5. You have an array of toggles (0 or 1). Query: count the number of 1s in range [L, R]. Update: flip all toggles in range [L, R]. | **Segment Tree with Lazy Propagation.** Dynamic data, range queries, AND range updates. Since we are updating ranges on the fly and querying concurrently, we must use a Segment Tree with lazy memos (tracking "pending flips"). |
| 6. Given a string, you can update a single character. Query if the substring from L to R is a palindrome. | **Segment Tree (with Rolling Hash).** Point updates, range queries. Palindrome checking can be done by comparing a forward rolling hash and a backward rolling hash. A Segment Tree can maintain these hashes dynamically. |
| 7. Find the XOR sum of a subarray [L, R]. The array is static. | **Prefix Sum (Prefix XOR).** Static data. XOR is its own inverse (`A ^ A = 0`), so `prefix[R] ^ prefix[L-1]` gives the O(1) answer. |
| 8. Given an array of heights, update a single height, and query the maximum height in range [L, R]. | **Segment Tree.** Dynamic data, point updates. Maximum is not invertible, so Fenwick Tree cannot do range queries here. Segment tree handles point update / range max in O(log N). |

### Score yourself
- **7-8 correct:** You clearly understand the boundaries between these structures based on invertibility, idempotence, static vs dynamic, and point vs range updates
- **4-6 correct:** You might be overusing Segment Trees for things that Prefix Sums or Difference Arrays can do faster
- **0-3 correct:** Review the Precompute chapter (09-15) to understand how the operation type determines the data structure


---

# State & Prefix Checkpoints

## The Mental Model
Using past states (prefixes) to instantly answer questions about the present. This covers your tags: `prefixSum and +1 -1 trick`, `hashing`, and `countWays`.

## Algorithm Derivation
**Brute force:** To find if any subarray sums to K, check all $O(N^2)$ subarrays.
**↓**
**What is being repeated?** The sum of `[i, j]` is just `sum[0, j] - sum[0, i-1]`.
**↓**
**Can we accumulate information so queries become cheap?** Yes. Keep a running prefix sum.
**↓**
**Can we remember it?** Store every seen prefix sum in a HashMap.
**↓**
**Optimized Idea:** If `CurrentPrefix - K` exists in the HashMap, we have found a valid subarray in $O(1)$ lookup time!

## The "+1 / -1 Trick"
When dealing with "equal number of 0s and 1s", change 0s to -1s. The problem magically transforms into "find a subarray with sum = 0".


---

# Local Optima Tracking (Kadane's)

## The Mental Model
The decision to drop negative baggage and start fresh. Covers the `kadanes` tag.

## Algorithm Derivation
**Brute force:** Check all subarrays for the maximum sum. $O(N^2)$.
**↓**
**What is being repeated?** If subarray `[i, j]` is heavily negative, extending it to `j+1` is strictly worse than just starting fresh at `j+1`.
**↓**
**Can we exploit monotonicity?** Yes. A negative prefix sum is "baggage".
**↓**
**Optimized Idea:** Keep a running sum. If `sum < 0`, reset it to `0`. Track the `max_sum` at every step. $O(N)$ time.

## Pattern Coverage
*   **Maximum Subarray Sum**
*   **Maximum Product Subarray:** Same concept, but track *both* min and max because two negatives make a positive.


---

## The Search Space Reduction Family

- **What it is:** Problems where the potential answers form a massive, structured domain, and you can systematically eliminate large portions of that domain without checking them
- **The signal:** "Find the minimum capacity", "Find the maximum distance", "Search in a 2D matrix"
- **The mechanism:** In a random space, finding an answer takes O(N) time (you must check everything). In a structured space (like a sorted array, a binary search tree, or a monotonic boolean function), you can check one point and logically conclude that an entire half of the space is invalid. This drops the search time from O(N) to O(log N)

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Binary Search on Answer** | "Minimise the maximum", "Maximise the minimum" | A boolean function `canAchieve(X)` that flips from `true` to `false` at exactly one threshold |
| **Two Pointers Matrix Search** | "Search in a row/col sorted 2D matrix" | Moving Left decreases the value, moving Down increases the value |

### The meta-pattern

- This is the final and most abstract pattern in Module 2.
- The previous patterns operated on *the input array*. "Binary Search on Answer" operates on *the mathematical domain of all possible answers*.
- It fundamentally changes how you write algorithms: instead of writing a function that directly calculates the answer, you write a "checker" function that says "Yes" or "No", and you guess the answer millions of times in a fraction of a millisecond


---

## Binary Search on Answer

- **What it is:** Guessing the answer, using a checker function to see if the guess is feasible, and using Binary Search to find the optimal guess
- **When to reach for it:** The problem asks to "Minimise the maximum X" or "Maximise the minimum X". (e.g. Koko Eating Bananas, Allocate Pages, Minimum Capacity to Ship Packages)
- **Why it works:** Calculating the exact minimum capacity of a ship to transport packages within D days is mathematically complex. But if I ask you, "Can a ship with capacity C transport them in D days?", you can simulate it easily with a simple O(N) loop. Since the answer domain is monotonic (if capacity 10 works, capacity 11 definitely works), we can binary search the capacity C

### The visual mechanism

- Problem: Koko can eat K bananas per hour. Find the minimum K to eat all piles within H hours.
- Possible values for K: `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
- Feasibility `canEat(K)`: `[F, F, F, F, T, T, T, T, T, T]`
- Our goal is to find the *first* `True`. This is exactly the `lowerBound` algorithm we learned in Chapter 3.

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="Binary Search on Answer. The domain of possible answers maps to a boolean array of False followed by True. Binary search finds the boundary." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .rej { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.1; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>

  <text x="20" y="20" class="lb">Answer Domain (K)</text>
  <text x="75" y="20" class="sm">1</text><text x="105" y="20" class="sm">2</text>
  <text x="135" y="20" class="sm">3</text><text x="165" y="20" class="sm">4</text>
  <text x="195" y="20" class="sm">5</text><text x="225" y="20" class="sm">6</text>
  <text x="255" y="20" class="sm">7</text><text x="285" y="20" class="sm">8</text>

  <text x="20" y="45" class="lb">canEat(K)?</text>
  <rect class="rej" x="65" y="30" width="20" height="20" rx="2" />
  <rect class="rej" x="95" y="30" width="20" height="20" rx="2" />
  <rect class="rej" x="125" y="30" width="20" height="20" rx="2" />
  <rect class="rej" x="155" y="30" width="20" height="20" rx="2" />
  
  <rect class="hi" x="185" y="30" width="20" height="20" rx="2" />
  <rect class="hi" x="215" y="30" width="20" height="20" rx="2" />
  <rect class="hi" x="245" y="30" width="20" height="20" rx="2" />
  <rect class="hi" x="275" y="30" width="20" height="20" rx="2" />

  <text x="75" y="44" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  <text x="105" y="44" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  <text x="135" y="44" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  <text x="165" y="44" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  
  <text x="195" y="44" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>
  <text x="225" y="44" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>
  <text x="255" y="44" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>
  <text x="285" y="44" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>

  <path class="a" d="M 195 65 L 195 55" marker-end="url(#arrow)" />
  <text x="195" y="80" class="lb" text-anchor="middle">Optimal Answer (Minimum Valid K)</text>
</svg>
:::

### The Template

```ts
function solve(arr: number[], limit: number): number {
  let left = 1; // Minimum possible answer
  let right = 1000000000; // Maximum possible answer
  let best = -1;
  
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (isValid(arr, mid, limit)) {
      best = mid;      // This works, record it
      right = mid - 1; // Try to find a smaller one!
    } else {
      left = mid + 1;  // Too small, must increase
    }
  }
  return best;
}

// A greedy O(N) simulation
function isValid(arr: number[], guess: number, limit: number): boolean {
  // simulate using the guess, return true if successful
  return true; 
}
```

### The Complexity

- The range of possible answers is R. Binary searching it takes O(log R).
- For every guess, we run `isValid()`, which usually takes O(N).
- Total time: O(N log R). Since log₂(10⁹) ≈ 30, this is effectively 30 · O(N), which is phenomenally fast.


---

## Meet in the Middle

- Backtracking (DFS) explores every possible combination. If there are $N$ items, generating all subsets takes $O(2^N)$ time
- $O(2^N)$ is perfectly fine if $N \le 20$. A modern CPU can easily do $2^{20} \approx 10^6$ operations
- But what if $N = 40$? $2^{40} \approx 10^{12}$, which will Time Limit Exceed (TLE). You cannot use standard DP because the state space is too sparse or the values are too large. You cannot use standard Backtracking because $O(2^{40})$ is too slow
- When you see $N \approx 40$ and you need to try combinations, you are looking at the **Meet in the Middle** fingerprint

### The Mechanism: Split and Merge

- Instead of searching $N$ items, you split the items into two halves of size $N/2$
- You generate all $2^{N/2}$ combinations for the left half and store them in an array (or hash map)
- You generate all $2^{N/2}$ combinations for the right half
- You then **merge** the two halves to find the answer

### The Math

- Time to generate left half: $O(2^{N/2})$
- Time to generate right half: $O(2^{N/2})$
- Total time before merging: $O(2^{N/2})$
- For $N=40$, $O(2^{20}) + O(2^{20}) \approx 2 \times 10^6$. This is easily within the time limit. You just turned a 1-year computation into a 5-millisecond computation

### The Merger

- Generating the halves is easy. The real algorithmic challenge of Meet in the Middle is the merge step
- **If you need exact matches:** (e.g. "Find a subset that sums to exactly K")
  - Generate left half sums, put them in a Hash Set
  - Generate right half sums. For each sum `S`, check if `K - S` exists in the left Hash Set. Merge time: $O(2^{N/2})$
- **If you need closest matches:** (e.g. "Find a subset sum as close to K as possible without exceeding it")
  - Generate left half sums, sort them
  - Generate right half sums. For each sum `S`, Binary Search the left array for the largest value $\le K - S$. Merge time: $O(2^{N/2} \log 2^{N/2}) = O(N \cdot 2^{N/2})$

```ts
// Skeleton for "Closest Subset Sum <= K" with N=40
function meetInTheMiddle(arr: number[], K: number): number {
  const left = arr.slice(0, arr.length / 2);
  const right = arr.slice(arr.length / 2);
  
  const leftSums = generateAllSubsetSums(left);   // Size 2^20
  const rightSums = generateAllSubsetSums(right); // Size 2^20
  
  leftSums.sort((a, b) => a - b);
  
  let best = 0;
  for (const rSum of rightSums) {
    if (rSum > K) continue;
    // Binary search leftSums for largest value <= K - rSum
    const lSum = binarySearchLargestValid(leftSums, K - rSum);
    best = Math.max(best, lSum + rSum);
  }
  
  return best;
}
```

:::interview
"Why can't I just use Dynamic Programming for a Subset Sum problem with N=40?"

If the target sum K is small (e.g. K = 10,000), you absolutely should use DP, running in O(N × K). But if K is 10^9, DP requires an array of size 10^9, which will memory limit exceed. Meet in the Middle does not depend on K for its complexity; it only depends on N.
:::


---

## Two Pointers Matrix Search

- **What it is:** Searching for a target in a 2D matrix where every row is sorted left-to-right, and every column is sorted top-to-bottom
- **When to reach for it:** "Search a 2D Matrix II"
- **Why it works:** If you start at the top-right corner, you have two choices. Moving left decreases the value. Moving down increases the value. The matrix geometry perfectly mimics a Binary Search Tree

### The visual mechanism

- Target: `16`

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Searching a row and column sorted matrix. Starting top-right, moving left decreases the value, moving down increases it." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { stroke: #ef476e; stroke-width: 1.1; fill: none; }
  </style>

  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
    <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef476e"/>
    </marker>
  </defs>

  <!-- Row 0 -->
  <rect class="bx" x="20" y="20" width="30" height="20" rx="2" />
  <rect class="bx" x="50" y="20" width="30" height="20" rx="2" />
  <rect class="hi" x="80" y="20" width="30" height="20" rx="2" />
  <text x="35" y="34" class="lb" text-anchor="middle">1</text>
  <text x="65" y="34" class="lb" text-anchor="middle">4</text>
  <text x="95" y="34" class="lb" text-anchor="middle">7</text>
  
  <text x="130" y="34" class="sm" fill="#2d6a4f">Start (7 < 16, move DOWN)</text>

  <!-- Row 1 -->
  <rect class="bx" x="20" y="40" width="30" height="20" rx="2" />
  <rect class="bx" x="50" y="40" width="30" height="20" rx="2" />
  <rect class="hi" x="80" y="40" width="30" height="20" rx="2" />
  <text x="35" y="54" class="lb" text-anchor="middle">2</text>
  <text x="65" y="54" class="lb" text-anchor="middle">5</text>
  <text x="95" y="54" class="lb" text-anchor="middle">20</text>

  <text x="130" y="54" class="sm" fill="#2d6a4f">(20 > 16, move LEFT)</text>

  <!-- Row 2 -->
  <rect class="bx" x="20" y="60" width="30" height="20" rx="2" />
  <rect class="hi" x="50" y="60" width="30" height="20" rx="2" />
  <rect class="bx" x="80" y="60" width="30" height="20" rx="2" />
  <text x="35" y="74" class="lb" text-anchor="middle">3</text>
  <text x="65" y="74" class="lb" text-anchor="middle">16</text>
  <text x="95" y="74" class="lb" text-anchor="middle">22</text>
  
  <text x="130" y="74" class="sm" fill="#2d6a4f">Found it!</text>

  <path class="a" d="M 95 40 L 95 45" marker-end="url(#arrow)" />
  <path class="a" d="M 80 50 L 70 50" marker-end="url(#arrow)" />
  <path class="a" d="M 65 60 L 65 65" marker-end="url(#arrow)" />

</svg>
:::

### The Template

```ts
function searchMatrix(matrix: number[][], target: number): boolean {
  if (matrix.length === 0 || matrix[0].length === 0) return false;
  
  let row = 0;
  let col = matrix[0].length - 1; // Top-Right
  
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) return true;
    
    if (matrix[row][col] > target) {
      col--; // Move left to find smaller
    } else {
      row++; // Move down to find larger
    }
  }
  
  return false;
}
```

### The Complexity

- In the worst case, you travel from the top-right to the bottom-left.
- You move exactly R times down and C times left.
- Total time: O(R + C).
- Total space: O(1).
- A naive full matrix search takes O(R · C). The structured search space allows us to eliminate entire rows or columns with a single check.


---

## State Space Pruning and Bitmasks

- When a search space is massive, you cannot visit every state. You must prune branches that are guaranteed to fail
- This page covers the two most important techniques for navigating complex state spaces: identifying dead ends early (Pruning) and representing state efficiently (Bitmasks)

### Pruning: Failing Fast

- In backtracking, the worst thing you can do is explore a path for 15 steps only to realise step 1 made it invalid
- **Feasibility Pruning:** Stop exploring if the current state violates the rules. (e.g. in N-Queens, do not place a queen if the diagonal is already attacked. Don't wait until the board is full to check)
- **Optimality Pruning (Branch and Bound):** If you are trying to find the minimum cost, keep track of the `bestCostSoFar`. If your current partial path already costs more than `bestCostSoFar`, stop. It can never win
- **Symmetry Pruning:** If exploring option A is structurally identical to exploring option B, only explore A. (e.g. if you have 3 identical red balls, it doesn't matter which one you pick first. Enforce an artificial order to prevent duplicate branches)

### Bitmasks: Micro-State

- If your state requires tracking a set of items (e.g. "which cities have I visited?"), you could use an array of booleans or a Hash Set. But in DFS or BFS, passing sets around is incredibly slow (memory allocation, hashing overhead)
- If the number of items is $\le 32$ (or 64), use an integer as a **Bitmask**. Each bit represents a boolean

| Operation | Array / Set | Bitmask Equivalent |
|---|---|---|
| Initialize empty | `visited = new Set()` | `mask = 0` |
| Mark `i` as visited | `visited.add(i)` | `mask \|= (1 << i)` |
| Unmark `i` | `visited.delete(i)` | `mask &= ~(1 << i)` |
| Check if `i` is visited | `visited.has(i)` | `(mask & (1 << i)) !== 0` |
| Are all N visited? | `visited.size === N` | `mask === (1 << N) - 1` |

### Why Bitmasks matter for Search

- **Speed:** Bitwise operations take 1 CPU cycle. Hashing takes hundreds
- **Immutability:** When you recurse `dfs(mask | (1 << i))`, you are passing a value, not a reference. You do not need to "backtrack" (undo the change) after the recursive call returns, because you never mutated the original `mask`
- **Memoization:** If you want to cache the result of `(node, visitedSet)`, caching a Set is impossible. Caching `(node, mask)` is trivial — it's just a 2D array or a single combined integer key

:::interview
"Can you use bitmasks if N = 100?"

Not natively. Bitmasks fit perfectly in 32-bit or 64-bit integers. If N = 100, you would need a BigInt or an array of integers (a BitSet). At that point, the O(1) CPU register benefits are lost, though it remains far more memory-efficient than a Hash Set of booleans.
:::


---

### The wrong approach: Search Space Reduction

- **Naive idea:** For "Minimise the maximum capacity", trying capacities starting from 1, simulating each one, until one works
- **Why it looks right:** It flawlessly finds the absolute minimum valid capacity
- **Why it breaks:** If the required capacity is 10⁹, you will run the O(N) simulation 10⁹ times. It will Time Limit Exceed. By guessing linearly, you treat the structured (monotonic) answer domain as if it were a random space
- **The fix:** Use Binary Search on the answer domain to find the transition point in O(log R) guesses

### Recognition drills

You have 20 seconds per problem. Identify which Search Space pattern applies.

| # | Problem sketch | Your answer |
|---|---|---|
| 1 | Given an array of sorted arrays, find the Kth smallest element overall | |
| 2 | Find the minimum time required to complete all trips given an array of bus travel times | |
| 3 | You have a sorted array that has been rotated. Find the minimum element | |
| 4 | Find the maximum distance you can place M cows in N stalls such that they don't fight | |

:::note
**Answers:** 
1. **Heap for Merge (Module 4).** You can binary search the answer, but a Min-Heap merging K lists is the standard approach here.
2. **Binary Search on Answer.** The domain of "time" is monotonic. If T works, T+1 works.
3. **Binary Search.** The array is partially monotonic. You can still eliminate half the space by comparing `mid` to `right`.
4. **Binary Search on Answer ("Maximise the minimum").** Binary search the distance D. `isValid(D)` is a greedy O(N) check: place a cow in the first stall, then place the next cow in the first stall that is ≥ D away. If you place all M cows, D is valid.
:::


---

## Recognition drills: Search Space

Hide the right column. Identify the correct Search Space technique (Binary Search on Answer, Backtracking, Meet in the Middle, Branch & Bound, Two Pointers Matrix Search) and justify your answer.

| Problem | Search Pattern & Justification |
|---|---|
| 1. Find all combinations of numbers that sum to exactly K. Array size is 20. | **Backtracking.** We need *all* combinations, not just the best one, so optimization boundaries don't help. N=20 means $2^{20}$ operations, which easily runs in time using standard DFS. |
| 2. Given a sorted matrix where every row and column is sorted, find if target exists. | **Two Pointers Matrix Search.** Because the matrix is sorted in two dimensions, we can start at the top-right corner. If the target is smaller, move left. If larger, move down. O(N+M) time. |
| 3. Find the minimum speed K required to eat all bananas within H hours. | **Binary Search on Answer.** The search space for K is `[1, max(pile)]`. The condition "can we eat them in H hours at speed K?" is monotonic (`[F, F, T, T]`). We Binary Search for the boundary. |
| 4. Find if a subset of an array sums to exactly K. Array size is 40. | **Meet in the Middle.** N=40 means Backtracking ($O(2^{40})$) will TLE. Split into two halves of 20. Generate sums for both halves ($O(2^{20})$ each). Store left half in a Hash Set, iterate through right half to find the complement. |
| 5. Find the shortest path through a maze where you can break at most 3 walls. | **State-space BFS.** This is a graph problem, not a backtracking search space. The state is `(r, c, walls_broken)`. Because edge costs are all 1, BFS guarantees the shortest path. |
| 6. Given an array of items with weights and values, find the subset with maximum value that fits in a knapsack of capacity W. N=40. | **Meet in the Middle.** N=40 means DFS will TLE. Split the array. Generate `(weight, value)` pairs for both halves. Sort the left half by weight, removing Pareto-dominated pairs. For each pair in the right half, binary search the left half. |
| 7. Find the shortest path visiting all N cities exactly once (Traveling Salesperson). N=15. | **DFS with Bitmask + Memoization (or DP with Bitmask).** We need to visit all cities, so we must track which ones we've visited. N=15 means the visited state fits in a 16-bit integer mask. Memoize `(currentCity, visitedMask)`. |
| 8. Solve a 9x9 Sudoku puzzle. | **Backtracking with Pruning.** The state space is $9^{81}$, but it's heavily constrained. We prune paths immediately if placing a number violates the row, column, or grid rules. (Bitmasks are often used here to track used numbers). |

### Score yourself
- **7-8 correct:** You can accurately map the constraints (N=20 vs N=40) and the output requirements ("all combinations" vs "minimum speed") to the correct search topology
- **4-6 correct:** You might be trying to use Backtracking for everything, or missing the Meet in the Middle fingerprints
- **0-3 correct:** Review the Feasibility chapter (09-13) and Meet in the Middle (07-03)


---

# Divide, Conquer & Merge

## The Mental Model
Breaking an array down to a single element and building it back up. Covers `merge`, `partition`, and `divideAndConquer`.

## Algorithm Derivation
**Brute force:** Sorting or counting inversions by comparing every pair $O(N^2)$.
**↓**
**Why is it too slow?** We re-evaluate elements that are already sorted relative to each other.
**↓**
**Can we exploit structure?** If two halves are already sorted, merging them takes only $O(N)$.
**↓**
**Optimized Idea:** Split until size 1. Merge sorted halves. While merging, count cross-inversions. $O(N \log N)$.

## Canonical Usages
*   **Merge Sort**
*   **Count Inversions:** `if (left[i] > right[j]) inversions += (mid - i + 1)`
*   **Reverse Pairs**


---

## Repeated State? See Dynamic Programming

- This module focuses on patterns that can be solved by manipulating data structures (stacks, queues, segment trees) or traversing boundaries (binary search, two pointers)
- But what happens when the problem requires you to make a choice, and that choice leads to a state you have already evaluated?

### The DP Boundary

- If you draw the decision tree for a problem and notice that you are solving the **exact same subproblem** multiple times, you have crossed the boundary from Pattern Recognition into Dynamic Programming
- **Example:** "Find the number of ways to climb stairs." 
  - Choice 1: take 1 step. You are now at stair $N-1$
  - Choice 2: take 2 steps. You are now at stair $N-2$
  - If you take a 1-step then a 1-step, you are at $N-2$. You have arrived at the same state via a different path
- When states repeat, you must cache the results to avoid exponential blowup. This is memoization (or tabulation)

### Where to go next

- If your problem involves **repeated overlapping subproblems** or finding the optimal substructure, jump to **Module 06: Dynamic Programming**
- Module 06 breaks DP down not by "Knapsack" vs "LCS", but by the shape of the state transitions (Linear, Interval, Bitmask, Tree)


---

## Connectivity? See Graphs

- Many problems describe relationships between entities rather than sequences of data. "A is friends with B", "Course C requires Course D", "City E is connected to City F"
- These are not array problems. These are graph problems

### The Graph Boundary

- If the problem asks questions about **reachability, connectivity, cycles, or shortest paths through arbitrary relationships**, you have crossed the boundary into Graph Theory
- While we discussed the *Frontier Maintenance* pattern (BFS/Dijkstra) in Chapter 9, that was an abstraction of the search mechanism. Graph theory encompasses much more:
  - Disjoint Set Union (Union-Find) for dynamic connectivity
  - Topological Sorting for dependency resolution
  - Strongly Connected Components
  - Minimum Spanning Trees

### Where to go next

- If your problem is fundamentally about nodes and edges, jump to **Module 05: Graphs**
- Module 05 covers how to model relationships, how to traverse them efficiently, and how to detect structural properties (like cycles or bipartite sets)


---

## Why unnamed patterns matter

- Every technique in Chapters 2–7 has a LeetCode tag. Sliding Window. Binary Search. Segment Tree. You can study them by name
- But there are structural patterns that appear across multiple techniques and have never been given a consistent name. They connect algorithms that look completely different on the surface
- These unnamed patterns are the reason some people can "see" solutions to unfamiliar problems while others cannot. The difference is not intelligence — it is recognising a structure that nobody taught you to look for

### The four unnamed patterns

| Pattern | What it does | Where you have already seen it |
|---|---|---|
| **Frontier Maintenance** | Maintain a boundary between explored and unexplored, advance it systematically | BFS queue, Dijkstra's priority queue, greedy selection |
| **Dominated Candidate Elimination** | Prove a candidate can never become optimal, throw it away permanently | Monotonic stack, convex hull trick, Pareto pruning |
| **Boundary Finding** | Reduce the problem to finding the transition point in a sorted boolean sequence | Binary search, binary search on answer, first/last occurrence |
| **Precompute for Cheap Queries** | Spend time upfront so repeated queries become O(1) | Prefix sum, sparse table, Fenwick tree |

### Why they are not just "categories"

- These are not taxonomic labels. They are **reasoning tools**
- When you are stuck on a problem, asking "Am I maintaining a frontier?" or "Can I prove some candidates are dominated?" will unlock solutions that asking "Is this a Two Pointers problem?" will not
- The named patterns tell you *which technique to use*. The unnamed patterns tell you *why the technique works* — and when to invent a new one

:::interview
"I can solve problems I've seen before, but I freeze on novel problems."

You are pattern-matching on technique names. Try matching on structure instead. Ask: is there a frontier expanding? Are candidates being eliminated? Is the answer a boundary in a boolean sequence? These questions work on problems nobody has tagged yet.
:::


---

## Maintain the Frontier

- **What it is:** A set of candidates (the *frontier*) separates what has been fully processed from what has not. At every step, you pick the best candidate from the frontier, process it, and add its neighbours to the frontier
- **Why nobody named it:** Each algorithm that uses it has its own name — BFS, Dijkstra, A*, best-first search, beam search. Nobody noticed they share the same skeleton

### The skeleton

```
frontier = initial candidates
processed = empty set

while frontier is not empty:
    pick the "best" candidate from frontier     ← selection rule varies
    mark it as processed
    for each neighbour of candidate:
        if neighbour is not processed:
            add neighbour to frontier            ← expansion rule varies
```

- The *selection rule* determines the algorithm's identity:

| Selection rule | Algorithm | Data structure for frontier |
|---|---|---|
| First-in, first-out | BFS | Queue (deque) |
| Smallest distance | Dijkstra | Min-heap (priority queue) |
| Smallest f(n) = g(n) + h(n) | A* | Min-heap |
| Any unvisited neighbour | DFS | Stack (implicit call stack) |
| Top-k by heuristic | Beam Search | Bounded priority queue |

### Why this matters

- When you recognise that a problem is asking you to **expand from a known set into an unknown set**, and you need to find the **best or shortest or cheapest** expansion, you are looking at Frontier Maintenance
- The technique you choose depends on the selection rule the problem demands
- If all edges cost the same → BFS (FIFO frontier)
- If edges have varying costs → Dijkstra (min-heap frontier)
- If you need an approximation fast → Beam Search (bounded frontier)

### The trap

- **Expanding without marking processed.** If you add a node to the frontier but forget to mark it as processed when you pop it, you will visit it multiple times. BFS degrades to exponential. Dijkstra gives wrong answers. The frontier bloats without bound

:::interview
"How does BFS guarantee the shortest path?"

BFS uses a FIFO queue as its frontier. Since all edges cost 1, the first time a node is popped from the queue, it has been reached by the fewest edges possible. Any later path to the same node would be longer. The frontier structure (FIFO) guarantees this ordering.
:::


---

## The Frontier in BFS and Dijkstra

- BFS and Dijkstra look different in textbooks but share identical structure. The only difference is how they select the next candidate from the frontier

### BFS: FIFO frontier

- **Selection rule:** First-in, first-out. The oldest candidate is always processed next
- **Why FIFO works:** If all edges cost 1, the first path to reach a node is the shortest. Earlier arrivals = shorter paths. FIFO preserves arrival order

```ts
function bfs(graph: number[][], start: number): number[] {
  const dist = new Array(graph.length).fill(-1);
  const frontier: number[] = [start];   // queue
  dist[start] = 0;

  let head = 0;
  while (head < frontier.length) {
    const node = frontier[head++];       // FIFO: take from front
    for (const next of graph[node]) {
      if (dist[next] === -1) {
        dist[next] = dist[node] + 1;
        frontier.push(next);             // add to back
      }
    }
  }
  return dist;
}
```

### Dijkstra: Min-Heap frontier

- **Selection rule:** Smallest accumulated distance. The cheapest candidate is always processed next
- **Why min-heap works:** If edges have varying costs, arrival order no longer guarantees shortest path. You need the *cheapest* path to be processed first. A min-heap gives you that in O(log n) per extraction

```ts
function dijkstra(graph: [number, number][][], start: number): number[] {
  const dist = new Array(graph.length).fill(Infinity);
  // Min-heap: [distance, node]
  const frontier: [number, number][] = [[0, start]];
  dist[start] = 0;

  while (frontier.length > 0) {
    const [d, node] = heapPop(frontier);  // smallest distance first
    if (d > dist[node]) continue;         // stale entry — skip

    for (const [next, weight] of graph[node]) {
      const newDist = dist[node] + weight;
      if (newDist < dist[next]) {
        dist[next] = newDist;
        heapPush(frontier, [newDist, next]);
      }
    }
  }
  return dist;
}
```

### The structural parallel

| BFS | Dijkstra |
|---|---|
| `frontier` is a queue | `frontier` is a min-heap |
| Pop from front | Pop the minimum |
| `dist[next] = dist[node] + 1` | `dist[next] = dist[node] + weight` |
| Skip if already visited | Skip if `d > dist[node]` (stale) |
| O(V + E) | O((V + E) log V) |

- **Same skeleton, different frontier.** The unnamed pattern is the skeleton. BFS and Dijkstra are two instantiations of it

### The trap

- **Using BFS on weighted graphs.** BFS finds the path with fewest edges, not the path with lowest cost. If edges have different weights, BFS will confidently return a wrong answer. The constraint fingerprint: "edges have varying costs" → you need a heap frontier (Dijkstra), not a FIFO frontier (BFS)


---

## The Frontier in Greedy and Beam Search

- The frontier pattern extends beyond graph traversal. Greedy algorithms and beam search are also frontier-based — they just have different selection and pruning rules

### Greedy as a frontier algorithm

- In interval scheduling, the "frontier" is the set of intervals that haven't been scheduled yet
- **Selection rule:** Pick the interval with the earliest end time
- **Pruning:** After selecting an interval, discard all overlapping intervals from the frontier. They are permanently eliminated
- The greedy choice is just a frontier selection rule with aggressive pruning

```
frontier = all intervals, sorted by end time

while frontier is not empty:
    pick the interval with the smallest end time
    add it to the schedule
    remove all intervals that overlap with the selected one
```

- This is the same skeleton: frontier → select best → expand/prune → repeat

### Beam Search: bounded frontier

- A* maintains a frontier of all reachable states. On large state spaces, this frontier explodes
- **Beam Search** caps the frontier at size B (the "beam width"). At each step, it keeps only the B most promising candidates and throws the rest away
- **Selection rule:** Smallest heuristic cost (like A*)
- **Pruning:** After expansion, truncate the frontier to B entries

| Method | Frontier size | Guarantee |
|---|---|---|
| BFS | Unbounded | Shortest path (unit cost) |
| Dijkstra | Unbounded | Shortest path (weighted) |
| A* | Unbounded | Shortest path (with admissible heuristic) |
| Beam Search | Bounded by B | No guarantee — approximate |

- Beam Search trades optimality for speed. It is widely used in NLP (machine translation, speech recognition) where the state space is too large for exact search

### Multi-Source BFS

- Sometimes the frontier starts with multiple nodes instead of one
- **Example:** "Find the shortest distance from any rotten orange to each fresh orange." Initialize the frontier with *all* rotten oranges simultaneously
- This is the same BFS skeleton. The only difference is the initialisation step: instead of `frontier = [start]`, it's `frontier = [all sources]`
- The distances computed are the shortest distance from the *nearest* source to each node

### The unifying insight

- Every algorithm in this section follows the same loop: maintain a set of candidates, select the best, expand, repeat
- The variation is in three choices:
  1. **What data structure holds the frontier** (queue, heap, bounded heap, sorted list)
  2. **How you select the next candidate** (FIFO, min-cost, heuristic, earliest deadline)
  3. **How aggressively you prune** (never, overlapping intervals, beam width)

:::interview
"When would you use Beam Search instead of A*?"

When the state space is too large to explore exactly. Beam Search caps the frontier at a fixed width B, so memory stays constant. The tradeoff is that it might miss the optimal solution. Use it when a good-enough answer fast is better than the perfect answer never.
:::


---

## Frontier worked problems

### Problem 1: Word Ladder (BFS frontier)

- **Problem:** Given two words and a dictionary, find the shortest transformation sequence from `beginWord` to `endWord`, changing one letter at a time. Each intermediate word must exist in the dictionary
- **Why it is a frontier problem:** Each word is a node. Two words that differ by one letter are connected by an edge. All edges cost 1. This is BFS on an implicit graph

**Derivation:**
1. **Brute force:** Try all possible sequences recursively. Exponential
2. **What's repeated?** We visit the same word from different paths. The first visit is always the shortest (unit-cost edges)
3. **Frontier pattern:** Use BFS. The frontier is a queue of words at the current distance. Each expansion generates all 1-letter variants. Mark visited to avoid reprocessing

```ts
function ladderLength(begin: string, end: string, dict: Set<string>): number {
  const frontier: string[] = [begin];
  const visited = new Set<string>([begin]);
  let depth = 1;

  while (frontier.length > 0) {
    const nextLevel: string[] = [];
    for (const word of frontier) {
      for (let i = 0; i < word.length; i++) {
        for (let c = 97; c <= 122; c++) {        // 'a' to 'z'
          const next = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
          if (next === end) return depth + 1;
          if (dict.has(next) && !visited.has(next)) {
            visited.add(next);
            nextLevel.push(next);
          }
        }
      }
    }
    frontier.length = 0;
    frontier.push(...nextLevel);
    depth++;
  }
  return 0;
}
```

- **Complexity:** O(N × M × 26) where N = dictionary size, M = word length

### Problem 2: Network Delay Time (Dijkstra frontier)

- **Problem:** Given a directed weighted graph, find the time it takes for a signal to reach all nodes from a source node
- **Why it is a frontier problem:** Weighted edges → FIFO won't work → need min-heap frontier (Dijkstra)

**Derivation:**
1. **Brute force:** Try all paths from source. Exponential on dense graphs
2. **Frontier pattern:** Use Dijkstra. Frontier is a min-heap of (time, node). Pop the cheapest. If already processed at a better time, skip. Otherwise expand neighbours

- **Answer:** The maximum value in the distance array after Dijkstra completes. If any node is unreachable (distance = ∞), return -1

### Problem 3: Cheapest Flights Within K Stops (modified frontier)

- **Problem:** Find the cheapest flight from source to destination with at most K stops
- **Why it is a frontier problem with a twist:** Standard Dijkstra won't work because we need to track stops as part of the state. The frontier becomes `(cost, node, stopsUsed)`
- **The insight:** The state is not just `node` — it is `(node, stopsUsed)`. A node can be visited multiple times if it was reached with a different number of stops
- **Alternative:** BFS-style relaxation for K rounds (Bellman-Ford limited to K iterations)

### The pattern across all three

- Problem 1: Frontier = queue (unit cost), state = word
- Problem 2: Frontier = min-heap (variable cost), state = node
- Problem 3: Frontier = min-heap (variable cost), state = (node, stops)
- Same skeleton. Different frontier. Different state. The unnamed pattern is the glue

:::interview
"How would you approach Word Ladder?"

This is BFS on an implicit graph. Each word is a node. Words differing by one letter are connected. Since all edges cost 1, BFS guarantees the shortest transformation sequence. The frontier is a queue of words at the current depth level.
:::


---

## Dominated Candidate Elimination

- **What it is:** Proving that a candidate can *never* become optimal, and permanently discarding it. The remaining candidates form a compressed set that is faster to search
- **Why nobody named it:** Monotonic stacks "maintain order." Convex hull trick "optimises DP transitions." Skyline problems "track buildings." Nobody noticed they all do the same thing: throw away candidates that are dominated by a better one

### The core idea

- A candidate X is **dominated** by candidate Y if Y is at least as good as X in *every* dimension that matters. If Y exists, X can never win — not now, not in the future
- When you can prove domination, you can safely discard X. The set of remaining candidates (the *anti-chain*) is often dramatically smaller

### The abstract mechanism

```
candidates = initial set

for each new candidate:
    while the worst existing candidate is dominated by the new one:
        discard the dominated candidate
    add the new candidate
```

- This looks exactly like the monotonic stack's push/pop loop. That's not a coincidence. The monotonic stack *is* dominated candidate elimination applied to "next greater element" problems

### Where it appears

| Algorithm | What's being eliminated | Why it's dominated |
|---|---|---|
| **Monotonic Stack** | Elements that found their "next greater" | A larger element to the right makes them irrelevant |
| **Convex Hull Trick** | Linear functions that can never be minimum | A new line makes older lines permanently suboptimal |
| **Pareto Pruning / Skyline** | Points dominated in both x and y dimensions | A point better in both dimensions makes them useless |
| **Deque optimisation (Li Chao)** | DP candidates outside the relevant range | Monotonicity ensures they cannot re-enter the window |

### The key invariant

- After elimination, the surviving candidates form a structure with a useful property:
  - In monotonic stack: a strictly decreasing (or increasing) sequence
  - In convex hull: a convex envelope
  - In skyline: a Pareto-optimal front
- This compressed structure allows O(1) or O(log n) lookups instead of O(n) scans

:::interview
"Why does the monotonic stack work in O(n)?"

Each element is pushed once and popped at most once. The popping isn't wasted work — it's proving that the popped element is permanently dominated by the incoming element. Once dominated, it can never be the answer for any future query. That's why we discard it.
:::


---

## Monotonic Stack as Elimination

- The monotonic stack is the most common instantiation of dominated candidate elimination. This page shows why the stack operations are *proofs of domination*, not just mechanical steps

### The "Next Greater Element" through elimination lens

- **Problem:** For each element in the array, find the next element to the right that is strictly greater
- **Traditional explanation:** "Maintain a decreasing stack. When a larger element arrives, pop smaller elements."
- **Elimination explanation:** Every element on the stack is *waiting* for its answer. When element X arrives and is greater than the top of the stack, X proves that the top is **dominated** — its answer has been found, and it will never be needed again. Discard it permanently

### The derivation

1. **Brute force:** For each element, scan right until you find something larger. O(n²)
2. **What's repeated?** Elements that haven't found their answer yet are being re-checked on every scan
3. **The insight:** Once element A finds its next greater element B, A is permanently resolved. It never needs to be checked again. We can track "unresolved" elements in a stack and resolve them as larger elements arrive

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Monotonic stack as elimination. When 5 arrives, it proves 1 and 2 are dominated (their answer is 5). They are permanently discarded." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .dead { fill: #f0f0f0; stroke: #c0c0c0; stroke-width: 0.8; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>

  <text x="10" y="14" class="sm">Array: [4, 2, 1, 5, 3]</text>

  <!-- Stack state before 5 arrives -->
  <text x="10" y="36" class="lb">Stack before 5:</text>
  <rect class="bx" x="140" y="24" width="25" height="18" rx="2"/>
  <text x="152" y="37" class="lb" text-anchor="middle">4</text>
  <rect class="bx" x="170" y="24" width="25" height="18" rx="2"/>
  <text x="182" y="37" class="lb" text-anchor="middle">2</text>
  <rect class="bx" x="200" y="24" width="25" height="18" rx="2"/>
  <text x="212" y="37" class="lb" text-anchor="middle">1</text>
  <text x="240" y="37" class="sm">← top (all waiting for answer)</text>

  <!-- 5 arrives and dominates -->
  <text x="10" y="62" class="lb">5 arrives:</text>
  <rect class="dead" x="170" y="50" width="25" height="18" rx="2"/>
  <text x="182" y="63" class="lb" text-anchor="middle" fill="#c0c0c0">2</text>
  <rect class="dead" x="200" y="50" width="25" height="18" rx="2"/>
  <text x="212" y="63" class="lb" text-anchor="middle" fill="#c0c0c0">1</text>
  <text x="240" y="63" class="sm" fill="#ef476e">← dominated by 5 (popped, answer = 5)</text>

  <!-- Stack after -->
  <text x="10" y="88" class="lb">Stack after 5:</text>
  <rect class="bx" x="140" y="76" width="25" height="18" rx="2"/>
  <text x="152" y="89" class="lb" text-anchor="middle">4</text>
  <rect class="hi" x="170" y="76" width="25" height="18" rx="2"/>
  <text x="182" y="89" class="lb" text-anchor="middle">5</text>
  <text x="210" y="89" class="sm">← 4 survives (5 > 4, so pop 4 too? Yes! 4's answer = 5)</text>
</svg>
:::

### Why this framing matters

- The traditional explanation tells you *what* to do (push, pop). The elimination framing tells you *why* it works (popped elements are proven dominated)
- When you face a novel problem — "find the next element with property X" — the elimination framing tells you: maintain a set of unresolved candidates; when a new element proves an existing candidate is dominated, resolve and discard it. You can derive the algorithm from this principle even if you have never seen "monotonic stack" before

### Variations

| Variation | Surviving structure | What's dominated |
|---|---|---|
| Decreasing stack (next greater) | Decreasing sequence | Smaller elements to the left of a larger arrival |
| Increasing stack (next smaller) | Increasing sequence | Larger elements to the left of a smaller arrival |
| Bidirectional (largest rectangle) | Run two passes | Elements dominated from both left and right |


---

## Convex Hull Trick as Elimination

- The **Convex Hull Trick (CHT)** is an advanced DP optimisation that reduces O(n²) time to O(n) or O(n log n)
- It sounds terrifying. Textbooks describe it with geometry ("lower envelope of a set of lines"). But structurally, it is just Dominated Candidate Elimination applied to linear functions

### The DP Bottleneck

- **Problem:** You have a DP transition that looks like: `dp[i] = min(dp[j] + m[j] * x[i] + c[j])` for all `j < i`
- At step `i`, you have to check all previous `j` to find the minimum. That's a bottleneck
- **The insight:** Each `j` represents a line `y = m*x + c`. You are asking: "At x-coordinate `x[i]`, which of the previous lines gives the lowest y-value?"

### The Elimination

- If you draw the lines, some lines are **never** the lowest at any x-coordinate, or they are only lowest for a range of x-coordinates you have already passed
- If a line can *never* be the minimum again, it is a **dominated candidate**. We should throw it away
- To find if a new line `L3` dominates an existing line `L2`, we check the intersections:
  - If `L3` intersects `L1` *before* `L2` intersects `L1`, then `L2` is completely swallowed by `L1` and `L3`. `L2` is dominated

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Convex Hull Trick. Three lines intersect. Line 2 is always above the lower envelope formed by Line 1 and Line 3. Line 2 is dominated and eliminated." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .a { stroke: #1a1a1a; stroke-width: 1.2; fill: none; }
    .hot { stroke: #ef476e; stroke-width: 1.2; fill: none; }
    .hi { stroke: #2d6a4f; stroke-width: 1.8; fill: none; }
  </style>

  <!-- Axes -->
  <path class="a" d="M 20 120 L 250 120" />
  <path class="a" d="M 20 120 L 20 10" />

  <!-- Line 1: shallow -->
  <path class="a" d="M 20 100 L 250 40" />
  <text x="255" y="45" class="lb">L1</text>

  <!-- Line 2: medium (dominated) -->
  <path class="hot" d="M 40 120 L 180 10" stroke-dasharray="2 2" />
  <text x="185" y="15" class="lb" fill="#ef476e">L2 (dominated)</text>

  <!-- Line 3: steep -->
  <path class="a" d="M 120 120 L 210 10" />
  <text x="215" y="15" class="lb">L3</text>

  <!-- Lower Envelope (Highlight) -->
  <path class="hi" d="M 20 100 L 155 65 L 210 10" />
  
  <text x="270" y="50" class="lb">The Elimination:</text>
  <text x="270" y="65" class="sm">- We only care about the green envelope</text>
  <text x="270" y="77" class="sm">- L2 is never the lowest line at any x</text>
  <text x="270" y="89" class="sm">- L3 arrives and proves L2 is useless</text>
  <text x="270" y="101" class="sm">- Pop L2 from the monotonic queue</text>
</svg>
:::

### The structural parallel

| Concept | Monotonic Stack | Convex Hull Trick |
|---|---|---|
| Candidate | Array element (value) | Linear function (slope, intercept) |
| Container | Stack (1D) | Deque (2D geometry) |
| Domination condition | `arr[i] > arr[top]` | `intersection(L3, L1) < intersection(L2, L1)` |
| Processing cost | O(1) amortised | O(1) amortised |

- Notice how this is literally the monotonic stack algorithm, just with a more complex `while` loop condition
- You maintain a deque of active candidates. When a new candidate arrives, you `while` loop to pop dominated candidates from the back, then push the new candidate
- The "scary" geometry is just the domination check. The algorithmic skeleton is identical

:::interview
"How would you optimize this O(n²) DP?"

The inner loop searches for the minimum value of a linear function `mx + c`. We can optimize this by maintaining a set of lines. As we add new lines, we check if they render any previous lines strictly suboptimal (they never form the lower envelope). We pop those dominated lines. We can then binary search the remaining lines, reducing O(n²) to O(n log n).
:::


---

## Pareto Pruning and Skylines

- When candidates have multiple dimensions, domination becomes a 2D or 3D problem. This is where Pareto pruning comes in

### The Pareto Principle in algorithms

- A candidate point `(x1, y1)` **strictly dominates** `(x2, y2)` if it is better in *both* dimensions. For example, if you want high speed and low memory, a candidate that is both faster and uses less memory dominates a slower, memory-heavy candidate
- The set of candidates that are not dominated by any other candidate is called the **Pareto frontier** (or Skyline)
- **The elimination rule:** If a candidate is not on the Pareto frontier, throw it away. It can never be the optimal choice for any combined weighting of the dimensions

### The Skyline Problem

- **Problem:** Given a set of overlapping rectangular buildings, output the outline (skyline) of the city
- A building is defined by `[left, right, height]`. The bottleneck is that many buildings are completely hidden behind taller buildings
- **The insight:** A building `B` is dominated if there is another building `A` such that `A` is taller AND covers the entire width of `B`
- But the skyline isn't just about throwing away whole buildings; it's about finding the highest active point at any x-coordinate

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="Pareto pruning. Three points on a graph. Point B is worse than Point A in both X and Y dimensions, so it is strictly dominated and eliminated. Only A and C survive." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .a { stroke: #1a1a1a; stroke-width: 1.2; fill: none; }
    .hot { fill: #ef476e; }
    .hi { fill: #2d6a4f; }
    .zone { fill: #f0f0f0; }
  </style>

  <!-- Axes (Maximising both) -->
  <path class="a" d="M 20 100 L 220 100" marker-end="url(#arrow)" />
  <path class="a" d="M 20 100 L 20 10" marker-end="url(#arrow)" />
  <text x="225" y="105" class="sm">Speed (higher = better)</text>
  <text x="5" y="8" class="sm">Memory (higher = better)</text>

  <!-- Domination zone from A -->
  <rect class="zone" x="20" y="40" width="80" height="60" />
  <text x="50" y="80" class="sm" fill="#6b6b6b">Dominated Zone</text>

  <!-- Points -->
  <circle cx="100" cy="40" r="4" class="hi" />
  <text x="110" y="37" class="lb">A (Fast, High Mem)</text>

  <circle cx="60" cy="70" r="4" class="hot" />
  <text x="70" y="67" class="lb" fill="#ef476e">B (Slow, Low Mem)</text>

  <circle cx="160" cy="80" r="4" class="hi" />
  <text x="170" y="77" class="lb">C (Very Fast, Low Mem)</text>

  <path class="a" stroke-dasharray="2 2" d="M 100 40 L 100 100" />
  <path class="a" stroke-dasharray="2 2" d="M 20 40 L 100 40" />

  <text x="250" y="30" class="lb">The Elimination:</text>
  <text x="250" y="45" class="sm">- A is better than B at Speed (100 > 60)</text>
  <text x="250" y="57" class="sm">- A is better than B at Memory (y: 40 > 70)</text>
  <text x="250" y="69" class="sm">- B is strictly dominated. Eliminate B.</text>
  <text x="250" y="81" class="sm">- C is faster than A, but A has more Memory.</text>
  <text x="250" y="93" class="sm">- Neither dominates. Both survive.</text>
</svg>
:::

### The structural parallel

- Whether you are sorting items by weight/value (Knapsack bounding) or tracking the maximum height in a sweep-line (Skyline), the core action is the same:
- **Discard the strictly inferior.** Do not let it enter your data structure. Do not evaluate it in your DP
- The data structure used to maintain the Pareto frontier is usually a **binary search tree (e.g. `std::set` in C++, `TreeMap` in Java)**, which allows you to quickly query "is there any point up and to the right of me?"

### The trap

- **Checking all pairs.** To eliminate dominated candidates, beginners often check every new candidate against *every* existing candidate, creating an O(n²) bottleneck. By sorting the data first (e.g., by the X dimension), you only need to check the Y dimension against the *current best* Y dimension seen so far. Sorting turns 2D elimination into 1D monotonic tracking


---

## Elimination worked problems

### Problem 1: Daily Temperatures (1D elimination)

- **Problem:** Given an array of daily temperatures, return an array with the number of days you have to wait for a warmer temperature
- **Why it is an elimination problem:** You are looking for the "next greater element". A temperature of 75 permanently dominates a previous temperature of 70, because 75 answers 70's question. 70 is no longer unresolved

**Derivation:**
1. **Brute force:** For each day, scan forward until you find a warmer day. O(n²)
2. **What's repeated?** You are scanning past unresolved cool days multiple times
3. **Elimination pattern:** Maintain a stack of unresolved days (indices). When a new temperature arrives, if it is warmer than the stack top, it proves the top is dominated. Pop the top, calculate the distance (current day - popped day), and repeat

```ts
function dailyTemperatures(temps: number[]): number[] {
  const answer = new Array(temps.length).fill(0);
  const unresolved: number[] = []; // Stack of indices

  for (let i = 0; i < temps.length; i++) {
    // Current temp dominates the top of the stack?
    while (unresolved.length > 0 && temps[i] > temps[unresolved[unresolved.length - 1]]) {
      const dom = unresolved.pop()!;
      answer[dom] = i - dom;       // Distance to the warmer day
    }
    unresolved.push(i);
  }
  return answer;
}
```

### Problem 2: Sliding Window Maximum (Deque elimination)

- **Problem:** Given an array and a window size k, return the maximum element in every window of size k
- **Why it is an elimination problem:** This looks like Locality (sliding window), but tracking the max inside a window is a bottleneck. If the window contains `[3, 1, 5]`, the `1` is permanently dominated by the `5`. `1` can never be the maximum in any window that contains `5`. We should eliminate it

**Derivation:**
1. **Brute force:** For every window, scan k elements to find the max. O(n × k)
2. **Elimination pattern:** Maintain a monotonic deque of candidate indices. When a new element arrives, pop all smaller elements from the back (they are dominated). Also, pop any elements from the front that have fallen out of the window bounds. The front of the deque is always the window's maximum

```ts
function maxSlidingWindow(nums: number[], k: number): number[] {
  const result: number[] = [];
  const candidates: number[] = []; // Deque of indices

  for (let i = 0; i < nums.length; i++) {
    // Remove elements outside the window (expired)
    if (candidates.length > 0 && candidates[0] === i - k) {
      candidates.shift(); 
    }
    // Remove dominated elements (smaller than incoming)
    while (candidates.length > 0 && nums[candidates[candidates.length - 1]] < nums[i]) {
      candidates.pop();
    }
    
    candidates.push(i);
    
    // Once the window reaches size k, record the answer
    if (i >= k - 1) {
      result.push(nums[candidates[0]]);
    }
  }
  return result;
}
```

- **Notice the skeleton:** Expire stale candidates → Eliminate dominated candidates → Add new candidate. This exact skeleton is used in the Convex Hull Trick to manage lines

### The pattern across both

- Both problems use a data structure (Stack or Deque) to hold a compressed set of candidates
- Both problems contain a `while` loop that tests the newest candidate against existing ones, popping those proven inferior
- Both algorithms are O(n), because every element is pushed exactly once and eliminated at most once

:::interview
"Can you solve Sliding Window Maximum in O(N)?"

Yes. I use a monotonic deque to track potential maximums. When a new element arrives, any smaller elements in the window can never be the maximum again because the new element is both larger and will stay in the window longer. I eliminate them. The front of the deque always holds the current maximum.
:::


---

## Boundary Finding

- **What it is:** Transforming a problem that asks "find a value" into a problem that asks "find the point where a boolean condition flips from False to True" (or True to False)
- **Why nobody named it:** Textbooks call it "Binary Search." But Binary Search is just an array traversal technique. The real intellectual leap is the *transformation* of the problem into a boolean boundary

### The abstract mechanism

- You want to find an answer $x$
- You define a function `isPossible(x)` that returns a boolean
- You prove that `isPossible(x)` is monotonic. For example, if $x$ is too small it's False, and as $x$ grows it eventually becomes True and *stays* True
- The search space maps to: `[F, F, F, F, T, T, T]`
- The problem is now entirely solved by finding the boundary between `F` and `T`

### Where it appears

| Problem Type | The "F to T" transition |
|---|---|
| **Binary Search on Answer** | "Can I carry this much weight?" F → T |
| **First occurrence in sorted array** | "Is this element ≥ target?" F → T |
| **K-th smallest in matrix** | "Are there ≥ k elements smaller than x?" F → T |
| **Longest valid substring** | "Is it possible to have a valid substring of length L?" T → F |

### Why this is a pattern, not a technique

- You can find the boundary using Binary Search (O(log N))
- You can find the boundary using Two Pointers (O(N)) if both the array and the condition move monotonically
- You can find the boundary using a Sweep Line (O(N log N))
- The pattern is **the boundary**, not the search algorithm

### The meta-skill: Inventing the condition

- The hardest part of these problems is never the binary search template. It is defining the `isPossible(x)` function
- **If the problem asks for a minimum:** Define `isPossible(x)` as "Can we achieve the goal with capacity x?" The pattern is `[F, F, T, T, T]`. You want the first T
- **If the problem asks for a maximum:** Define `isPossible(x)` as "Can we achieve the goal with size x?" The pattern is `[T, T, T, F, F]`. You want the last T

:::interview
"I don't know how to optimize this min-max problem."

Min-max and max-min problems are almost always boundary problems in disguise. Instead of asking "What is the maximum minimum?", ask: "Can I guarantee a minimum of X?" If yes, try X+1. If no, try X-1. You have transformed an optimization problem into a boolean boundary.
:::


---

## Binary Search as Boundary Finding

- Binary Search is often taught as "look in the middle, if it's too big, look left, else look right." This is mechanically true but conceptually weak
- The stronger mental model is: **Binary Search finds the boundary between two states in a monotonic sequence**

### The two fundamental templates

Every binary search problem reduces to one of two shapes. 

#### Shape 1: Find the first True in `[F, F, F, T, T, T]`
- **Condition:** `isPossible(x)` flips from False to True
- **Goal:** Find the first True (the minimum value that satisfies the condition)
- **Action on True:** The current `mid` works, but there might be a smaller one. Search left, keeping `mid` as a candidate
- **Action on False:** The current `mid` fails. The answer must be strictly greater. Search right

```ts
function findFirstTrue(low: number, high: number): number {
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (isPossible(mid)) {
      high = mid;      // mid is a candidate, search left
    } else {
      low = mid + 1;   // mid failed, search right
    }
  }
  return low;          // low === high points to the boundary
}
```

#### Shape 2: Find the last True in `[T, T, T, F, F, F]`
- **Condition:** `isPossible(x)` flips from True to False
- **Goal:** Find the last True (the maximum value that satisfies the condition)
- **Action on True:** The current `mid` works, but there might be a larger one. Search right, keeping `mid` as a candidate
- **Action on False:** The current `mid` fails. The answer must be strictly smaller. Search left
- **The Trap:** When keeping `mid` on the right side (`low = mid`), you must bias the midpoint calculation up (`mid = low + (high - low + 1) / 2`), or you will infinite loop when `low + 1 == high`

```ts
function findLastTrue(low: number, high: number): number {
  while (low < high) {
    // Bias mid UP to avoid infinite loop when high - low == 1
    const mid = low + Math.floor((high - low + 1) / 2);
    if (isPossible(mid)) {
      low = mid;       // mid is a candidate, search right
    } else {
      high = mid - 1;  // mid failed, search left
    }
  }
  return low;
}
```

### Why this framing prevents off-by-one errors

- When you memorize `<` vs `<=`, `mid - 1` vs `mid + 1`, you will make mistakes under pressure
- When you think in boundaries, the logic writes itself:
  - Did this `mid` evaluate to True? Yes. Do I want a True? Yes. Then `mid` is a valid candidate. I cannot throw it away (`high = mid` or `low = mid`)
  - Did this `mid` evaluate to False? Yes. Is False the answer? No. Then I can throw it away safely (`low = mid + 1` or `high = mid - 1`)

:::interview
"Why did your binary search infinite loop?"

Because I used the standard floor midpoint calculation `(low + high) / 2` while trying to find the last True (`low = mid`). When `low` and `high` are adjacent, `mid` rounds down to `low`. Since it evaluated to True, I set `low = mid`, meaning nothing changed. To fix it, I must bias the midpoint up: `(low + high + 1) / 2`.
:::


---

## Feasibility and Capacity

- The most powerful application of Boundary Finding is converting a "Find the optimal value" problem into a "Can we do it with this value?" problem
- This is known as **Binary Search on Answer** or **Feasibility Search**

### The Feasibility Signature

You should immediately think of Feasibility Search if a problem asks:
1. **Minimise the maximum** (e.g., "split array into K parts to minimise the largest sum")
2. **Maximise the minimum** (e.g., "place K items such that the minimum distance between them is maximised")
3. **Find the smallest capacity that works** (e.g., "minimum ship capacity to transport cargo in D days")

### The structural transformation

- **The original problem:** "What is the minimum ship capacity to deliver all packages in D days?" This is hard because the capacity could be anything, and the greedy packing strategy depends on the capacity
- **The transformed problem:** "If the ship capacity is exactly $C$, can we deliver all packages in D days?" This is trivially easy. You just iterate through the packages, packing the ship until it's full, sending it, and counting how many days it took
- **The boundary:** If capacity $C$ takes $\le D$ days, then $C+1, C+2$ will also take $\le D$ days. It's monotonic: `[F, F, F, T, T, T]`. We just binary search for the first $C$ that returns True

### The `isPossible(x)` contract

For this to work, `isPossible(x)` must run relatively fast (usually O(N)) and must be strictly monotonic.

```ts
// The generic Feasibility skeleton
function optimalCapacity(packages: number[], days: number): number {
  let low = Math.max(...packages); // Min capacity is the largest single item
  let high = packages.reduce((a, b) => a + b, 0); // Max capacity is all items at once

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (isPossible(packages, days, mid)) {
      high = mid;    // mid works, try to find a smaller capacity
    } else {
      low = mid + 1; // mid failed, need more capacity
    }
  }
  return low;
}
```

### The trap

- **Choosing the wrong search space bounds.** 
- If `low` is too small (e.g., `low = 0` when the minimum capacity must be at least the largest package), `isPossible` might infinite loop or throw errors because it can never pack that item
- If `high` is too small, the true answer lies outside your boundary and binary search will return a false boundary
- Always take a minute to define the literal worst-case and best-case bounds for your search space

:::interview
"How did you know to binary search here? The array isn't sorted."

The array isn't sorted, but the *answer space* is. If a ship of capacity 10 works, a ship of capacity 11 must also work. That monotonicity `[F, F, T, T, T]` means I can binary search the capacity itself, reducing a complex optimization problem to a series of O(n) feasibility checks.
:::


---

## Boundary worked problems

### Problem 1: Koko Eating Bananas (Minimise the Maximum)

- **Problem:** Koko loves to eat bananas. There are N piles of bananas. She can eat K bananas per hour. Find the minimum integer K such that she can eat all the bananas within H hours
- **Why it is a boundary problem:** Minimise the capacity K. If she can eat them all at speed 5, she can definitely eat them at speed 6. The sequence is `[F, F, T, T, T]`. We want the first T

**Derivation:**
1. **Search Space:** `low = 1` (minimum possible eating speed), `high = max(piles)` (eating the largest pile in 1 hour)
2. **Condition:** `isPossible(K)` — for each pile, the hours taken is `Math.ceil(pile / K)`. Sum these up. If sum $\le$ H, return True
3. **Boundary template:** First True

```ts
function minEatingSpeed(piles: number[], h: number): number {
  let low = 1;
  let high = Math.max(...piles);

  const isPossible = (k: number) => {
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / k);
    }
    return hours <= h;
  };

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (isPossible(mid)) {
      high = mid;    // mid works, try to go slower
    } else {
      low = mid + 1; // mid failed, must go faster
    }
  }
  return low;
}
```

### Problem 2: Aggressive Cows (Maximise the Minimum)

- **Problem:** Place C cows in N stalls such that the minimum distance between any two of them is as large as possible
- **Why it is a boundary problem:** Maximise the minimum distance. If you can place them with a distance of 4 between them, you can definitely place them with a distance of 3. The sequence is `[T, T, T, F, F]`. We want the last T

**Derivation:**
1. **Search Space:** `low = 1`, `high = stalls[N-1] - stalls[0]` (max possible distance)
2. **Condition:** `isPossible(dist)` — place the first cow in the first stall. Then iterate. Only place the next cow if the current stall is $\ge$ previous cow's stall + dist. If we place all C cows, return True
3. **Boundary template:** Last True (requires biasing mid UP)

```ts
function maxDistance(stalls: number[], cows: number): number {
  stalls.sort((a, b) => a - b);
  let low = 1;
  let high = stalls[stalls.length - 1] - stalls[0];

  const isPossible = (dist: number) => {
    let count = 1;
    let lastPlaced = stalls[0];
    for (let i = 1; i < stalls.length; i++) {
      if (stalls[i] - lastPlaced >= dist) {
        count++;
        lastPlaced = stalls[i];
      }
    }
    return count >= cows;
  };

  while (low < high) {
    const mid = low + Math.floor((high - low + 1) / 2); // Bias UP!
    if (isPossible(mid)) {
      low = mid;      // mid works, try to push distance higher
    } else {
      high = mid - 1; // mid failed, distance is too large
    }
  }
  return low;
}
```

### The pattern across both

- Neither problem involves searching for an element in an array
- Both problems construct a monotonic boolean function
- Both rely entirely on transforming an optimization request into a yes/no question
- If it's a "Minimise" problem → First True template. If it's a "Maximise" problem → Last True template (bias up)


---

## Precompute for Cheap Queries

- **What it is:** Doing expensive work upfront to generate a queryable data structure, so that later, repeated questions can be answered in O(1) or O(log N) time
- **Why nobody named it:** Textbooks separate Prefix Sums (arrays), Sparse Tables (RMQ), and Segment Trees (trees) into different chapters based on their data structures. But conceptually, they are identical: they are all Precompute patterns

### The trade-off spectrum

- When a problem asks you to answer $Q$ queries over an array of size $N$, you have two trivial options:
  1. **Do nothing upfront.** Store the array. For each query, scan the array. Upfront cost: O(1). Query cost: O(N). Total: O(Q × N)
  2. **Precompute everything.** Generate the answer for every possible query combination and store it in a matrix. Upfront cost: O(N²). Query cost: O(1). Total: O(N² + Q)

- Both trivial options fail when $N = 10^5$ and $Q = 10^5$. 
- The Precompute pattern exists in the middle ground: spend O(N) or O(N log N) time upfront to build a structure that allows O(1) or O(log N) queries

### The constraint fingerprint

You should immediately look for a Precompute pattern when:
1. The input data is **static** (it does not change between queries), OR updates are rare compared to queries
2. The number of queries $Q$ is large (e.g. $10^4$ or $10^5$)
3. A naive scan for each query would TLE (Time Limit Exceeded)

### The Precompute Structures

| Technique | Upfront Time | Query Time | Supports Updates? | What it queries |
|---|---|---|---|---|
| **Prefix Sum** | O(N) | O(1) | No | Sums, counts, XORs (invertible operations) |
| **Sparse Table** | O(N log N) | O(1) | No | Min, max, GCD (idempotent operations) |
| **Fenwick Tree** | O(N log N) | O(log N) | Yes (Point) | Invertible operations |
| **Segment Tree** | O(N) | O(log N) | Yes (Range) | Any associative operation |

- The data structure you choose depends entirely on two questions: 
  1. What math operation are you querying? (Is it invertible? Is it idempotent?)
  2. Does the data change? (Do you need updates?)

:::interview
"Why did you choose a Prefix Sum instead of a Segment Tree?"

Both can answer range sum queries, but the data here is static. There are no updates. Segment Tree takes O(N) to build but O(log N) to query, with a high constant factor. Prefix Sum takes O(N) to build and O(1) to query. Since the data never changes, the O(1) query time of Prefix Sum makes it the strictly better choice.
:::


---

## Prefix Sums as Precompute

- Prefix Sums are the simplest form of the Precompute pattern. They rely on the mathematical property of **invertibility**

### The mechanism

- You precompute a cumulative array where `prefix[i]` is the sum of all elements from index 0 to `i-1`
- To find the sum of range `[L, R]`, you query `prefix[R+1] - prefix[L]`
- **Why it works:** `prefix[R+1]` contains the sum of everything from 0 to R. `prefix[L]` contains the sum of everything from 0 to L-1. By subtracting the latter from the former, you "chop off" the unwanted prefix, leaving exactly `[L, R]`

### The requirement: Invertibility

- The `-` operator is the inverse of the `+` operator. You can add something, and then reliably "un-add" it later
- Prefix precomputation **only works for invertible operations**:
  - ✅ **Sum:** Inverse is subtraction
  - ✅ **Multiplication:** Inverse is division (if no zeros)
  - ✅ **XOR:** Inverse is XOR (XORing the same number twice cancels it out)
  - ❌ **Minimum:** There is no inverse. If the minimum of a range is 2, and you "chop off" a 2, you have no idea what the new minimum is
  - ❌ **Maximum:** There is no inverse

### Prefix counts and states

- The pattern is not limited to summing numbers. It is incredibly powerful for tracking states
- **Example:** "How many vowels are in the substring `s[L..R]`?"
- Map vowels to 1 and consonants to 0. Build a prefix sum. Now `prefix[R+1] - prefix[L]` answers the query in O(1)

```ts
// Precomputing states
function buildVowelPrefix(s: string): number[] {
  const prefix = new Array(s.length + 1).fill(0);
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  
  for (let i = 0; i < s.length; i++) {
    const isVowel = vowels.has(s[i]) ? 1 : 0;
    prefix[i + 1] = prefix[i] + isVowel;
  }
  return prefix;
}

// Querying in O(1)
function countVowelsInRange(prefix: number[], L: number, R: number): number {
  return prefix[R + 1] - prefix[L];
}
```

:::interview
"Can we use a Prefix Array for range minimum queries?"

No. Prefix arrays rely on the ability to "subtract" or invert a value to isolate a specific range. Addition and XOR are invertible. The minimum operation is not. To answer range minimum queries in O(1) on static data, we need a Sparse Table, which relies on overlap rather than subtraction.
:::


---

## Sparse Table as Precompute

- When an operation is NOT invertible (like minimum or maximum), you cannot use a prefix array. You need a different precompute strategy
- The **Sparse Table** is a precompute structure designed specifically for **idempotent** operations

### The requirement: Idempotence

- An operation is idempotent if applying it multiple times yields the same result as applying it once: `op(x, x) = x`
- ✅ **Minimum:** `min(A, A) = A`
- ✅ **Maximum:** `max(A, A) = A`
- ✅ **GCD:** `gcd(A, A) = A`
- ❌ **Sum:** `A + A != A`
- Idempotence means **overlapping intervals don't matter**. If you want the minimum of a range, and you take the minimum of the first half and the minimum of the second half, and those halves overlap, the answer is still perfectly correct

### The mechanism

- Instead of precomputing sums from index 0, a Sparse Table precomputes the answer for **every interval whose length is a power of 2**
- `table[i][j]` stores the answer for the interval starting at index `i` with length `2^j`
- Upfront cost: O(N log N) to build

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Sparse Table query for Range Minimum. The query range is fully covered by two overlapping precomputed power-of-2 blocks. The overlap does not affect the minimum." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi1 { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .hi2 { fill: #fdf2f8; stroke: #db2777; stroke-width: 1.1; }
    .ov { fill: #e5e7eb; stroke: #1a1a1a; stroke-width: 1.1; stroke-dasharray: 2 2; }
  </style>

  <text x="10" y="14" class="sm">Query Range: [2, 8] (Length 7)</text>

  <!-- Array boxes -->
  <g transform="translate(10, 24)">
    <rect class="bx" x="0" y="0" width="25" height="18" rx="2"/> <text x="12" y="13" class="lb" text-anchor="middle">5</text>
    <rect class="bx" x="28" y="0" width="25" height="18" rx="2"/> <text x="40" y="13" class="lb" text-anchor="middle">2</text>
    
    <!-- Query range [2..8] -->
    <rect class="hi1" x="56" y="0" width="109" height="18" rx="2"/> 
    <rect class="hi2" x="140" y="0" width="109" height="18" rx="2"/>
    <rect class="ov" x="140" y="0" width="25" height="18" rx="2"/> <!-- The overlap -->
    
    <text x="68" y="13" class="lb" text-anchor="middle">4</text>
    <text x="96" y="13" class="lb" text-anchor="middle">1</text>
    <text x="124" y="13" class="lb" text-anchor="middle">9</text>
    <text x="152" y="13" class="lb" text-anchor="middle">3</text>
    <text x="180" y="13" class="lb" text-anchor="middle">7</text>
    <text x="208" y="13" class="lb" text-anchor="middle">6</text>
    <text x="236" y="13" class="lb" text-anchor="middle">8</text>
  </g>

  <!-- Brackets -->
  <path d="M 66 46 L 66 52 L 165 52 L 165 46" fill="none" stroke="#2d6a4f" stroke-width="1.5" />
  <text x="115" y="65" class="lb" fill="#2d6a4f" text-anchor="middle">Length 4 block (starts at 2)</text>

  <path d="M 150 75 L 150 81 L 249 81 L 249 75" fill="none" stroke="#db2777" stroke-width="1.5" />
  <text x="200" y="94" class="lb" fill="#db2777" text-anchor="middle">Length 4 block (ends at 8)</text>

  <text x="10" y="115" class="lb">O(1) Query:</text>
  <text x="10" y="128" class="sm">Largest power of 2 ≤ 7 is 4. Query = min(block_left, block_right). Overlap at index 5 is harmless.</text>
</svg>
:::

### O(1) Queries

- To query any range `[L, R]`, find the largest power of 2 that fits inside the range: `k = floor(log2(R - L + 1))`
- The answer is simply `min(table[L][k], table[R - 2^k + 1][k])`
- Because minimum is idempotent, the fact that these two blocks might overlap perfectly covers the entire range without double-counting penalties

### Structural parallel to Segment Trees

- **Sparse Table:** O(N log N) build, O(1) query. Cannot handle updates. Requires idempotence for O(1) (though can do O(log N) queries for non-idempotent ops)
- **Segment Tree:** O(N) build, O(log N) query. Can handle point and range updates. Works for any associative operation

:::interview
"The array is static and we have 10^6 range minimum queries. Segment Tree?"

A Segment Tree would take O(log N) per query, which might TLE for 10^6 queries. Since the array is static and MIN is an idempotent operation, a Sparse Table is strictly superior. It takes O(N log N) to build, but answers each query in O(1) using block overlap.
:::


---

## Precompute worked problems

### Problem 1: Subarray Sum Equals K

- **Problem:** Given an array of integers and an integer `k`, return the total number of continuous subarrays whose sum equals to `k`
- **Why it is a precompute problem:** We need to check many range sums. The data is static. Sum is an invertible operation. We need Prefix Sums

**Derivation:**
1. **The mathematical translation:** The sum of subarray `[i, j]` is `prefix[j] - prefix[i-1]`. We want `prefix[j] - prefix[i-1] == k`
2. **The algebra:** Rearrange to `prefix[i-1] == prefix[j] - k`
3. **The algorithm:** As we iterate through the array building the prefix sum, we don't need to look back at all previous prefix sums. We just use a Hash Map to precompute and store the *frequencies* of every prefix sum we have seen so far

```ts
function subarraySum(nums: number[], k: number): number {
  let count = 0;
  let currentSum = 0;
  // Map of prefixSum -> frequency. Initialize with 0: 1 for exact matches
  const prefixMap = new Map<number, number>();
  prefixMap.set(0, 1);

  for (const num of nums) {
    currentSum += num;
    
    // Check if the required prefix exists
    const required = currentSum - k;
    if (prefixMap.has(required)) {
      count += prefixMap.get(required)!;
    }
    
    // Add current sum to map
    prefixMap.set(currentSum, (prefixMap.get(currentSum) || 0) + 1);
  }
  
  return count;
}
```

### Problem 2: Range Minimum Query (Static)

- **Problem:** Given a static array, answer $Q$ queries of the form "What is the minimum element between index L and R?"
- **Why it is a precompute problem:** Large $Q$, static data. Minimum is idempotent. We need a Sparse Table

**Derivation:**
1. **Precompute:** Build a table where `st[i][j]` is the minimum of a block starting at `i` of length $2^j$
2. **Base case:** `st[i][0] = arr[i]` (length $2^0 = 1$)
3. **Transition:** `st[i][j] = min(st[i][j-1], st[i + 2^(j-1)][j-1])`. Two blocks of length $2^{j-1}$ combine to form a block of length $2^j$

```ts
function buildSparseTable(arr: number[]): number[][] {
  const n = arr.length;
  const k = Math.floor(Math.log2(n)) + 1;
  const st = Array.from({ length: n }, () => new Array(k).fill(0));

  for (let i = 0; i < n; i++) st[i][0] = arr[i];

  for (let j = 1; j < k; j++) {
    for (let i = 0; i + (1 << j) <= n; i++) {
      st[i][j] = Math.min(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
    }
  }
  return st;
}

function queryMin(st: number[][], L: number, R: number): number {
  const j = Math.floor(Math.log2(R - L + 1));
  return Math.min(st[L][j], st[R - (1 << j) + 1][j]); // O(1) overlap query
}
```

### The pattern across both

- Neither problem uses complex traversal logic
- Both transform the query into an O(1) lookup against a pre-built structure
- The choice of structure is dictated purely by the math of the operation (Sum = invertible → Prefix Map; Min = idempotent → Sparse Table)


---

## Seeing Unnamed Patterns

- By now you have seen the four unnamed patterns: Frontier Maintenance, Dominated Candidate Elimination, Boundary Finding, and Precompute
- The goal of this chapter is not to replace the techniques (BFS, Monotonic Stack, Binary Search). The goal is to change **how you search your brain** when you are stuck

### The standard approach vs The pattern approach

When you read a novel problem, the standard approach is to mentally scroll through a list of techniques:
- "Is this Sliding Window?"
- "Is it Dynamic Programming?"
- "Is it a Segment Tree?"

This fails because it relies on surface-level keyword matching. The pattern approach asks structural questions instead:

### The 4 diagnostic questions

1. **"Am I expanding from a known set into an unknown set?"**
   - If yes: **Frontier Maintenance**
   - Follow-up: What is the selection rule? (FIFO = BFS, Min-Cost = Dijkstra, Heuristic = A*, Earliest End Time = Greedy)

2. **"Am I forced to track a bunch of candidates, but some are strictly worse than others?"**
   - If yes: **Dominated Candidate Elimination**
   - Follow-up: What proves a candidate is useless? (A larger number = Monotonic Stack, A steeper line = Convex Hull, Worse in both dimensions = Pareto Pruning)

3. **"Is this an optimization problem asking for a min/max value?"**
   - If yes: **Boundary Finding**
   - Follow-up: Can I write a monotonic `isPossible(x)` function? Does the sequence look like `[F,F,T,T,T]` or `[T,T,T,F,F]`?

4. **"Am I answering the same type of query repeatedly on static data?"**
   - If yes: **Precompute**
   - Follow-up: Is the operation invertible? (Sum/XOR = Prefix Array). Is it idempotent? (Min/Max = Sparse Table). Do I need updates? (Fenwick/Segment Tree)

### The synthesis

- The most difficult problems in competitive programming and interviews don't use one pattern. They combine them
- **Example:** "Find the shortest path in a graph where you can skip at most K edges."
  - This is Frontier Maintenance (Dijkstra) combined with State Precompute (the state is `(node, skipsUsed)`). 
- **Example:** "Answer range minimum queries, but the array is updated."
  - This is Precompute (you can't use Sparse Table because it doesn't support updates, so you must use a Segment Tree).
- When you see the abstract structures, you stop trying to memorize templates and start assembling solutions from fundamental building blocks

:::interview
"I understand the solutions when I read them, but I can't come up with them."

You are trying to retrieve full solutions from memory. Expert problem solvers retrieve abstract structures (like boundaries or frontiers) and derive the solution on the spot. Ask the 4 diagnostic questions to force your brain out of keyword-matching mode.
:::


---

## Recognition drills: Unnamed Patterns

Hide the right column. For each problem, do not write code. Identify which of the four Unnamed Patterns it uses and briefly justify your answer.

| Problem | Unnamed Pattern & Justification |
|---|---|
| 1. Find the smallest divisor such that the sum of the array divided by the divisor is $\le$ threshold. | **Boundary Finding.** "Smallest divisor" is an optimization. `isPossible(divisor)` is monotonic (larger divisors give smaller sums, making it easier to be $\le$ threshold). The sequence is `[F, F, T, T, T]`. We want the first T. |
| 2. Given a 2D grid with obstacles, find the path from top-left to bottom-right that destroys the minimum number of obstacles. | **Frontier Maintenance (0-1 BFS / Dijkstra).** We are expanding into an unknown grid. The selection rule is "minimum obstacles destroyed." We use a deque or min-heap frontier where state is `(r, c)`. |
| 3. Given a stream of numbers, at any time output the maximum element seen in the last K seconds. | **Dominated Candidate Elimination (Monotonic Deque).** If a new number is larger than an older number in the window, the older number is permanently dominated (it can never be the maximum). |
| 4. Find the longest substring where every character appears at least K times. | **Boundary Finding (or Divide and Conquer).** Is it possible to have a valid substring of length L? Unfortunately, this is a trick question. The length condition is *not* monotonic. This is a classic misdirection. |
| 5. You have an array of daily stock prices. Find the maximum profit from buying and selling once. | **Precompute (Prefix Min).** The profit if you sell on day `i` is `price[i] - min(price[0...i-1])`. You can precompute the prefix minimums in O(N) to answer the query for each day in O(1). |
| 6. Given N jobs with start time, end time, and profit. Find the maximum profit subset of non-overlapping jobs. | **Dominated Candidate Elimination (DP + Binary Search).** Sort by end time. For each job, we either include it or skip it. If a previous subset has the same end time but lower profit, it is strictly dominated. |
| 7. Minimum number of days to make M bouquets using K adjacent flowers. Flowers bloom on different days. | **Boundary Finding (Feasibility).** "Minimum days" = optimize. `isPossible(days)`: wait `days`, check if we can make M bouquets. Monotonic `[F, F, T, T]`. |
| 8. A robot cleans a room. Some squares are dirty. Find the minimum time to clean all squares. | **Frontier Maintenance (State-space BFS).** The frontier state is `(r, c, bitmask_of_cleaned_squares)`. Selection rule is FIFO (unit time). |
| 9. Given N rectangles, find the area of their union. | **Dominated Candidate Elimination (Sweep Line).** As the sweep line moves, rectangles enter and exit the active set. Rectangles fully contained within taller ones are effectively dominated for that x-interval. |
| 10. XOR queries on a subarray `[L, R]`. | **Precompute (Prefix XOR).** Static data, lots of queries. XOR is invertible (`A ^ A = 0`), so `prefix[R] ^ prefix[L-1]` gives the answer in O(1). |

### Score yourself
- **8-10 correct:** You are seeing the matrix. You recognize structural skeletons over surface keywords
- **5-7 correct:** You are probably still leaning on technique names. Review the 4 diagnostic questions
- **0-4 correct:** Reread Chapter 9. Focus on the abstract mechanisms, not the code


---

# Dimension & Geometry

Welcome to the Dimension & Geometry family. This section teaches you how to reshape the way you view standard data structures. 

Sometimes, the trick to a problem isn't a new algorithm—it's pretending the data structure is something else entirely. We will cover:
1. **Dimension Flattening:** Pretending 2D matrices are 1D arrays.
2. **Visual Slicing:** Pretending 3D trees are flat 2D images.


---

# Dimension Flattening

## The Mental Model
Treating a 2D matrix like a 1D array to apply binary search or simple loops. Instead of nested `i` and `j` loops, you iterate from `0` to `m*n - 1` and calculate coordinates on the fly.

### The Formula
For a grid of `N` rows and `M` columns:
- `row = index / M`
- `col = index % M`

## Recognizing the Pattern
- "Search in a 2D matrix"
- "Matrix is sorted row-wise"
- "Given a grid, traverse it linearly"

## Why it works
It removes the mental overhead of boundary checks across dimensions. A 2D grid in memory is fundamentally 1D anyway.

## Canonical Problem: Search a 2D Matrix
**Problem:** Write an efficient algorithm that searches for a value in an `m x n` matrix. This matrix has the following properties:
1. Integers in each row are sorted from left to right.
2. The first integer of each row is greater than the last integer of the previous row.

**Implementation (TypeScript):**
```typescript
function searchMatrix(matrix: number[][], target: number): boolean {
    if (matrix.length === 0) return false;
    const m = matrix.length;
    const n = matrix[0].length;
    
    let left = 0;
    let right = m * n - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        const row = Math.floor(mid / n);
        const col = mid % n;
        
        if (matrix[row][col] === target) return true;
        if (matrix[row][col] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return false;
}
```

## Common Traps
- Using `N` instead of `M` for the modulo operator. Always divide/mod by the number of **columns**.


---

# Visual Slicing & Views

## The Mental Model
Projecting a complex structure (like a Tree) onto a 2D plane or looking at it from a specific angle. Covers tags like `views`, `leftRightTop pattern`, and `Construction`.

## Algorithm Derivation
**Brute force:** To get the "Top View" of a tree, traverse it and somehow guess which nodes block others.
**↓**
**What is being repeated?** We lose spatial relationships in a standard DFS.
**↓**
**Can we remember it?** Assign coordinate geometry to the tree!
**↓**
**Optimized Idea:** Root is at `(x:0, y:0)`. Left child is `(x-1, y+1)`. Right child is `(x+1, y+1)`. 
For a Top View, simply take the first node you see at every `x` coordinate using a HashMap.

## Implementation Concept (Top View)
Use BFS with a queue storing `[Node, x_coord]`. 
If `x_coord` is not in the HashMap, add it. The HashMap naturally filters out blocked nodes!


---

# Trees & Recursion

Welcome to the Trees & Recursion family. 
The secret to mastering trees is realizing that the root node is essentially a manager. It rarely does the actual work. It delegates tasks to its children, waits for their reports, and combines them.

We will cover:
1. **Delegation to Children**
2. **The Choice Tree (Pick / Non-Pick)**


---

# Delegation to Children (Bottom-Up Bubbling)

## The Mental Model
The realization that in trees, the root delegates to its children. Covers tags: `handleRoot CallChild`, `Travel And Change`, and `PostOrder`.

## Algorithm Derivation
**Brute force:** To find the diameter of a tree, find the depth of the left and right subtree for *every* node from the top down. $O(N^2)$.
**↓**
**What is being repeated?** Depth is recalculated multiple times for the same nodes.
**↓**
**Can we reorder operations?** Yes. Process children *before* the parent.
**↓**
**Optimized Idea:** Use Post-Order Traversal. The left child returns its depth, the right child returns its depth. The parent calculates `max(left, right) + 1` and updates the global diameter `left + right`. $O(N)$ time.

## The Rule of Thumb
If a parent needs information from its children to make a decision, use **Post-Order DFS**.


---

# The Choice Tree (Pick / Non-Pick)

## The Mental Model
The foundational way to think about DP and Backtracking. At every step, you either include the item or you don't. This covers: `pickNonPick`, `BackTracking`, `permutationCase`, and `uniqueRecurrence`.

## Algorithm Derivation
**Brute force:** Generate all $2^N$ combinations.
**↓**
**Why is it too slow?** Exponential time complexity.
**↓**
**What is being repeated?** We often reach the same `(index, current_sum)` state via different paths.
**↓**
**Can we remember it?** Memoize the state `(index, sum)` in a 2D array or HashMap.
**↓**
**Optimized Idea:** Return the cached result instead of traversing the sub-tree again.

## Implementation Template
```typescript
function solve(idx: number, target: number): number {
    if (target === 0) return 1;
    if (idx === n) return 0;
    if (memo[idx][target] !== -1) return memo[idx][target];
    
    // The Choice
    let nonPick = solve(idx + 1, target);
    let pick = 0;
    if (arr[idx] <= target) {
        pick = solve(idx + 1, target - arr[idx]);
    }
    
    return memo[idx][target] = pick + nonPick;
}
```


---

# Graphs & Connectivity

Welcome to the Graphs family. 
Many interview problems don't explicitly say "This is a graph". They talk about cities, dependencies, connected pixels, or transformations. 

We will cover:
1. **The Horizon Search (BFS)**
2. **The Cycle of Trust (Graph Anatomy)**


---

# The Horizon Search (Multi-Source BFS)

## The Mental Model
Radiating outward from multiple sources simultaneously. Covers tags: `BFS`, `Shortestpath`, and `minDist to 1's Multisource BFS`.

## Algorithm Derivation
**Brute force:** To find the distance to the nearest '1' for every '0' in a grid, run a BFS from every single '0'. $O(N^2 * M^2)$.
**↓**
**Why is it too slow?** We revisit the same cells repeatedly.
**↓**
**Can we reverse the perspective?** Instead of '0's looking for '1's, what if the '1's radiated outward?
**↓**
**Optimized Idea:** Push *all* '1's into the queue at $T=0$. Run a single Multi-Source BFS. The first time a '0' is visited, it is guaranteed to be via the shortest path. $O(N * M)$.

## When to use
*   Rotting Oranges
*   01 Matrix / Nearest 1


---

# The Cycle of Trust (Graph Anatomy)

## The Mental Model
Mental models for how nodes relate to each other—who comes first, who is in a loop, and who hates who. Covers `CycleDetection`, `TopologicalSort`, and `Bipartite`.

## Algorithm Derivation
**Brute force:** Try to take courses randomly and see if you get stuck.
**↓**
**Can we exploit structure?** If Course A is a prerequisite for Course B, `A -> B`.
**↓**
**Optimized Idea (Topological Sort):** Keep an array of `in-degrees` (how many prerequisites a course has). Put courses with `0` in-degrees in a queue. As you take them, reduce the in-degrees of their neighbors. 
If you process all courses, you pass! If the queue empties early, there is a **Cycle**.

## Bipartite Graphs
*   "Who hates who" or "Group dividing".
*   If you can color the graph with 2 colors such that no adjacent nodes have the same color, it's bipartite.


---


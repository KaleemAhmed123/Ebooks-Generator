## Two Pointers 🟢

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

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

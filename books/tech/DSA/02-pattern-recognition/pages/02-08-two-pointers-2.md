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
"Why does Remove Duplicates from Sorted Array use two pointers moving the same way?" — The reader visits every element once; the writer marks the end of the kept prefix. A value is kept when it differs from the last kept value, `nums[write − 1]`. The writer never passes the reader, so nothing unread is overwritten. O(n) time, O(1) space.
:::

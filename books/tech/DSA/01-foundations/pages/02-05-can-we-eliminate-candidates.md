## Can we eliminate candidates?

- If you cannot afford the space to remember past work, you must find a way to skip future work
- This transformation requires a specific property in the data: you must be able to prove that a whole group of candidates can never be the optimal answer, without actually checking them

### The Binary Search elimination

- **The bottleneck:** "I am searching for a value, and I have to check every element because it could be anywhere."
- **The insight:** If the array is sorted, checking the middle element tells you where the target *cannot* be. If `mid < target`, the target cannot be in the left half
- **The transformation:** You eliminate half the remaining search space on every step. O(n) drops to O(log n)
- *Crucial detail:* This requires the data to have an ordering. If it doesn't, you must sort it first (which is a preprocessing step)

```ts
// Each iteration eliminates half the remaining candidates
let lo = 0, hi = arr.length - 1;
while (lo <= hi) {
  const mid = (lo + hi) >>> 1;       // safe integer midpoint
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) lo = mid + 1; // left half eliminated
  else hi = mid - 1;                   // right half eliminated
}
```

### The Two Pointers elimination

- **The bottleneck:** "I need to find a pair of elements that sum to a target. I am checking every pair."
- **The insight:** If the array is sorted, and the sum of `arr[left] + arr[right]` is too big, moving `left` to the right will only make it bigger. The only way to reduce the sum is to move `right` to the left
- **The transformation:** By moving `right`, you eliminate all pairs involving the current `right` element. You never have to check them. O(n²) drops to O(n)

### The Branch and Bound elimination

- **The bottleneck:** "I am generating all subsets to find the minimum cost. It takes O(2ⁿ)."
- **The insight:** If the cost of the current partial subset is already greater than the best complete subset we have found so far, adding more items will only increase the cost
- **The transformation:** Stop generating this branch. Prune it. You eliminate all subsets that start with this partial prefix

:::interview
"Why does Two Pointers work for the Two Sum problem on a sorted array?"

Because the sorted order guarantees monotonic behavior. If the sum is too large, the current right pointer cannot form a valid pair with *any* element to its right. We can permanently eliminate it and step left.
:::

## Derivation worked example: Two Sum

- Let's walk through the exact derivation method for the classic Two Sum problem
- **Problem:** Given an array of integers and a `target`, return the indices of the two numbers that add up to `target`.

### Step 1: Brute Force

- What is the most naive way to solve this? Check every possible pair
- **Code:**
```ts
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] + arr[j] === target) return [i, j];
  }
}
```
- **Complexity:** O(n²) time, O(1) space

### Step 2: What is repeated?

- For every element `arr[i]`, the inner loop scans the rest of the array looking for a specific value: `target - arr[i]`
- The repetition: We are scanning the same array over and over again just to perform a lookup

### Step 3: Can we remember it?

- **Idea:** If the bottleneck is searching for a value, can we spend space to make lookups O(1)?
- **Transformation:** As we iterate, we store each element and its index in a Hash Map. For the current `arr[i]`, we just check if `target - arr[i]` is already in the map
- **Complexity:** O(n) time, O(n) space

### Alternate Step 3: Can we preprocess and eliminate?

- **Idea:** If we cannot afford O(n) space, can we eliminate candidates? That requires a sorted array
- **Transformation:** Sort the array first (O(n log n)). Use two pointers. If `sum < target`, move `left`. If `sum > target`, move `right`
- **Complexity:** O(n log n) time, O(1) space (assuming an in-place sort and that we just return the values, not the original indices)

### The Derivation

- You did not memorise the Hash Map trick. You wrote the brute force, saw that the inner loop was just a slow lookup, and replaced the slow lookup with a fast one. The structure forced the solution

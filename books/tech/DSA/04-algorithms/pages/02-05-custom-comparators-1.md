## Custom Comparators <span class="lv lv1"></span>

- In the real world, you are rarely sorting raw arrays of integers. You are sorting objects, database rows, or complex structs based on multiple conditions.
- Every modern language provides a way to pass a custom sorting logic (a "Comparator") into its built-in sort function.

### The Mathematics of Comparators

A comparator function takes two elements, `A` and `B`, and returns an integer. The sign of that integer tells the sorting algorithm how to arrange them:

- **Negative (`< 0`):** `A` comes before `B`.
- **Zero (`=== 0`):** `A` and `B` are equivalent (their relative order does not matter, or is maintained in a Stable sort).
- **Positive (`> 0`):** `A` comes after `B`.

### Basic Ascending/Descending

```ts
// Ascending order (Smallest to Largest)
arr.sort((a, b) => a - b); 

// Descending order (Largest to Smallest)
arr.sort((a, b) => b - a);
```

*Note: In TypeScript/JavaScript, never use the default `arr.sort()` without a comparator for numbers. The default behavior casts all elements to strings and sorts them alphabetically. `[10, 2, 1]` becomes `[1, 10, 2]`!*

## Custom Comparators

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

### Multi-tier Sorting

- **The Problem:** Sort a list of students by their Math score (descending). If their Math scores are tied, sort by their English score (descending). If both are tied, sort alphabetically by name (ascending).
- **The Implementation:**

```ts
type Student = { name: string, math: number, english: number };

students.sort((a, b) => {
  // 1. Math (Descending)
  if (a.math !== b.math) {
    return b.math - a.math;
  }
  
  // 2. English (Descending)
  if (a.english !== b.english) {
    return b.english - a.english;
  }
  
  // 3. Name (Ascending string comparison)
  return a.name.localeCompare(b.name);
});
```

### The trap

- **Inconsistent Comparators:** If your comparator says `A > B` and `B > C`, but also calculates that `C > A` (a circular dependency or non-transitive logic), the sorting algorithm will silently fail, crash, or throw an exception (like Java's notorious `IllegalArgumentException: Comparison method violates its general contract`).
- **The fix:** Always ensure your logic is perfectly transitive and covers all edge cases (especially strict equality). 

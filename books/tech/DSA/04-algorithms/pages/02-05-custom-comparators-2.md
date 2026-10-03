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

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Largest Number](https://leetcode.com/problems/largest-number/) (LeetCode 179) | Custom sort: compare a+b vs b+a as strings |
| [Merge Intervals](https://leetcode.com/problems/merge-intervals/) (LeetCode 56) | Sort by start time, then merge overlapping |
| [Queue Reconstruction by Height](https://leetcode.com/problems/queue-reconstruction-by-height/) (LeetCode 406) | Sort by height desc, then k asc |

### The failure

- **Ignoring the tie rule.** `[1, 3]` and `[3, 5]` overlap in one statement and not in another. When they do not, process ends before starts at equal times, or the peak is one too high (Module 04, 03-05)

:::interview
"When is a sweep better than merging intervals?" — When the question is about *how many* intervals overlap at a point, not about their union. Merging (07-07) answers "which ranges are covered"; the sweep answers "how deep is the overlap". Both sort, so both are O(n log n).
:::

### Variations

- **Template and the end-before-start tie rule:** Module 04 (03-05)
- **Meeting Rooms II (LeetCode 253) / Minimum Platforms (GFG):** the peak of the running count is the answer
- **Car Pooling (LeetCode 1094):** events at bounded positions, so a difference array (03-07) replaces the sort
- **The Skyline Problem (LeetCode 218):** the events carry heights; keep active heights in a max-heap with lazy deletion and emit a point whenever the top changes
- **My Calendar III (LeetCode 732):** events arrive online; a sorted map of `+1/−1` counts, swept after each booking

:::interview
"When is a sweep better than merging intervals?" — When the question is about *how many* intervals overlap at a point, not about their union. Merging (07-07) answers "which ranges are covered"; the sweep answers "how deep is the overlap". Both sort, so both are O(n log n).
:::

### The key invariant

- After elimination, the surviving candidates form a structure with a useful property:
  - In monotonic stack: a strictly decreasing (or increasing) sequence
  - In convex hull: a convex envelope
  - In skyline: a Pareto-optimal front
- This compressed structure allows O(1) or O(log n) lookups instead of O(n) scans

:::interview
"Why does the monotonic stack work in O(n)?"

Each element is pushed once and popped at most once. The popping isn't wasted work — it's proving that the popped element is permanently dominated by the incoming element. Once dominated, it can never be the answer for any future query. That's why we discard it.
:::

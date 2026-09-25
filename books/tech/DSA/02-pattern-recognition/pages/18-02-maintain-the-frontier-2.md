### The trap

- **Marking at the wrong moment.** BFS marks on push; Dijkstra marks on pop and skips stale entries. Module 07 (02-07, 02-08) works both bugs

:::interview
"When would you use beam search instead of Dijkstra?" — When the frontier is too large to keep whole and a good answer beats a proven optimum: keep only the best B candidates per step. It trades completeness for bounded memory; Dijkstra keeps every candidate and is exact.
:::

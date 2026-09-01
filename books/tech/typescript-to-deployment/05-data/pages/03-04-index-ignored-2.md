### The table is small

- Below a few thousand rows the planner reads everything because it genuinely is faster
- That is correct behavior, not a problem to solve

### The query returns most of the table

- An index is a detour: find the pointer, then fetch the row
- Returning eighty percent of the rows makes the detour more expensive than reading straight through

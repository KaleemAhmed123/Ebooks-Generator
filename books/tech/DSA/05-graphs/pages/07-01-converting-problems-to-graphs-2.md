### Constructing the Graph

The hardest part of these problems is simply building the `adjList` before you run the algorithm.
For example, if you are given a list of flight tickets `["JFK", "LAX"]`:

```ts
// 1. You must build the graph from raw data
const adj = new Map<string, string[]>();

for (const [from, to] of tickets) {
  if (!adj.has(from)) adj.set(from, []);
  if (!adj.has(to)) adj.set(to, []); // Always register the destination!
  adj.get(from)!.push(to);
}

// 2. Now you can run your standard algorithm on `adj`
```

## Conflict-Free Replicated Data Types (CRDTs)

- If Last Write Wins deletes data, how do we build multi-leader systems safely? The answer is **Conflict-Free Replicated Data Types (CRDTs)**
- A CRDT is a specialized data structure that mathematically guarantees convergence. No matter what order writes arrive in, or how many times they conflict, the final state will be exactly the same on every node, without dropping any user intent

```typescript
// A G-Counter (Grow-only Counter) CRDT
// Instead of storing a single integer, it stores a map of node IDs to counts.
class GCounter {
  payload: Record<string, number> = {};

  // To increment, a node only updates its own entry
  increment(nodeId: string) {
    this.payload[nodeId] = (this.payload[nodeId] || 0) + 1;
  }

  // To merge, you take the maximum of every node's count
  merge(other: GCounter) {
    for (const [nodeId, count] of Object.entries(other.payload)) {
      this.payload[nodeId] = Math.max(this.payload[nodeId] || 0, count);
    }
  }

  // The true value is the sum of all nodes
  value() {
    return Object.values(this.payload).reduce((a, b) => a + b, 0);
  }
}
```

- There are CRDTs for counters, sets (allowing adds and removes), and even complex text strings (used by Google Docs and Figma for real-time collaborative editing). If you need true multi-leader replication, your application must be built entirely out of CRDTs

### The failure

- Using LWW JSON objects for collaborative text editing. If you try to build Google Docs by saving the entire document as a JSON blob and using Last Write Wins, two users typing at the same time will constantly overwrite each other's paragraphs. Collaborative editing requires sequence CRDTs that merge character by character
